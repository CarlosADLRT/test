// @flow
import iziToast from 'izitoast';

export function toast(message: string, type ? : string = 'success'): void {

  iziToast[type]({
    message: message,
    position: 'bottomLeft',
    displayMode: 2,
    closeOnClick: true
  })
}

export function question(title: string, message, okClick) {
  iziToast.question({
    timeout: false,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 1051,
    title: title,
    message: message,
    position: 'center',
    buttons: [
      ['<button><b>YES</b></button>', function (instance, toast) {

        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        okClick();

      }, true],
      ['<button>NO</button>', function (instance, toast) {

        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

      }],
    ]
  });
}
