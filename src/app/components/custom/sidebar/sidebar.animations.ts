import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const sidebar = [
  trigger('sidebar', [
    transition('open<=>closed', [animate('500ms')]),
    state('open', style({ transform: 'translateX(0%)' })),
    state('closed', style({ transform: 'translateX(-100%)' })),
  ]),
];
