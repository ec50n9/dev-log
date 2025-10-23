export const SITE_TITLE = "Sanju's Space";
export const SITE_DESCRIPTION = "A internet space for Sanju.";

export interface MenuItem {
  label: string;
  url: string;
}

export const menuItems: MenuItem[] = [
  {
    label: "首页",
    url: "/",
  },
  {
    label: "Sanju文章",
    url: "/writings",
  },
  {
    label: "想法",
    url: "/thoughts",
  },
  {
    label: "项目",
    url: "/ships",
  },
];

export const title = "Sanju's Space";
export const description = "A internet space for Sanju.";
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
  // {
  //   name: "Uiino",
  //   url: "https://uiino.com",
  //   image: "/products/uiino.png",
  // },
  // {
  //   name: "SticAI",
  //   url: "https://sticai.com",
  //   image: "/products/sticai.png",
  // },
  // {
  //   name: "Dun",
  //   url: "https://dunsuite.com",
  //   image: "/products/dun.png",
  // },
  // {
  //   name: "DunTasks",
  //   url: "https://duntasks.com",
  //   image: "/products/duntasks.png",
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
