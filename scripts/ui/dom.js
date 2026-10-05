/**
 * @param {string} tag
 * @param {object} [options]
 * @param {string} [options.className]
 * @param {string | number} [options.text]
 * @param {Record<string, string>} [options.attributess]
 * @param {Node[]} [options.children]
 * @returns {HTMLElement}
 */
export function createElement(
  tag,
  { className, text, attributess = {}, children = [] } = {},
) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = String(text);
  }

  Object.entries(attributess).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  element.append(...children);

  return element;
}
