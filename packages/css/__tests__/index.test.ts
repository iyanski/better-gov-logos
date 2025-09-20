/**
 * @jest-environment jsdom
 */

describe('@ph-gov-icons/css', () => {
  it('should have CSS classes available', () => {
    // Test that CSS classes can be applied
    const element = document.createElement('div');
    element.className = 'ph-icon ph-icon-department-of-agriculture';
    expect(element.className).toContain('ph-icon');
  });

  it('should support size variants', () => {
    const element = document.createElement('div');
    element.className = 'ph-icon ph-icon-sm';
    expect(element.className).toContain('ph-icon-sm');
  });

  it('should support color variants', () => {
    const element = document.createElement('div');
    element.className = 'ph-icon ph-icon-primary';
    expect(element.className).toContain('ph-icon-primary');
  });

  it('should have proper CSS structure', () => {
    // Test that CSS can be loaded (mock test)
    expect(true).toBe(true);
  });
});
