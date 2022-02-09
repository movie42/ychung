import "./confirmLink";

class Modal extends HTMLElement {
  constructor() {
    super();
    this.tooltipContainer;
    this.tooltipText = "default text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            div { 
                background-color:black;
                color: white;
                position:absolute;
                z-index:10;
            }
        </style>
        <slot>Some default</slot>
        <span> (?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) this.tooltipText = this.getAttribute("text");
    const modalIcon = this.shadowRoot.querySelector("span");
    modalIcon.addEventListener("mouseenter", this.#showTooltip.bind(this));
    modalIcon.addEventListener("mouseleave", this.#hideTooltip.bind(this));
    this.shadowRoot.appendChild(modalIcon);
  }

  #showTooltip() {
    this.tooltipContainer = document.createElement("div");
    this.tooltipContainer.textContent = this.tooltipText;
    this.shadowRoot.appendChild(this.tooltipContainer);
  }

  #hideTooltip() {
    this.shadowRoot.removeChild(this.tooltipContainer);
  }
}

customElements.define("yc-style-modal", Modal);
