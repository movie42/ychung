class Modal extends HTMLElement {
  constructor() {
    super();
    this.modalIcon;
    this.tooltipVisable = false;
    this.tooltipText = "default text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            div { 
                font-weight: normal;
                background-color: black;
                color: white;
                position: absolute;
                top:3rem;
                left:0.75rem;
                z-index: 10;
                padding: 0.05rem;
                border-radius:0.3px;
                box-shadow: 0.1rem 0.1rem 0.6rem rgba(0,0,0,0.26)

            }

            :host(.important) {
                background-color: var(--color-primary);
                padding:0.5rem;
            }

            :host-context(p) {
                font-weight: bold;
            }

            .highlight {
                background-color: red;
            }

            ::slotted(.highlight) {
              color : red
            }

            .icon{
                background: black;
                color: white;
                padding: 0.05rem 1.0rem;
                text-align: center;
                border-radius: 50%;
            }
        </style>
        <slot>Some default</slot>
        <span class="icon">?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) this.tooltipText = this.getAttribute("text");
    this.modalIcon = this.shadowRoot.querySelector("span");
    this.modalIcon.addEventListener("mouseenter", this.#showTooltip.bind(this));
    this.modalIcon.addEventListener("mouseleave", this.#hideTooltip.bind(this));
    this.style.position = "relative";
    this.#render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === "text") {
      this.tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  disconnectedCallback() {
    this.modalIcon.removeEventListener("mouseenter", this.#showTooltip);
    this.modalIcon.removeEventListener("mouseleave", this.#hideTooltip);
  }

  #render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this.tooltipVisable) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this.tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) this.shadowRoot.removeChild(tooltipContainer);
    }
  }

  #showTooltip() {
    this.tooltipVisable = true;
    this.#render();
  }

  #hideTooltip() {
    this.tooltipVisable = false;
    this.#render();
  }
}

customElements.define("yc-style-modal", Modal);
