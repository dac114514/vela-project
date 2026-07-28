export const siteInfo = {
  name: '蓝桥工作室作品集',
  shortName: '蓝桥工作室',
  description: '收录蓝桥工作室创作的小程序作品，浏览项目介绍、应用截图与访问入口。',
  intro: '把轻巧、实用、有趣的想法，认真做成触手可及的小程序作品。',
  copyright: `© ${new Date().getFullYear()} 蓝桥工作室`,
  banners: [
    {
      kind: 'recruitment',
      eyebrow: '加入蓝桥',
      title: '寻找志同道合的同伴',
      action: '了解招募',
      href: 'https://user.qzone.qq.com/1252326240',
      qq: '1252326240'
    }
  ] as Array<
    | {
        kind: 'recruitment';
        eyebrow: string;
        title: string;
        action: string;
        href: string;
        qq: string;
      }
    | {
        kind: 'brand';
        image: string;
        alt: string;
        href: string;
      }
  >,
  author: {
    name: '纯水机',
    role: '开发者',
    avatar: '/authors/pure-water-machine/avatar.webp',
    bio: '蓝桥工作室室长，站长，独立开发者。',
    contacts: [] as Array<{ label: string; url: string }>
  }
};
