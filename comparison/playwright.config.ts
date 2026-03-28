import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    // Screenshot baseline comparison
    screenshot: 'on',
    // Viewport matches PatternFly's recommended chart container width
    viewport: { width: 1280, height: 900 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Local dev server — run `npx serve . -p 8080` before tests
  webServer: {
    command: 'npx serve . -p 8080 --no-clipboard',
    port: 8080,
    reuseExistingServer: true,
    timeout: 10_000,
  },
});
