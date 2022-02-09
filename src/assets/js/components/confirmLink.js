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
