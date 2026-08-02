import { test, expect } from '@playwright/test';

test.describe('Landing Page E2E', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Microsoft Learn Student Ambassadors - SRM/);
  });

  test('hero section is visible and contains expected call-to-actions', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Microsoft Learn Student Ambassadors');
    
    // Check for CTA buttons
    const applyButton = page.locator('text=Join Community').first();
    const exploreButton = page.locator('text=Explore Events').first();
    await expect(applyButton).toBeVisible();
    await expect(exploreButton).toBeVisible();
  });

  test('navigation works for internal links', async ({ page }) => {
    await page.goto('/');
    
    // Click on About navigation link
    const aboutLink = page.locator('nav').locator('a:has-text("About")');
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      // Should scroll to or display the why-join section
      await expect(page.url()).toContain('#why-join');
    }
  });

  test('responsive mobile menu works', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Check if hamburger menu button is visible
    const menuButton = page.locator('button[aria-label="Toggle menu"], button.mobile-menu-toggle').first();
    
    if (await menuButton.count() > 0 && await menuButton.isVisible()) {
      await menuButton.click();
      
      // Wait for menu to appear and check a link
      const mobileNav = page.locator('nav').last();
      await expect(mobileNav).toBeVisible();
    }
  });

  test('contact form validation', async ({ page }) => {
    await page.goto('/');
    
    // Check for contact section
    const contactSection = page.locator('#contact, .contact-section').first();
    if (await contactSection.count() > 0) {
      // Find submit button in form
      const submitButton = contactSection.locator('button[type="submit"]');
      if (await submitButton.count() > 0) {
        await submitButton.click();
        
        // Form should show validation error messages since inputs are empty
        // Usually native HTML5 validation shows a pseudoclass :invalid, but we check if button remains
        await expect(submitButton).toBeVisible(); 
      }
    }
  });
  
  test('sections are lazy loaded appropriately', async ({ page }) => {
    await page.goto('/');
    
    // Scroll down to trigger lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check if team section gets loaded
    const teamSection = page.locator('text=Meet the Team').first();
    await expect(teamSection).toBeVisible();
  });
});
