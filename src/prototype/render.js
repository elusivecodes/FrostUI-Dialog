import $ from '@fr0st/query';

/**
 * Render the Modal.
 */
export function _render() {
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
};
