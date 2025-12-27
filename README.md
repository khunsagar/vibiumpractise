# Vibium Smoke Test Suite

A comprehensive smoke testing suite built with [Vibium](https://www.npmjs.com/package/vibium) browser automation and Mocha testing framework.

## 🚀 Overview

This project provides automated smoke tests for web applications, focusing on essential functionality verification including:

- Page navigation and loading
- Link validation
- Image verification
- Console error detection
- Accessibility checks (alt text)
- Meta tag validation

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## 🛠 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vibium
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🧪 Running Tests

### Run all smoke tests

```bash
npm test
```

### Run specific test file

```bash
npx mocha smoketest.js
```

### Run with custom timeout

```bash
npx mocha smoketest.js --timeout 15000
```

## 📁 Project Structure

```
vibium/
├── smoketest.js          # Main test suite
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🎯 Test Cases

```
  Vibium Smoke Test
    ✓ should navigate to test site
    ✓ should verify no broken links on page
    ✓ should verify no broken images on page
    ✓ should verify no console errors on page
    ✓ should verify images have alt text attribute
    ✓ should verify meta elements present


```



## 🏗 Tech Stack

- **[Vibium](https://www.npmjs.com/package/vibium)** - Browser automation library
- **[Mocha](https://mochajs.org/)** - JavaScript test framework
- **Node.js** - Runtime environment

## 📝 Key Features

### Before/After Hooks

- **Efficient Setup**: Browser launches once for all tests
- **Automatic Cleanup**: Browser closes after test completion
- **Shared State**: Tests run against same page instance

### Vibium Integration

- Uses `vi.evaluate()` for DOM interaction
- String-based JavaScript execution in browser context
- Cross-process communication between Node.js and browser

### Comprehensive Validation

- **Accessibility**: Alt text validation for images
- **SEO**: Meta tag presence verification
- **Performance**: Console error detection
- **Functionality**: Link and image validation

## 🚨 Common Issues

### Module Type Errors

If you see "Cannot use import statement outside a module":

- Ensure `"type": "module"` is **not** in package.json (Vibium uses CommonJS)

### Timeout Errors

If tests timeout:

- Increase timeout in package.json
- Check network connectivity
- Verify target website is accessible

### DataCloneError

If you see "could not be cloned":

- Use string expressions with `vi.evaluate()`, not functions
- Avoid complex object returns from evaluation

## 🔄 Extending Tests

### Add New Test

```javascript
it("should verify custom functionality", async () => {
  const result = await vi.evaluate(`
    // Your custom JavaScript here
    return document.querySelectorAll('.custom-element').length;
  `);
  console.log(`Found ${result} custom elements`);
});
```

### Add New Page

```javascript
it("should test another page", async () => {
  await vi.go("https://example.com/other-page");
  // Add your validations here
});
```


---

**Happy Testing!** 🎉
