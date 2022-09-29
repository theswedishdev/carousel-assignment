import { newSpecPage } from '@stencil/core/testing';
import { TeliaCarousel } from '../telia-carousel';

describe('telia-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TeliaCarousel],
      html: `<telia-carousel></telia-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <telia-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </telia-carousel>
    `);
  });
});
