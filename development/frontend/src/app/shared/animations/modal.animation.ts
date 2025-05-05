import { trigger, state, style, transition, animate } from '@angular/animations'

export const modalAnimation = trigger('modalAnimation', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),
  transition(':enter', [animate('100ms ease-in')]),
  transition(':leave', [animate('100ms ease-out')]),
])
