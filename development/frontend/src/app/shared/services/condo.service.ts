import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { CondoFormValue, CondoPayload, CondoResponse } from '../interfaces/condo.interface'

@Injectable({
  providedIn: 'root',
})
export class CondoService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/api/condo'

  private mapToPayload(formValue: CondoFormValue): CondoPayload {
    return {
      fullName: formValue.fullName,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email,
      lineId: formValue.lineId,
      address: formValue.address,
      subDistrict: formValue.subDistrict,
      district: formValue.district,
      province: formValue.province,
      postalCode: formValue.postalCode,
      terms: formValue.terms,
    }
  }

  register(formValue: CondoFormValue): Observable<CondoResponse> {
    const payload = this.mapToPayload(formValue)
    return this.http.post<CondoResponse>(this.apiUrl + '/register', payload)
  }
}
