import { $, $All } from "../utils/utils";

export function eventTrigger(selector, func, ...eventTypes) {
  const node = $(selector);
  if (!node) {
    return;
  }
  return eventTypes.map((eventType) => node.addEventListener(eventType, func));
}

export function nodeListEventTrigger(selector, func, ...eventTypes) {
  const nodeList = $All(selector);
  if (!nodeList) {
    return;
  }
  return Array.prototype.map.call(nodeList, (node) => {
    eventTypes.map((eventType) => node.addEventListener(eventType, func));
  });
}

export function windowEventTrigger(selector, func, ...eventTypes) {
  if (!$(selector)) {
    return;
  }
  eventTypes.map((eventType) => window.addEventListener(eventType, func));
}
