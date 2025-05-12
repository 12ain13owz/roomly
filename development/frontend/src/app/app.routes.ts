import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'purchase',
    loadChildren: () => import('./modules/purchase/purchase.module').then((m) => m.PurchaseModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
