import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number) => {
  const rst = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(num);

  return rst;
};

export const formatDate = (date: string) => {
  return dayjs(date).format("MMM DD, YYYY");
};

export const splitText = (el: any) => {
  const text = el.textContent;
  el.textContent = "";
  text.split("").forEach((char: any) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    el.appendChild(span);
  });
  return el.querySelectorAll("span");
};
