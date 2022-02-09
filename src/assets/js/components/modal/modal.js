import modalStyle from "./modal.component.scss";

class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = modalStyle;

    this.shadowRoot.innerHTML = `
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">모달 창 제목</slot>
            </header>
            <section id="main">
                <slot name="paragraph">모달 내용입니다.</slot>
            </section>
            <section id="actions">
                <button id="cancel">아니요</button>
                <button id="confirm">네</button>
            </section>
        </div>
    `;

    this.shadowRoot.appendChild(style);

    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      console.dir(slots[1].assignedNodes());
    });
    const backdrop = this.shadowRoot.querySelector("#backdrop");
    const cancelButton = this.shadowRoot.querySelector("#cancel");
    const confirmButton = this.shadowRoot.querySelector("#confirm");
    backdrop.addEventListener("click", this._cancel.bind(this));
    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  open() {
    this.setAttribute("opened", "");
  }

  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm(event) {
    this.hide();
    const confirm = new Event("confirm", { bubbles: true, composed: true });
    event.target.dispatchEvent(confirm);
  }
}

customElements.define("yc-style-modal", Modal);
