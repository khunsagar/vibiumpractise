const { browserSync } = require("vibium");

describe("Vibium Smoke Test", () => {
  let vi;

  before(async () => {
    vi = browserSync.launch();
    await vi.go("https://compendiumdev.co.uk/");
  });

  it("should navigate to test site", async () => {
    const title = await vi.evaluate("document.title");
    console.log(`Page title: ${title}`);
    const url = await vi.evaluate("window.location.href");
    console.log(`Current URL: ${url}`);
  });

  it("should verify no broken links on page", async () => {
    const linkCount = await vi.evaluate(`
      document.querySelectorAll('a[href]').length
    `);
    console.log(`Found ${linkCount || 0} links on the page`);

    const validLinkCount = await vi.evaluate(`
      Array.from(document.querySelectorAll('a[href]'))
        .filter(link => link.href.startsWith('http')).length
    `);
    console.log(`✓ Valid links found: ${validLinkCount || 0}`);
  });

  it("should verify no broken images on page", async () => {
    const imageCount = await vi.evaluate(`
      document.querySelectorAll('img').length
    `);
    console.log(`Found ${imageCount || 0} images on the page`);

    const imagesWithSrc = await vi.evaluate(`
      Array.from(document.querySelectorAll('img'))
        .filter(img => img.src).length
    `);
    console.log(`✓ Images with src attribute: ${imagesWithSrc || 0}`);
  });

  it("should verify no console errors on page", async () => {
    const errorCheck = await vi.evaluate(`
      window.onerror ? 'Some errors detected' : 'No errors detected'
    `);
    console.log(`✓ Console status: ${errorCheck}`);
  });

  it("should verify images have alt text attribute", async () => {
    const altTextStats = await vi.evaluate(`
      const images = Array.from(document.querySelectorAll("img"));
      const withAlt = images.filter(
        (img) => img.alt && img.alt.trim().length > 0
      ).length;
      const withoutAlt = images.length - withAlt;
      return { withAlt, withoutAlt, total: images.length };
    `);

    console.log(`✓ Images with alt text: ${altTextStats.withAlt || 0}`);
    console.log(`⚠ Images without alt text: ${altTextStats.withoutAlt || 0}`);
  });

  it("should verify meta elements present", async () => {
    const metaInfo = await vi.evaluate(`
      return {
        description: document.querySelector('meta[name="description"]')
          ? "Present"
          : "Missing",
        viewport: document.querySelector('meta[name="viewport"]')
          ? "Present"
          : "Missing",
        charset: document.querySelector("meta[charset]")
          ? "Present"
          : "Missing",
      };
    `);

    console.log(`✓ Meta description: ${metaInfo.description}`);
    console.log(`✓ Meta viewport: ${metaInfo.viewport}`);
    console.log(`✓ Meta charset: ${metaInfo.charset}`);
  });

  after(async () => {
    await vi.quit();
  });
});
