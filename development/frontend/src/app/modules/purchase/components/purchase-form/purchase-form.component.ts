/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  output,
  PLATFORM_ID,
  viewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { environment } from '../../../../../environments/environment'
import {
  Address,
  AddressAutocompleteComponent,
} from '../../../../shared/components/forms/address-autocomplete/address-autocomplete.component'
import { FormInputComponent } from '../../../../shared/components/forms/form-input/form-input.component'
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component'
import { PrivacyModalComponent } from '../../../../shared/components/ui/privacy-modal/privacy-modal.component'
import { TermsModalComponent } from '../../../../shared/components/ui/terms-modal/terms-modal.component'
import { CondoFormControl } from '../../../../shared/interfaces/condo.interface'

@Component({
  selector: 'app-purchase-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    ButtonComponent,
    AddressAutocompleteComponent,
    TermsModalComponent,
    PrivacyModalComponent,
  ],
  templateUrl: './purchase-form.component.html',
  styleUrl: './purchase-form.component.scss',
})
export class PurchaseFormComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID)
  private fb = inject(FormBuilder)
  readonly siteKey = environment.turnstileSiteKey

  form = this.initForm()
  showTermsModal = false
  showPrivacyModal = false

  isLoading = input(false)
  errorMessage = input('')
  formSubmit = output<typeof this.form.value>()
  turnstileToken = output<string>()
  turnstileContainer = viewChild<ElementRef<any>>('turnstileContainer')

  ngAfterViewInit(): void {
    if (this.platformId !== 'browser') return
    this.renderTurnstile()
  }

  private renderTurnstile() {
    if (!window.turnstile) return
    window.turnstile.render(this.turnstileContainer()!.nativeElement, {
      sitekey: this.siteKey,
      callback: (token: string) => this.turnstileToken.emit(token),
      theme: 'light',
    })
  }

  private initForm(): FormGroup<CondoFormControl> {
    return this.fb.nonNullable.group({
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: [''],
      lineId: [''],
      address: ['', [Validators.required]],
      subDistrict: ['', [Validators.required]],
      district: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.formSubmit.emit(this.form.getRawValue())
  }

  onSelectAddress(address: Address) {
    this.form.patchValue(address)
  }

  openTermsModal() {
    this.showTermsModal = true
  }

  closeTermsModal() {
    this.showTermsModal = false
  }

  openPrivacyModal() {
    this.showPrivacyModal = true
  }

  closePrivacyModal() {
    this.showPrivacyModal = false
  }
}
