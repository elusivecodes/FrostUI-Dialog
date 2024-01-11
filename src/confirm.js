import Dialog from './dialog.js';

/**
 * Render a confirm Dialog.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} [content] The confirm dialog content.
 * @param {function} [callback] The callback to execute when the confirm dialog is closed.
 * @param {object} [options] Options for rendering the alert.
 * @return {Dialog} The confirm Dialog.
 */
export function confirm(content = '', callback = () => { }, options = {}) {
    return new Dialog({
        content,
        buttons: [
            {
                text: Dialog.lang.cancel,
                style: Dialog.classes.btnSecondary,
                callback: () => callback(false),
            },
            {
                text: Dialog.lang.ok,
                style: Dialog.classes.btnPrimary,
                callback: () => callback(true),
            },
        ],
        ...options,
    });
};
