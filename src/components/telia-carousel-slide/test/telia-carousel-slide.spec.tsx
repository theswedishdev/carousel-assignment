import { newSpecPage } from '@stencil/core/testing';
import { TeliaCarouselSlide } from '../telia-carousel-slide';

describe('telia-carousel-slide', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TeliaCarouselSlide],
      html: `<telia-carousel-slide></telia-carousel-slide>`,
    });
    expect(page.root).toEqualHtml(`
      <telia-carousel-slide>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </telia-carousel-slide>
    `);
  });
});
