import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @params inputs - ClassValue 타입의 클래스를 포함하는 배열
 * @returns
 */

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
