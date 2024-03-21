import { IconListProps } from "./types";

export const iconList: IconListProps[] = [
  {
    name: "Fabrics",
    icon: "cutting",
  },

  {
    name: "Bags",
    icon: "3d-briefcase",
  },
  {
    name: "Clothing",
    icon: "clothes-hanger",
  },
  {
    name: "Custom",
    icon: "fashion-design",
  },
  {
    name: "Accessories",
    icon: "accessories",
  },
  {
    name: "Shoes",
    icon: "shoes",
  },
  {
    name: "Watches",
    icon: "wristwatch",
  },
  {
    name: "Wedding",
    icon: "wedding",
  },
  {
    name: "Man",
    icon: "man",
  },
  {
    name: "Woman",
    icon: "woman",
  },
  {
    name: "Unisex",
    icon: "unisex",
  },
  {
    name: "Boy",
    icon: "boy",
  },
  {
    name: "Girl",
    icon: "girl",
  },
];

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export const currencyFormat = (price: number) => {
  return price?.toLocaleString("en-NG");
};
