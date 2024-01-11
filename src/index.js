import { alert } from './alert.js';
import { confirm } from './confirm.js';
import Dialog from './dialog.js';
import { _render } from './prototype/render.js';

// Dialog default options
Dialog.defaults = {
    content: '',
    title: null,
    buttons: [],
    size: null,
    backdrop: 'static',
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

export {
    alert,
    confirm,
    Dialog,
};
