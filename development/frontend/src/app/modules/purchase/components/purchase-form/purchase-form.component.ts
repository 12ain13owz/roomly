import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'

import {
  Address,
  AddressAutocompleteComponent,
} from '../../../../shared/components/forms/address-autocomplete/address-autocomplete.component'
import { FormInputComponent } from '../../../../shared/components/forms/form-input/form-input.component'
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component'
import { PrivacyModalComponent } from '../../../../shared/components/ui/privacy-modal/privacy-modal.component'
import { TermsModalComponent } from '../../../../shared/components/ui/terms-modal/terms-modal.component'

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
  isLoading = false
  showTermsModal = false
  showPrivacyModal = false

  initForm() {
    return this.fb.nonNullable.group({
      fullName: [''],
      phoneNumber: [''],
      email: [''],
      lineId: [''],
      address: [''],
      subDistrict: [{ value: '', disabled: true }],
      district: [{ value: '', disabled: true }],
      province: [{ value: '', disabled: true }],
      postalCode: [{ value: '', disabled: true }],
      terms: [false],
    })
  }

  onSelectAddress(address: Address) {
    this.form.patchValue(address)
  }

  openTermsModal() {
    this.showTermsModal = true
  }

  openPrivacyModal() {
    this.showPrivacyModal = true
  }

  closeTermsModal() {
    this.showTermsModal = false
  }

  closePrivacyModal() {
    this.showPrivacyModal = false
  }
}
