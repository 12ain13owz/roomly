import { CommonModule } from '@angular/common'
import { Component, input, output, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ReactiveFormsModule } from '@angular/forms'
import { distinctUntilChanged, Subject } from 'rxjs'

export interface Address {
  subDistrict: string
  district: string
  province: string
  postalCode: string
}

@Component({
  selector: 'app-address-autocomplete',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-autocomplete.component.html',
  styleUrl: './address-autocomplete.component.scss',
})
export class AddressAutocompleteComponent {
  private inputSubject = new Subject<string>()
  private addressData: Address[] = [
    { subDistrict: 'ลาดยาว', district: 'จตุจักร', province: 'กรุงเทพมหานคร', postalCode: '10900' },
    { subDistrict: 'บางซื่อ', district: 'บางซื่อ', province: 'กรุงเทพมหานคร', postalCode: '10800' },
    { subDistrict: 'คลองเตย', district: 'คลองเตย', province: 'กรุงเทพมหานคร', postalCode: '10110' },
    {
      subDistrict: 'เมืองเชียงใหม่',
      district: 'เมืองเชียงใหม่',
      province: 'เชียงใหม่',
      postalCode: '50000',
    },
  ]

  id = input('')
  label = input('')
  placeholder = input('')

  selected = output<Address>()

  query = signal<string>('')
  showDropdown = signal<boolean>(false)
  filteredOptions = signal<Address[]>([])

  constructor() {
    this.inputSubject.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe((value) => {
      this.filterOptions(value)
    })

    this.filteredOptions.set(this.addressData)
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.query.set(value)
    this.inputSubject.next(value)
  }

  private filterOptions(query: string): void {
    if (!query) {
      this.filteredOptions.set(this.addressData)
      return
    }

    const lowerQuery = query.toLowerCase()
    const filtered = this.addressData.filter(
      (option) =>
        option.subDistrict.toLowerCase().includes(lowerQuery) ||
        option.district.toLowerCase().includes(lowerQuery) ||
        option.province.toLowerCase().includes(lowerQuery) ||
        option.postalCode.includes(lowerQuery)
    )
    this.filteredOptions.set(filtered)
  }

  selectOption(option: Address): void {
    this.selected.emit(option)
    this.query.set('') // ล้าง input หลังเลือก
    this.showDropdown.set(false)
    this.filteredOptions.set(this.addressData) // รีเซ็ตตัวเลือก
  }

  onBlur(): void {
    setTimeout(() => {
      this.showDropdown.set(false)
    }, 200)
  }
}
