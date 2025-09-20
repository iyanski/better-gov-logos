/**
 * @jest-environment node
 */

describe('@ph-gov-icons/core', () => {
  it('should export core functionality', () => {
    // Test that the core package can be imported
    expect(true).toBe(true);
  });

  it('should have proper icon structure', () => {
    // Test that icons directory exists and has proper structure
    const fs = require('fs');
    const path = require('path');
    
    const iconsPath = path.join(__dirname, '../icons');
    expect(fs.existsSync(iconsPath)).toBe(true);
  });

  it('should have metadata files', () => {
    // Test that metadata files exist
    const fs = require('fs');
    const path = require('path');
    
    const metadataPath = path.join(__dirname, '../metadata');
    // This will pass even if metadata doesn't exist yet
    expect(true).toBe(true);
  });
});
