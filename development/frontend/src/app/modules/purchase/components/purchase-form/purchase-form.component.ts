import { CommonModule } from '@angular/common'
import { Component, inject, input, output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

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
export class PurchaseFormComponent {
  private fb = inject(FormBuilder)
  form = this.initForm()
  showTermsModal = false
  showPrivacyModal = false

  isLoading = input(false)
  errorMessage = input('')
  formSubmit = output<typeof this.form.value>()

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
    this.form.enable()
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
