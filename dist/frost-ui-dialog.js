(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@fr0st/query'), require('@fr0st/ui')) :
    typeof define === 'function' && define.amd ? define(['exports', '@fr0st/query', '@fr0st/ui'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.UI = global.UI || {}, global.fQuery, global.UI));
})(this, (function (exports, $, ui) { 'use strict';

    /**
     * Dialog Class
     * @class
     */
    class Dialog {
        /**
         * New Dialog constructor.
         * @param {object} [options] The options to create the Dialog with.
         */
        constructor(options = {}) {
            this._options = $._extend(
                {},
                this.constructor.defaults,
                options,
            );

            this._render();

            if (this._options.appendTo) {
                $.append(this._options.appendTo, this._node);
            } else {
                $.append(document.body, this._node);
            }

            this._modal = ui.Modal.init(this._node, {
                backdrop: this._options.backdrop,
                show: true,
            });

            $.addEventOnce(this._node, 'hidden.ui.modal', () => {
                $.remove(this._node);

                this._node = null;
                this._modal = null;
            });
        }

        /**
         * Close the Dialog.
         */
        close() {
            this._modal.hide();
        }
    }

    /**
     * Render an alert Dialog.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} [content] The alert content.
     * @param {function} [callback] The callback to execute when the alert is closed.
     * @param {object} [options] Options for rendering the alert.
     * @return {Dialog} The alert Dialog.
     */
    function alert(content = '', callback = () => { }, options = {}) {
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
    }

    /**
     * Render a confirm Dialog.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} [content] The confirm dialog content.
     * @param {function} [callback] The callback to execute when the confirm dialog is closed.
     * @param {object} [options] Options for rendering the alert.
     * @return {Dialog} The confirm Dialog.
     */
    function confirm(content = '', callback = () => { }, options = {}) {
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
    }

    /**
     * Render the Modal.
     */
    function _render() {
        this._node = $.create('div', {
            class: this.constructor.classes.modal,
            attributes: {
                'tabindex': -1,
                'role': 'dialog',
                'aria-modal': true,
            },
        });

        const modalDialog = $.create('div', {
            class: this.constructor.classes.modalDialog,
        });

        switch (this._options.size) {
            case 'sm':
                $.addClass(modalDialog, this.constructor.classes.modalSm);
                break;
            case 'lg':
                $.addClass(modalDialog, this.constructor.classes.modalLg);
                break;
            case 'xl':
                $.addClass(modalDialog, this.constructor.classes.modalXl);
                break;
        }

        if (this._options.centerVertical) {
            $.addClass(modalDialog, this.constructor.classes.modalDialogCentered);
        }

        $.append(this._node, modalDialog);

        const modalContent = $.create('div', {
            class: this.constructor.classes.modalContent,
        });

        $.append(modalDialog, modalContent);

        if (this._options.title || this._options.closeBtn) {
            const modalHeader = $.create('div', {
                class: this.constructor.classes.modalHeader,
            });

            $.append(modalContent, modalHeader);

            const modalTitle = $.create('h6', {
                class: this.constructor.classes.modalTitle,
                text: this._options.title,
            });

            $.append(modalHeader, modalTitle);

            if (this._options.closeBtn) {
                const closeBtn = $.create('button', {
                    class: this.constructor.classes.btnClose,
                    attributes: {
                        'type': 'button',
                        'aria-label': this.constructor.lang.close,
                    },
                });

                $.addEvent(closeBtn, 'click.ui.dialog', () => {
                    this.close();
                });

                $.append(modalHeader, closeBtn);
            }
        }

        if (this._options.content) {
            const modalBody = $.create('div', {
                class: this.constructor.classes.modalBody,
            });

            if ($._isString(this._options.content)) {
                $.setText(modalBody, this._options.content);
            } else {
                $.append(modalBody, this._options.content);
            }

            $.append(modalContent, modalBody);
        }

        if (this._options.buttons.length) {
            const modalFooter = $.create('div', {
                class: this.constructor.classes.modalFooter,
            });

            $.append(modalContent, modalFooter);

            for (const buttonData of this._options.buttons) {
                const button = $.create('button', {
                    class: [this.constructor.classes.btn, buttonData.style],
                    text: buttonData.text,
                    attributes: {
                        type: 'button',
                    },
                });

                $.addEvent(button, 'click.ui.dialog', () => {
                    if (buttonData.callback) {
                        buttonData.callback();
                    }

                    this.close();
                });

                $.append(modalFooter, button);
            }
        }
    }

    // Dialog default options
    Dialog.defaults = {
        content: '',
        title: null,
        buttons: [],
        size: null,
        backdrop: 'static',
        centerVertical: false,
        closeBtn: true,
        appendTo: null,
    };

    // Dialog classes
    Dialog.classes = {
        btn: 'btn ripple mb-0',
        btnClose: 'btn-close',
        btnPrimary: 'btn-primary',
        btnSecondary: 'btn-secondary',
        modal: 'modal',
        modalBody: 'modal-body',
        modalContent: 'modal-content',
        modalDialog: 'modal-dialog',
        modalDialogCentered: 'modal-dialog-centered',
        modalFooter: 'modal-footer',
        modalHeader: 'modal-header',
        modalLg: 'modal-lg',
        modalSm: 'modal-sm',
        modalTitle: 'modal-title',
        modalXl: 'modal-xl',
    };

    // Dialog language
    Dialog.lang = {
        cancel: 'Cancel',
        close: 'Close',
        ok: 'OK',
    };

    // Dialog prototype
    const proto = Dialog.prototype;

    proto._render = _render;

    exports.Dialog = Dialog;
    exports.alert = alert;
    exports.confirm = confirm;

}));
//# sourceMappingURL=frost-ui-dialog.js.map
