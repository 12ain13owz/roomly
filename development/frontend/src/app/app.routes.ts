import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
    data: { animation: 'Home' },
  },
  {
    path: 'purchase',
    loadChildren: () => import('./modules/purchase/purchase.module').then((m) => m.PurchaseModule),
    data: { animation: 'Purchase' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
