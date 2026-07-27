# 蓝桥工作室作品集

[![网站访问量](https://visitor-badge.laobi.icu/badge?page_id=dac114514.vela-project)](https://github.com/dac114514/vela-project)
[![构建并部署作品集](https://github.com/dac114514/vela-project/actions/workflows/deploy.yml/badge.svg)](https://github.com/dac114514/vela-project/actions/workflows/deploy.yml)

蓝桥工作室的小程序作品陈列网站。项目内容使用 MDX 管理，提交到 `main` 分支后由 GitHub Actions 自动构建并部署到 GitHub Pages。

## 内容结构

```text
src/content/projects/
└── 分类名称/
    └── 作品名称.mdx

public/projects/
└── 项目标识/
    ├── icon.webp
    ├── cover.webp
    └── screenshot-1.webp
```

一级目录就是分类。新建一个目录即可新增分类，不需要修改页面代码。

“全部作品”是网站自动生成的汇总页，不需要创建对应目录。分类和分类内作品默认根据 Git 最近修改时间倒序排列；项目填写 `order` 后，可优先使用数字手动排序。

## 新增作品

1. 在 `src/content/projects/` 中进入已有分类，或新建分类目录。
2. 复制 [`templates/project.mdx`](templates/project.mdx)。
3. 修改文件顶部字段和正文。
4. 将图标、封面和截图上传到 `public/projects/项目标识/`。
5. 提交到 `main` 分支。
6. 在仓库 Actions 页面等待“构建并部署作品集”完成。

也可以打开网站的 `/editor` 页面填写表单，复制或下载生成的 MDX 文件，再上传到对应分类目录。

## 项目字段

```yaml
---
title: "作品名称"
packageName: "com.bluebridge.example"
author: "纯水机"
description: "一句话简介"
version: "1.0.0"
status: "已发布"
icon: "/projects/example/icon.webp"
cover: "/projects/example/cover.webp"
screenshots:
  - "/projects/example/screenshot-1.webp"
links:
  - label: "访问作品"
    url: "https://example.com"
---
```

- `title`、`packageName`、`author`、`description` 和 `version` 必填。
- `icon`、`cover`、`screenshots` 和 `links` 可以省略。
- `status` 默认是“已发布”，只有其他状态才会在卡片上额外显示。
- `order` 是可选数字；数字越小，排序越靠前。
- `updatedAt` 是可选日期；填写后会覆盖 Git 最近修改时间。
- 正文可以只有一句话，也可以使用完整 Markdown/MDX。

## 自定义 MDX 排版

仓库提供以下组件：

- `Callout.astro`：提示卡片
- `FeatureGrid.astro` 与 `Feature.astro`：功能网格
- `Media.astro`：带圆角和说明文字的图片

在项目文件正文前导入后即可使用：

```mdx
import Callout from '../../../components/mdx/Callout.astro';
import FeatureGrid from '../../../components/mdx/FeatureGrid.astro';
import Feature from '../../../components/mdx/Feature.astro';

<Callout title="设计说明">
  这里可以继续使用 **Markdown**。
</Callout>

<FeatureGrid>
  <Feature title="功能一">功能介绍。</Feature>
  <Feature title="功能二">功能介绍。</Feature>
</FeatureGrid>
```

## 修改作者信息

工作室介绍、作者简介、头像和联系方式统一配置在：

```text
src/data/site.ts
```

头像建议放在：

```text
public/authors/纯水机/avatar.webp
```

然后把 `avatar` 填写为：

```ts
avatar: '/authors/纯水机/avatar.webp'
```

联系方式格式：

```ts
contacts: [
  { label: 'GitHub', url: 'https://github.com/你的账号' },
  { label: '联系邮箱', url: 'mailto:你的邮箱' }
]
```

## 静态 MDX 编辑器与后端接口

`/editor` 默认仅在浏览器中生成文件，不会修改仓库，也不需要登录。未来接入后端时，在页面加载前提供以下保存适配器即可启用“保存到后端”：

```js
window.velaMdxProvider = {
  async save({ path, content }) {
    // 在这里调用自己的后端或 GitHub API。
  }
};
```

后端应自行完成登录、权限校验、内容校验和提交审计。不要把 GitHub Token 写进网页代码。

## 自定义域名

绑定域名时，在 GitHub 仓库的 Actions Variables 中设置：

```text
SITE_URL=https://你的二级域名
BASE_PATH=/
```

随后在 GitHub Pages 设置中配置 Custom domain，并在域名服务商处添加对应 DNS 记录。域名确认后再执行这一步。

## 本地命令

项目保留 Astro 标准命令，但本仓库约定正式构建和部署全部由 GitHub Actions 执行：

```text
npm run build
```

日常更新内容不需要在本地构建，直接通过 GitHub 或 Git 提交即可。
