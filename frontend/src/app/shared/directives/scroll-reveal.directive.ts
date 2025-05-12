import { isPlatformBrowser } from '@angular/common'
import {
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core'

type AnimationType = 'fadeUp' | 'fadeLeft' | 'fadeRight'

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)
  private platformId = inject(PLATFORM_ID)
  private readonly transformMap: Record<AnimationType, string> = {
    fadeUp: 'translateY(50px)',
    fadeLeft: 'translateX(-50px)',
    fadeRight: 'translateX(50px)',
  }

  type = input<AnimationType>('fadeUp') // รับประเภทอนิเมชัน
  delay = input(0)
  duration = input(0.6)
  offset = input(50) // จำนวนพิกเซลที่ต้องมองเห็นก่อนเริ่ม animation

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return // ออกทันทีถ้าเป็น server-side
    }

    this.initFadeStyle()
    this.initIntersectionObserver()
  }

  ngOnDestroy(): void {
    this.cleanupObserver()
  }

  private initFadeStyle(): void {
    // ตั้งค่า styles เริ่มต้น
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0')
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      `opacity ${this.duration()}s ease-out, transform ${this.duration()}s ease-out`
    )
    this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.delay()}s`)

    // ตั้งค่า transform ตาม type
    const transform = this.transformMap[this.type()]
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform)
  }

  private initIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.playAnimation()
            this.cleanupObserver()
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: `0px 0px -${this.offset()}px 0px`,
      }
    )

    this.observer.observe(this.el.nativeElement)
  }

  private playAnimation(): void {
    // เล่น animation โดยตั้งค่า opacity และ transform
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1')
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0)')
  }

  private cleanupObserver(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }
}
