class Modal extends HTMLElement {
  constructor() {
    super();
    const modalIcon = document.createElement("span");
    modalIcon.textContent = "?";
    this.appendChild(modalIcon);
  }
}

customElements.define("yc-style-modal", Modal);
