import { getSelector, getSelectorAll } from "./selectors";

function scrollHeightHandler() {
  return window.scrollY;
}

function componentHeightHandler() {
  let componentHeight = 0;

  const scrollAnimationContainerList = getSelectorAll(
    ".scroll_animation_wrapper"
  );

  for (let i = 0; i < scrollAnimationContainerList.length; i++) {
    componentHeight += scrollAnimationContainerList[i].clientHeight;
  }

  return componentHeight;
}

function scrollAnimationComponent() {
  function scrollAnimation() {
    let scrollHeight = scrollHeightHandler();
    let componentHeight = componentHeightHandler();

    console.log(componentHeight - scrollHeight);
  }
  window.addEventListener("scroll", scrollAnimation);
}

scrollAnimationComponent();
