import { Component, HostListener, input, output, signal } from '@angular/core'

import { modalAnimation } from '../../../animations/modal.animation'
import { TERM } from '../../../constants/term.const'

@Component({
  selector: 'app-terms-modal',
  imports: [],
  templateUrl: './terms-modal.component.html',
  styleUrl: './terms-modal.component.scss',
  animations: [modalAnimation],
})
export class TermsModalComponent {
  isVisible = input(false)
  isClose = output()

  terms = signal(TERM)

  close() {
    this.isClose.emit()
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close()
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.close()
  }
}
