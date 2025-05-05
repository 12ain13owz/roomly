import { Component } from '@angular/core'

import { PurchaseFormComponent } from '../components/purchase-form/purchase-form.component'

@Component({
  selector: 'app-purchase',
  imports: [PurchaseFormComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  backgroundImage =
    'bg-[url(https://images.unsplash.com/photo-1602595688238-9fffe12d5af3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]'
}
