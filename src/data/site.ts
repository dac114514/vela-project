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
      title: '一起把好点子做成作品',
      description: '寻找喜欢设计、开发与折腾新设备的创作者。',
      action: '了解招募',
      href: '/developer'
    },
    {
      kind: 'brand',
      image: '/brand/banner-dark-3x1.webp',
      alt: '蓝桥工作室',
      href: '/about'
    }
  ] as Array<
    | {
        kind: 'recruitment';
        eyebrow: string;
        title: string;
        description: string;
        action: string;
        href: string;
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
    avatar: '',
    bio: '蓝桥工作室室长，站长，独立开发者。',
    contacts: [] as Array<{ label: string; url: string }>
  }
};
