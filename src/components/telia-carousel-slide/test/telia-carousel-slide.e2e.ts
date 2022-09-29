import { newE2EPage } from '@stencil/core/testing';

describe('telia-carousel-slide', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<telia-carousel-slide></telia-carousel-slide>');

    const element = await page.find('telia-carousel-slide');
    expect(element).toHaveClass('hydrated');
  });
});
