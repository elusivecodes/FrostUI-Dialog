import Dialog from './dialog.js';

/**
 * Render an alert Dialog.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} [content] The alert content.
 * @param {function} [callback] The callback to execute when the alert is closed.
 * @param {object} [options] Options for rendering the alert.
 * @return {Dialog} The alert Dialog.
 */
export function alert(content = '', callback = () => { }, options = {}) {
    return new Dialog({
        content,
        buttons: [
            {
                text: Dialog.lang.ok,
                style: Dialog.classes.btnPrimary,
                callback,
            },
        ],
        ...options,
    });
};
