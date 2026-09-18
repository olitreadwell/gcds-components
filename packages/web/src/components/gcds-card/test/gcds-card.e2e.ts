import { AxeBuilder } from '@axe-core/playwright';

import { expect } from '@playwright/test';
import { test } from '../../../../tests/base';

test.describe('gcds-card', () => {
  test('renders', async ({ page }) => {
    const element = page.locator('gcds-card').first();

    // Wait for element to attach and become visible, allowing up to 10s
    await element.waitFor({ state: 'attached' });
    await element.waitFor({ state: 'visible' });
    await element.waitFor({ timeout: 10000 });

    // Check if it has the 'hydrated' class
    await expect(element).toHaveClass('hydrated');
  });

  test('fires gcdsClick and click event', async ({ page }) => {
    await page.goto('/components/gcds-card/test/gcds-card.e2e.html');

    const gcdsClick = await page.spyOnEvent('gcdsClick');
    const click = await page.spyOnEvent('click');

    await page.locator('a').first().click();

    expect(gcdsClick.events).toHaveLength(1);
    expect(click.events).toHaveLength(1);
  });

  test('clicking the card description text registers the card click', async ({
    page,
  }) => {
    await page.goto('/components/gcds-card/test/gcds-card.e2e.html');

    const gcdsClick = await page.spyOnEvent('gcdsClick');
    const click = await page.spyOnEvent('click');

    const propDescription = page
      .locator('gcds-card')
      .first()
      .locator('.gcds-card__description');
    const propBox = await propDescription.boundingBox();

    await page.mouse.click(
      propBox.x + propBox.width / 2,
      propBox.y + propBox.height / 2,
    );

    expect(gcdsClick.events).toHaveLength(1);
    expect(click.events).toHaveLength(1);
    await expect(page).toHaveURL(/#red$/);

    // Slotted rich-text description (rendered through a slot) must behave the
    // same, so a click on its text also navigates.
    await page.goto('/components/gcds-card/test/gcds-card.e2e.html');

    const slottedDescription = page
      .locator('gcds-card')
      .nth(1)
      .locator('.gcds-card__description');
    const slottedBox = await slottedDescription.boundingBox();

    await page.mouse.click(slottedBox.x + 10, slottedBox.y + 10);

    await expect(page).toHaveURL(/#abbr$/);
  });

  test('abbr inside the card description still receives hover', async ({
    page,
  }) => {
    await page.goto('/components/gcds-card/test/gcds-card.e2e.html');

    const abbr = page.locator('gcds-card abbr').first();
    const box = await abbr.boundingBox();

    const abbrIsTopmost = await page.evaluate(
      ([x, y]) => document.elementFromPoint(x, y)?.closest('abbr') !== null,
      [box.x + box.width / 2, box.y + box.height / 2],
    );

    expect(abbrIsTopmost).toBe(true);
  });
});

/*
 * Accessibility tests
 * Axe-core rules: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-21-level-a--aa-rules
 */

test.describe('gcds-card a11y tests', () => {
  test('Colour contrast', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();
    expect(results.violations).toHaveLength(0);
  });

  test('Link name', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withRules(['link-name'])
      .analyze();
    expect(results.violations).toHaveLength(0);
  });

  test('Keyboard focus', async ({ page }) => {
    const linkText = await page
      .locator('gcds-card')
      .first()
      .locator('.gcds-card__title')
      .textContent();

    await page.keyboard.press('Tab');

    expect(
      await page.evaluate(
        () =>
          window.document.activeElement?.shadowRoot?.activeElement
            ?.textContent || '',
      ),
    ).toEqual(linkText);
  });

  test('Alt text - no alt text', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withRules(['image-alt'])
      .analyze();
    expect(results.violations).toHaveLength(0);
  });

  test('Alt text w/ img-alt prop', async ({ page }) => {
    await page
      .locator('gcds-card')
      .first()
      .evaluate(el => ((el as HTMLGcdsCardElement).imgAlt = ''));

    await page.waitForChanges();

    const results = await new AxeBuilder({ page })
      .withRules(['image-alt'])
      .analyze();
    expect(results.violations).toHaveLength(0);
  });
});
