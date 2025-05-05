import { Component } from '@angular/core'

import { CarouselImage } from '../../../../shared/interfaces/carousel.interface'

@Component({
  selector: 'app-home-carousel',
  imports: [],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.scss',
})
export class HomeCarouselComponent {
  images: CarouselImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: '',
      name: 'Image 1',
      desc: 'This is image 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      src: 'https://images.unsplash.com/photo-1595330449916-e7c3e1962bd3?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: '',
      name: 'Image 2',
      desc: 'This is image 2 Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      src: 'https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      alt: '',
      name: 'Image 3',
      desc: 'This is image 3 Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      src: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: '',
      name: 'Image 4',
      desc: 'This is image 4 Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: '',
      name: 'Image 5',
      desc: 'This is image 5 Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      src: 'https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: '',
      name: 'Image 6',
      desc: 'This is image 6 Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ]

  getBackgroundImage(image: CarouselImage) {
    return {
      'background-image': `url(${image.src})`,
    }
  }

  onPrev() {
    const items = document.querySelectorAll('.var-item')
    document.querySelector('.var-slide')?.prepend(items[items.length - 1])
  }

  onNext() {
    const items = document.querySelectorAll('.var-item')
    document.querySelector('.var-slide')?.appendChild(items[0])
  }
}
