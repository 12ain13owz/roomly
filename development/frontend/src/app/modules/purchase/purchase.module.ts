import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { routes } from './purchase.routes'

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PurchaseModule {}
