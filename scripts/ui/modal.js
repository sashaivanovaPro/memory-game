import { createElement } from "./dom.js";

const SCROLL_LOCK_CLASS = "scroll-lock";

const content = createElement("div", { className: "modal__content" });

const closeButton = createElement("button", {
  className: "modal__close",
  text: "Close",
  attributess: { type: "button" },
});

const dialog = createElement("dialog", {
  className: "modal",
  children: [
    createElement("div", {
      className: "modal__inner",
      children: [content, closeButton],
    }),
  ],
});

export function closeModal() {
  if (dialog.open) {
    dialog.close();
  }
}

/**
 * @param {Node[]} children
 */
export function openModal(children) {
  content.replaceChildren(...children);

  if (!dialog.open) {
    dialog.showModal();
  }

  document.body.classList.add(SCROLL_LOCK_CLASS);
}

export function createModal() {
  closeButton.addEventListener("click", closeModal);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeModal();
    }
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove(SCROLL_LOCK_CLASS);
  });

  return dialog;
}
