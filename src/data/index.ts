export const SITE_TITLE = "E9's Space";
export const SITE_DESCRIPTION = "A internet space for @ec50n9.";

export interface MenuItem {
  label: string;
  url: string;
}

const menuLabels = [
  ["/", ["此间", "栖心", "归处", "一", "一方"]],
  ["/writings", ["松叶", "青简", "耕笔", "迹", "墨痕"]],
  ["/thoughts", ["想法", "灵羽", "星屑", "光", "思绪"]],
  ["/ships", ["项目", "心匠", "栽种", "造物", "心舟"]],
  ["/abouts", ["关于", "我执", "见我", "己", "自我"]],
] as const

const pickMenuLabels = (index: number): MenuItem[] =>
  menuLabels.map(([url, labels]) => ({
    label: labels[index],
    url
  }))

// const menuLabelIndex = getRandom(0, menuLabels[0][1].length - 1, 1)
const menuLabelIndex = 1
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
  {
    label: "linkedin",
    url: "https://www.linkedin.com/in/ec50n9",
  },
];
