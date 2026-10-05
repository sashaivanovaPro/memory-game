import { createModal, openModal } from "./ui/modal.js";
import { createElement } from "./ui/dom.js";

document.body.append(createModal());
openModal([createElement("p", { text: "Hello" })]);
