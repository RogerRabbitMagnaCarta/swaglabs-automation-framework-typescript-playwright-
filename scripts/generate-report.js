// scripts/generate-report.js
const reporter = require('cucumber-html-reporter');
const path     = require('path');
const fs       = require('fs');

const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

// Copy logo into reports/assets
const logoSrc      = path.join(__dirname, '../assets/swag-logo.png');
const assetsTarget = path.join(reportsDir, 'assets');
if (!fs.existsSync(assetsTarget)) fs.mkdirSync(assetsTarget, { recursive: true });
fs.copyFileSync(logoSrc, path.join(assetsTarget, 'swag-logo.png'));

// Read your custom CSS
const customCssPath = path.join(__dirname, '../assets/report-style.css');
const customCss     = fs.readFileSync(customCssPath, 'utf8');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(reportsDir, 'report.json'),
  output:   path.join(reportsDir, 'report.html'),
  reportSuiteAsScenarios: true,
  launchReport:           false,
  metadata: {
    'Test Environment': 'staging',
    'Browser':          process.env.BROWSER || 'chromium',
    'Platform':         process.platform,
    'Executed':         'Local'
  },
  brandTitle: 'SwagLab Automation Report',
  brandLogo:  'assets/swag-logo.png',
  // Embed the CSS directly
  customStyle: customCss
};

reporter.generate(options);
console.log('✅ HTML report written to', options.output);
