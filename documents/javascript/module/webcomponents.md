# 웹 컴포넌트

해야할일

- [ ] webcomponent 복습하기
- [ ] modal 테스트 (회원가입 경고창 아이템 삭제시 확인 취소 버튼으로 경고하기)
- [ ] component 분리하기
- [ ] 실재로 서비스 하고 있는 git과 분리하기(https://velog.io/@hoo00nn/Git-Repository-%EB%B3%B5%EC%82%AC%ED%95%98%EA%B8%B0)

웹 컴포넌트 기본

webcomponenet lifecycle
styling

```pug
style(type="text/css").
        *{
            box-sizing: border-box;
        }

        :root {
            --color-primary: lightblue;
        }

        yc-style-modal{
            border: 1px solid red;
        }

    .inform_wrapper
        h1.head_title 안녕하세요!
    p
        yc-style-modal(class="important" text="Web Components is a set of standards.")
            span.highlight Web Component
        | are Awesome

    yc-style-modal somthing wrong
```

```js
class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm("Do You really want to leave?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("yc-style-confirm-link", ConfirmLink, { extends: "a" });
```

```js
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
```

```js
class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, 0.75);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
            }

            :host([opened]) #backdrop, 
            :host([opened]) #modal{
                opacity:1;
                pointer-events:all;
            }

            :host([opened]) #modal{
                top:50%;
            }
            
            #modal {
                position: fixed;
                top:40%;
                left:50%;
                transform : translate(-50%, -50%);
                width:50%;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
                transition:all 0.3s ease-out;
            }

            header {
                padding:1.5rem;
                border-bottom: 1px solid #ccc;
            }

            slot[name=title]{
                font-size:3rem;
                margin: 0;
            }

            #main{
                padding: 1rem;
                font-size:1.4rem;
            }

            #actions{
                border-top : 1px solid lightgray;
                padding:1.5rem;
                display:flex;
                justify-content:flex-end;
            }

            #actions button{
                margin: 0 0.25rem;
            }

        </style>
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

const confirmButton = document.querySelector("button");
const modal = document.querySelector("yc-style-modal");

modal.addEventListener("cancel", () => {
  console.log("cancel");
});

modal.addEventListener("confirm", () => {
  console.log("confirm");
});

confirmButton.addEventListener("click", () => {
  if (!modal.isOpen) {
    modal.open();
  }
});
```

https://developer.mozilla.org/en-US/docs/Web/Web_Components
https://developers.google.com/web/fundamentals/web-components
https://developers.google.com/web/fundamentals/web-components/shadowdom
https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots

::slotted(title)

slot[name=title]

https://dev.to/m4thieulavoie/how-i-managed-to-use-scss-inside-web-components-3lk9
