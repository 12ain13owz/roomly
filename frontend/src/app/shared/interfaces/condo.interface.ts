import { FormControl, FormGroup } from '@angular/forms'

export interface CondoFormControl {
  fullName: FormControl<string>
  phoneNumber: FormControl<string>
  email: FormControl<string>
  lineId: FormControl<string>
  address: FormControl<string>
  subDistrict: FormControl<string>
  district: FormControl<string>
  province: FormControl<string>
  postalCode: FormControl<string>
  terms: FormControl<boolean>
}
export type CondoFormValue = FormGroup<CondoFormControl>['value']
export type CondoPayload = Partial<CondoFormValue>
export interface CondoResponse {
  message: string
}
