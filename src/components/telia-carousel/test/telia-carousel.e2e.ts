import { newE2EPage } from '@stencil/core/testing';

describe('telia-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<telia-carousel></telia-carousel>');

    const element = await page.find('telia-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
