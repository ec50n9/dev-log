export const SITE_TITLE = "Ec50n9's Space";
export const SITE_DESCRIPTION = "A internet space for Ec50n9.";

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
		label: "文章",
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

export const title = "Ec50n9's Space";
export const description = "A internet space for Ec50n9.";
export const image = "/images/ogimage.png";
export const url = "https://xxsong.com";

export const ogImage = {
	src: "/images/ogimage.png",
	alt: "Ec50n9's Space",
};


export const products: {
	name: string;
	url: string;
	image: string;
}[] = [];

export const socialLinks = [
	{
		label: "email",
		url: "mailto:shelloworld@qq.com",
	},
	{
		label: "github",
		url: "https://github.com/ec50n9",
	},
];
