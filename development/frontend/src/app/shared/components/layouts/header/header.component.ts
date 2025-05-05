import { Component, signal } from '@angular/core'
import { RouterModule } from '@angular/router'

import { Navbar } from '../../../interfaces/navbar.interface'

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = signal('Roomly')
  bassClass = signal(
    'relative text-white font-medium drop-shadow-md hover:text-yellow-900 transition-colors duration-300 ease-in-out'
  )
  navbars = signal<Navbar[]>([
    { href: '/', class: this.bassClass(), text: 'หน้าแรก' },
    { href: '/purchase', class: this.bassClass(), text: 'ขาย' },
  ])
}
