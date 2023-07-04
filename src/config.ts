import { sig, effect } from "@uwu/iota";

const nanFallback = (f: number, v: number) => (Number.isNaN(v) ? f : v);
const initFromLs = (key: string, fallback: number) =>
  sig(nanFallback(fallback, parseFloat(localStorage.getItem(key)!)));

export const stretchLength = initFromLs("sl", 30);
export const fullLength = initFromLs("fl", 5 * 60);

effect(() => localStorage.setItem("sl", stretchLength().toString()));
effect(() => localStorage.setItem("fl", fullLength().toString()));
