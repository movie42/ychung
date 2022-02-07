import { $ } from "../utils/utils";

export function eventTrigger(selector, type, func) {
  const node = $(selector);
  if (!node) {
    return;
  }
  return node.addEventListener(type, func);
}

export function windowEventTrigger(selector, type, func) {
  if (!$(selector)) {
    return;
  }
  return window.addEventListener(type, func);
}
