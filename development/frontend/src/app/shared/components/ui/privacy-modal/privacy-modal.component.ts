import { Component, HostListener, input, output, signal } from '@angular/core'

import { modalAnimation } from '../../../animations/modal.animation'
import { PRIVACY } from '../../../constants/privacy.const'

@Component({
  selector: 'app-privacy-modal',
  imports: [],
  templateUrl: './privacy-modal.component.html',
  styleUrl: './privacy-modal.component.scss',
  animations: [modalAnimation],
})
export class PrivacyModalComponent {
  isVisible = input(false)
  isClose = output()

  privacy = signal(PRIVACY)

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
