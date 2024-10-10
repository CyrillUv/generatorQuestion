import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const test = trigger('test', [
  state(
    'open',
    style({
      transform: 'translateX(100%)',
      background: 'blue',
      width: '30%',
      height: '30%',
      border: '1px solid blue',
    }),
  ),
  state(
    'closed',
    style({
      background: 'red',
      transform: 'scale(0.5)',
      width: '30%',
      height: '30%',
    }),
  ),

  transition('open=>closed', [
    animate(
      '500ms ease-in',
      style({
        transform: 'translateY(30%)',
        width: '30%',
        height: '30%',
        background: 'yellow',
      }),
    ),
    animate(
      '5000ms ease-in',
      keyframes([
        style({
          transform: 'translateX(100%)',
          offset: '0.2',
        }),
        style({
          background: 'white',
          offset: '0.6',
          transform: 'scale(0.5)',
        }),
        style({
          background: 'red',
          offset: '0.8',
        }),
      ]),
    ),
  ]),
  transition('closed=>open', [
    animate(
      '5000ms ease-in',
      keyframes([
        style({
          width: '30%',
          height: '30%',
          transform: 'translateX(100%)',
          offset: '0.2',
        }),
        style({
          background: 'white',
          offset: '0.6',
          transform: 'scale(0.5)',
        }),
        style({
          background: 'blue',
          offset: '0.8',
        }),
      ]),
    ),
    animate(
      '2000ms ease-in',
      style({
        transform: 'translateX(100%)',
        background: 'blue',
        width: '30%',
        height: '30%',
        border: '1px solid blue',
      }),
    ),
  ]),
]);
