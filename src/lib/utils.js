import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names using clsx,
 * then merge conflicting Tailwind classes using tailwind-merge.
 *
 * @param {...any} inputs - A list of class name values (strings, arrays, objects).
 * @returns {string} - A single merged class string.
 */
export function cn(...inputs) {
  // Step 1: Convert all inputs into a single class string
  const classString = clsx(...inputs);

  // Step 2: Merge Tailwind styles so later classes override earlier ones
  const mergedClasses = twMerge(classString);

  // Step 3: Return the final merged class list
  return mergedClasses;
}
