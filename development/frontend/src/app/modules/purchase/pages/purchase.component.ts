import { Component, inject, signal } from '@angular/core'
import { catchError, finalize, throwError } from 'rxjs'

import { CondoFormValue } from '../../../shared/interfaces/condo.interface'
import { CondoService } from '../../../shared/services/condo.service'
import { PurchaseFormComponent } from '../components/purchase-form/purchase-form.component'
import { PurchaseSuccessComponent } from '../components/purchase-success/purchase-success.component'

@Component({
  selector: 'app-purchase',
  imports: [PurchaseFormComponent, PurchaseSuccessComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  private condoService = inject(CondoService)

  isLoading = false
  errorMessage = ''
  backgroundImage =
    'bg-[url(https://images.unsplash.com/photo-1602595688238-9fffe12d5af3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]'

  success = signal(false)

  onSubmit(form: CondoFormValue) {
    this.isLoading = true
    this.errorMessage = ''

    this.condoService
      .register(form)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.message
          return throwError(() => error)
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => this.success.set(true))
  }
}
