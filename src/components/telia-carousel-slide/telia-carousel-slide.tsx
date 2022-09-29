import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'telia-carousel-slide',
  styleUrl: 'telia-carousel-slide.scss',
  shadow: true,
})
export class TeliaCarouselSlide {
  @Prop({ reflect: true }) active: boolean = false;
  @Prop({ reflect: true }) alt: string;
  @Prop({ reflect: true }) src: string;
  @Prop({ reflect: true }) variant: 'cover' | 'contain' = 'contain';

  @Event() carouselSlideLoaded: EventEmitter;

  componentDidLoad() {
    this.carouselSlideLoaded.emit();
  }

  render() {
    return (
      <Host>
        <img
          loading="lazy"
          class={{
            'telia-carousel-slide': true,
            'telia-carousel-slide--active': this.active,
            'telia-carousel-slide--contain': this.variant === 'contain',
            'telia-carousel-slide--cover': this.variant === 'cover',
          }}
          src={this.src}
          alt={this.alt}
        />
      </Host>
    );
  }
}
