import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  HostListener
} from "@angular/core";

@Directive({
  selector: '[smooth-loader]'
})
export class ImageLoaderDirective implements OnInit, OnDestroy {
  @Input('smooth-loader') transition!: string;
  private interval: any;
  private intervalTime: number = 50;
  private image!: HTMLImageElement;

  constructor(private host: ElementRef<HTMLImageElement>) { }

  ngOnInit(): void {
    /** Check if the host element is an HTML Image */
    this.image = this.host.nativeElement;
    this.startLoader();
  }

  ngOnDestroy(): void {
    this.stopLoader();
  }

  @HostListener('load') onImageLoad(): void {
    this.animateImage();
  }

  private startLoader(): void {
    this.transition = this.transition || '.2s cubic-bezier(0.76, 0, 0.24, 1)';
    this.image.style.opacity = '0';
    this.image.style.visibility = 'hidden';
    this.image.style.transition = `opacity ${this.transition}`;
  }

  private stopLoader(): void {
    this.image.style.opacity = '';
    this.image.style.visibility = '';
    clearInterval(this.interval);
  }

  private animateImage(): void {
    this.interval = setInterval(() => {
      if (this.image.naturalWidth > 0 && this.image.naturalHeight > 0) {
        this.stopLoader();
      }
    }, this.intervalTime);
  }
}