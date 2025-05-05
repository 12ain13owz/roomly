import { CommonModule } from '@angular/common'
import { Component, computed, input } from '@angular/core'

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  type = input('button')
  isLoading = input(false)
  isDisabled = input(false)
  color = input<'yellow' | 'blue' | 'gray'>('yellow')
  size = input<'sm' | 'md' | 'lg'>('md')

  // คำนวณ classes สำหรับปุ่ม
  buttonClasses = computed(() => {
    const colorClasses = {
      yellow: 'bg-yellow-700 text-white hover:bg-yellow-800 focus:ring-yellow-300',
      blue: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
      gray: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const disabledClasses =
      this.isDisabled() || this.isLoading() ? 'opacity-50 cursor-not-allowed' : ''

    return [colorClasses[this.color()], sizeClasses[this.size()], disabledClasses].join(' ')
  })

  // คำนวณ classes สำหรับ spinner
  spinnerClasses = computed(() => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }
    return sizeClasses[this.size()]
  })
}
