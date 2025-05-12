import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from '../../../environments/environment'
import { CondoFormValue, CondoPayload, CondoResponse } from '../interfaces/condo.interface'

@Injectable({
  providedIn: 'root',
})
export class CondoService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl + '/condo'

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

  register(formValue: CondoFormValue, token: string): Observable<CondoResponse> {
    const url = this.apiUrl + '/register'
    const headers = new HttpHeaders({ 'x-cloudflare-token': token })
    const payload = this.mapToPayload(formValue)
    return this.http.post<CondoResponse>(url, payload, { headers })
  }
}
