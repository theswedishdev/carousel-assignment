import { Component, Host, h, State, Watch, Listen, Element, Prop } from '@stencil/core';
import { chevronLeft, chevronRight } from '@teliads/icons';

@Component({
  tag: 'telia-carousel',
  styleUrl: 'telia-carousel.scss',
  shadow: true,
})
export class TeliaCarousel {
  @Element() hostElement: HTMLTeliaCarouselElement;

  @Prop({ reflect: true }) autoplayTimer: number = 0;

  @State() activeSlideIndex = 0;
  @State() numberOfSlides = 0;

  observer: MutationObserver;

  constructor() {
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
  }

  connectedCallback() {
    this.observer = new MutationObserver(this.updateNumberOfSlides.bind(this));

    if (this.autoplayTimer > 0) {
      setInterval(this.onNextClick, this.autoplayTimer * 1000);
    }
  }

  componentDidLoad() {
    this.observer.observe(this.hostElement, { childList: true });

    this.hostElement.children?.[0]?.setAttribute('active', 'true');
  }

  private updateNumberOfSlides() {
    this.numberOfSlides = this.hostElement.childElementCount;
  }

  @Listen('carouselSlideLoaded')
  onCarouselSlideLoaded() {
    this.updateNumberOfSlides();
  }

  @Watch('numberOfSlides')
  onNumberOfSlidesChange() {
    if (this.activeSlideIndex >= this.numberOfSlides) {
      this.activeSlideIndex = Math.max(this.numberOfSlides - 1, 0);
    }
  }

  @Watch('activeSlideIndex')
  onActiveSlideIndexChange(activeSlideIndex: number, prevActiveSlideIndex: number) {
    if (typeof prevActiveSlideIndex !== 'undefined') {
      this.hostElement.children?.[prevActiveSlideIndex]?.removeAttribute('active');
    }

    this.hostElement.children?.[activeSlideIndex]?.setAttribute('active', 'true');
  }

  private onNextClick() {
    const activeSlide = this.activeSlideIndex + 1;

    if (activeSlide >= this.numberOfSlides) {
      this.activeSlideIndex = 0;
    } else {
      this.activeSlideIndex = activeSlide;
    }
  }

  private onPrevClick() {
    const activeSlide = this.activeSlideIndex - 1;

    if (activeSlide < 0) {
      this.activeSlideIndex = this.numberOfSlides - 1;
    } else {
      this.activeSlideIndex = activeSlide;
    }
  }

  render() {
    return (
      <Host>
        <div class="telia-carousel">
          <div class="telia-carousel__navigation">
            <button
              type="button"
              class="telia-carousel__navigation-button"
              onClick={this.onPrevClick}
              title="Go to previous slide"
            >
              <telia-icon svg={chevronLeft.svg} size="lg"></telia-icon>
            </button>
            <button
              type="button"
              class="telia-carousel__navigation-button"
              onClick={this.onNextClick}
              title="Go to next slide"
            >
              <telia-icon svg={chevronRight.svg} size="lg"></telia-icon>
            </button>
          </div>

          <div class="telia-carousel__controls">
            <telia-p
              class="telia-carousel__page-indicator"
              variant="preamble-200"
              title={`Page ${this.activeSlideIndex + 1} out of ${this.numberOfSlides}`}
            >
              {this.activeSlideIndex + 1}/{this.numberOfSlides}
            </telia-p>
          </div>

          <div class="telia-carousel__slides">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
