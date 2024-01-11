import $ from '@fr0st/query';
import { Modal } from '@fr0st/ui';

/**
 * Dialog Class
 * @class
 */
export default class Dialog {
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

        this._modal = Modal.init(this._node, {
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
};
