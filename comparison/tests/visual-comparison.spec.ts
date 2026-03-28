import { test, expect, Page } from '@playwright/test';

/**
 * Visual comparison tests for PatternFly v6 chart experiments.
 *
 * These tests capture screenshots of the Elm chart implementations and compare
 * them against PatternFly's own chart examples to audit design fidelity.
 *
 * Run: npx playwright test
 * Update baselines: npx playwright test --update-snapshots
 */

// ── Helpers ──────────────────────────────────────────────────────────────────

async function waitForElmApp(page: Page) {
  // Elm apps mount synchronously, but SVG paths render in the same tick
  await page.waitForSelector('svg', { state: 'visible', timeout: 5000 });
  // Give Shape path calculations a moment to settle
  await page.waitForTimeout(200);
}

// ── elm-charts experiment ─────────────────────────────────────────────────────

test.describe('elm-charts experiment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/experiments-elm-charts/index.html');
    await waitForElmApp(page);
  });

  test('area chart renders with PF blue color and grid lines', async ({ page }) => {
    // The area chart should be the default active view
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();

    // Verify PF primary blue (#0066cc) is present in fill or stroke
    const hasBlue = await page.evaluate(() => {
      const paths = document.querySelectorAll('path');
      return Array.from(paths).some(p =>
        p.getAttribute('fill')?.includes('0066cc') ||
        p.getAttribute('stroke')?.includes('0066cc') ||
        p.getAttribute('style')?.includes('0066cc')
      );
    });
    expect(hasBlue).toBe(true);

    await expect(page).toHaveScreenshot('elm-charts-area.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('bar chart renders with multi-ordered PF colors', async ({ page }) => {
    await page.getByText('Bar Chart').click();
    await page.waitForTimeout(100);

    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();

    await expect(page).toHaveScreenshot('elm-charts-bar.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('stacked area chart renders all three series', async ({ page }) => {
    await page.getByText('Stacked Area').click();
    await page.waitForTimeout(100);

    // Should have 3 area paths (one per project)
    const areaCount = await page.evaluate(() =>
      document.querySelectorAll('path[fill*="rgba"]').length +
      document.querySelectorAll('path[fill*="66"]').length
    );
    expect(areaCount).toBeGreaterThanOrEqual(3);

    await expect(page).toHaveScreenshot('elm-charts-stacked-area.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});

// ── elm-visualization experiment ──────────────────────────────────────────────

test.describe('elm-visualization experiment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/experiments-elm-viz/index.html');
    await waitForElmApp(page);
  });

  test('area chart renders with two series (inbound/outbound)', async ({ page }) => {
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();

    // Should have 2 line paths and 2 area fill paths
    const pathCount = await page.evaluate(() =>
      document.querySelectorAll('path').length
    );
    expect(pathCount).toBeGreaterThanOrEqual(4); // 2 fills + 2 lines

    await expect(page).toHaveScreenshot('elm-viz-area.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('bar chart renders with band scale and region labels', async ({ page }) => {
    await page.getByText('Bar Chart').click();
    await page.waitForTimeout(100);

    // Check for tick labels matching region names
    const hasRegionLabel = await page.evaluate(() => {
      const ticks = document.querySelectorAll('.tick text');
      return Array.from(ticks).some(t => t.textContent?.includes('us-east'));
    });
    expect(hasRegionLabel).toBe(true);

    await expect(page).toHaveScreenshot('elm-viz-bar.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('donut chart renders with center text showing total vCPUs', async ({ page }) => {
    await page.getByText('Donut Chart').click();
    await page.waitForTimeout(100);

    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();

    // Verify center text shows the total (1300 vCPUs)
    const centerText = await page.evaluate(() => {
      const texts = document.querySelectorAll('text');
      return Array.from(texts).map(t => t.textContent).join(' ');
    });
    expect(centerText).toContain('1300');

    await expect(page).toHaveScreenshot('elm-viz-donut.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});

// ── PatternFly reference screenshots ─────────────────────────────────────────

test.describe('PatternFly reference charts (www.patternfly.org)', () => {
  test('capture PF area chart reference', async ({ page }) => {
    await page.goto('https://www.patternfly.org/charts/area-chart/');
    // Wait for charts to render (they use React + Victory)
    await page.waitForSelector('svg', { timeout: 10_000 });
    await page.waitForTimeout(1000); // let animations settle

    await expect(page).toHaveScreenshot('pf-reference-area.png', {
      maxDiffPixelRatio: 0.05,
      fullPage: false,
    });
  });

  test('capture PF bar chart reference', async ({ page }) => {
    await page.goto('https://www.patternfly.org/charts/bar-chart/');
    await page.waitForSelector('svg', { timeout: 10_000 });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('pf-reference-bar.png', {
      maxDiffPixelRatio: 0.05,
      fullPage: false,
    });
  });

  test('capture PF donut chart reference', async ({ page }) => {
    await page.goto('https://www.patternfly.org/charts/donut-chart/');
    await page.waitForSelector('svg', { timeout: 10_000 });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('pf-reference-donut.png', {
      maxDiffPixelRatio: 0.05,
      fullPage: false,
    });
  });
});
