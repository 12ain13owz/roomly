import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

import { FooterComponent } from './shared/components/layouts/footer/footer.component'
import { HeaderComponent } from './shared/components/layouts/header/header.component'

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
