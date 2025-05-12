import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-form-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  type = input('text')
  id = input('')
  label = input('')
  placeholder = input('')
  readonly = input(false)
  control = input.required<FormControl<string | null>>()
}
