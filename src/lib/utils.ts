import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");

  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// const debounce = (func: (...args: any[]) => void, delay: number) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// };
