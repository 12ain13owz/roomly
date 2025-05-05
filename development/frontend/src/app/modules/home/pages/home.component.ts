import { Component } from '@angular/core'

import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive'
import { HomeBenefitComponent } from '../components/home-benefit/home-benefit.component'
import { HomeCarouselComponent } from '../components/home-carousel/home-carousel.component'
import { HomeCollectionComponent } from '../components/home-collection/home-collection.component'
import { HomeDiscoverComponent } from '../components/home-discover/home-discover.component'

@Component({
  selector: 'app-home',
  imports: [
    ScrollRevealDirective,
    HomeCarouselComponent,
    HomeCollectionComponent,
    HomeBenefitComponent,
    HomeDiscoverComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
