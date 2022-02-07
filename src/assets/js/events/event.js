import { $, $All } from "../utils/utils";

export function eventTrigger(selector, type, func) {
  const node = $(selector);
  if (!node) {
    return;
  }
  return node.addEventListener(type, func);
}

export function nodeListEventTrigger(selector, type, func) {
  const nodeList = $All(selector);
  if (!nodeList) {
    return;
  }

  return Array.prototype.map.call(nodeList, (value) => {
    value.addEventListener(type, func);
  });
}

export function windowEventTrigger(selector, type, func) {
  if (!$(selector)) {
    return;
  }
  return window.addEventListener(type, func);
}
