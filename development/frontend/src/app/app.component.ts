import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

import { routeAnimations } from './shared/animations/scale.animaiton'
import { FooterComponent } from './shared/components/layouts/footer/footer.component'
import { HeaderComponent } from './shared/components/layouts/header/header.component'

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations],
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareRoute(outlet: any) {
    return outlet.activatedRouteData?.['animation']
  }
}
