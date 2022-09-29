import { Component, h, Event, EventEmitter, Prop, Host } from '@stencil/core';

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
        <article
          class={{
            'telia-carousel-slide': true,
            'telia-carousel-slide--active': this.active,
          }}
        >
          <img
            alt={this.alt}
            src={this.src}
            class={{
              'telia-carousel-slide__image': true,
              'telia-carousel-slide__image--contain': this.variant === 'contain',
              'telia-carousel-slide__image--cover': this.variant === 'cover',
            }}
            loading="lazy"
          />
        </article>
      </Host>
    );
  }
}
