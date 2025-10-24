export const SITE_TITLE = "E9's Space";
export const SITE_DESCRIPTION = "A internet space for @ec50n9.";

export interface MenuItem {
  label: string;
  url: string;
}

const menuLabels = [
  ["/", ["见我", "此间", "栖心", "一", "一方"]],
  ["/writings", ["杂函", "青简", "耕笔", "迹", "墨痕"]],
  ["/thoughts", ["思绪", "灵羽", "星屑", "光", "思绪"]],
  ["/ships", ["造物", "心匠", "栽种", "造物", "心舟"]],
  ["/plants", ["耕录"]]
] as const

const pickMenuLabels = (index: number): MenuItem[] =>
  menuLabels.map(([url, labels]) => ({
    label: labels[index],
    url
  }))

// const menuLabelIndex = getRandom(0, menuLabels[0][1].length - 1, 1)
const menuLabelIndex = 0
export const menuItems: MenuItem[] = pickMenuLabels(menuLabelIndex);

export const title = "E9's Space";
export const description = "A internet space for @ec50n9.";
export const image = "/images/ogimage.png";
export const url = "https://sanju.sh";

export const ogImage = {
  src: "/images/ogimage.png",
  alt: "Ec50n9's Space",
};


export const products: { name: string, url: string, image: string }[] = [
  // {
  //   name: "Fli.so",
  //   url: "https://fli.so",
  //   image: "/products/fli.png",
  // },
];

export interface TechItem {
  name: string;
  proficiency: 'expert' | 'proficient' | 'familiar';
}

export interface TechStack {
  title: string;
  items: TechItem[];
  bgClass: string;
  titleColor: string;
  textColor: string;
}

export const techStacks: TechStack[] = [
  {
    title: '前端',
    items: [
      { name: 'Vue3', proficiency: 'expert' },
      { name: 'React', proficiency: 'proficient' },
      { name: 'Next.js', proficiency: 'proficient' },
      { name: 'TypeScript', proficiency: 'expert' },
      { name: 'Vite', proficiency: 'expert' },
      { name: 'Webpack', proficiency: 'proficient' }
    ],
    bgClass: 'bg-blue-50 dark:bg-blue-950/50',
    titleColor: 'text-blue-700 dark:text-blue-400',
    textColor: 'text-blue-600 dark:text-blue-300'
  },
  {
    title: '后端',
    items: [
      { name: 'Node.js', proficiency: 'expert' },
      { name: 'Express', proficiency: 'expert' },
      { name: 'Nest.js', proficiency: 'proficient' },
      { name: 'SpringBoot', proficiency: 'familiar' },
      { name: 'Prisma ORM', proficiency: 'proficient' }
    ],
    bgClass: 'bg-orange-50 dark:bg-orange-950/50',
    titleColor: 'text-orange-700 dark:text-orange-400',
    textColor: 'text-orange-600 dark:text-orange-300'
  },
  {
    title: '数据库',
    items: [
      { name: 'MySQL', proficiency: 'proficient' },
      { name: 'PostgreSQL', proficiency: 'proficient' },
      { name: 'MongoDB', proficiency: 'proficient' },
      { name: 'Redis', proficiency: 'proficient' }
    ],
    bgClass: 'bg-violet-50 dark:bg-violet-950/50',
    titleColor: 'text-violet-700 dark:text-violet-400',
    textColor: 'text-violet-600 dark:text-violet-300'
  },
  {
    title: '工具',
    items: [
      { name: 'TailwindCSS', proficiency: 'expert' },
      { name: 'UnoCSS', proficiency: 'proficient' },
      { name: 'Tauri', proficiency: 'proficient' },
      { name: 'Electron', proficiency: 'familiar' },
      { name: 'Docker', proficiency: 'proficient' }
    ],
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/50',
    titleColor: 'text-emerald-700 dark:text-emerald-400',
    textColor: 'text-emerald-600 dark:text-emerald-300'
  }
];

export const socialLinks = [
  // {
  // 	label: "@x",
  // 	url: "https://x.com/spikeysanju",
  // },
  {
    label: "email",
    url: "mailto:shelloworld@qq.com",
  },
  {
    label: "github",
    url: "https://github.com/ec50n9",
  },
  // {
  //   label: "linkedin",
  //   url: "https://www.linkedin.com/in/ec50n9",
  // },
];
