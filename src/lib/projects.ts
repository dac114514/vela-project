import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

export interface ProjectRecord {
  entry: ProjectEntry;
  category: string;
  slug: string;
  modifiedAt: Date;
}

function normalizeId(id: string) {
  return id.replace(/\.(md|mdx)$/i, '').replaceAll('\\', '/');
}

function getGitModifiedAt(entry: ProjectEntry) {
  if (entry.data.updatedAt) return entry.data.updatedAt;
  const filePath = entry.filePath;

  if (filePath) {
    try {
      const value = execFileSync(
        'git',
        ['log', '-1', '--format=%cI', '--', filePath],
        { encoding: 'utf8' }
      ).trim();
      if (value) return new Date(value);
    } catch {
      // 首次提交或浅克隆时回退到文件时间。
    }

    try {
      return statSync(filePath).mtime;
    } catch {
      // 保持稳定的最后回退值。
    }
  }

  return new Date(0);
}

function byProjectOrder(a: ProjectRecord, b: ProjectRecord) {
  const aOrder = a.entry.data.order;
  const bOrder = b.entry.data.order;
  if (aOrder !== undefined || bOrder !== undefined) {
    return (aOrder ?? Number.MAX_SAFE_INTEGER) - (bOrder ?? Number.MAX_SAFE_INTEGER);
  }
  return b.modifiedAt.getTime() - a.modifiedAt.getTime();
}

export async function getProjects(): Promise<ProjectRecord[]> {
  const entries = await getCollection('projects');
  return entries
    .map((entry) => {
      const slug = normalizeId(entry.id);
      const [category = '未分类'] = slug.split('/');
      return {
        entry,
        category,
        slug,
        modifiedAt: getGitModifiedAt(entry)
      };
    })
    .sort(byProjectOrder);
}

export async function getCategoryGroups() {
  const projects = await getProjects();
  const groups = new Map<string, ProjectRecord[]>();

  for (const project of projects) {
    const group = groups.get(project.category) ?? [];
    group.push(project);
    groups.set(project.category, group);
  }

  return [...groups.entries()]
    .map(([name, items]) => ({
      name,
      items: items.sort(byProjectOrder),
      modifiedAt: new Date(Math.max(...items.map((item) => item.modifiedAt.getTime())))
    }))
    .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
}
