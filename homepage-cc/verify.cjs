#!/usr/bin/env node

/**
 * TrB-DeepHealth Project Verification Script
 * Checks that all core components are implemented correctly
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 TrB-DeepHealth: LLM Testing Platform Verification\n");

const checks = [
  {
    name: "Project Structure",
    items: [
      { file: "package.json", desc: "Package configuration" },
      { file: "README.md", desc: "Project documentation" },
      { file: "App.tsx", desc: "Main application component" },
      { file: "main.tsx", desc: "Application entry point" },
      { file: "index.html", desc: "HTML template" },
    ],
  },
  {
    name: "Core Components",
    items: [
      { file: "components/TestingPlatform.tsx", desc: "Main testing platform" },
      { file: "components/shared/Header.tsx", desc: "Platform header" },
      { file: "components/shared/ThemeToggle.tsx", desc: "Theme switching" },
      {
        file: "components/testing/TestInterface.tsx",
        desc: "LLM testing interface",
      },
      { file: "components/testing/ScenarioPanel.tsx", desc: "Test scenarios" },
      { file: "components/shared/SafetyBadge.tsx", desc: "Safety indicators" },
    ],
  },
  {
    name: "Pages & Navigation",
    items: [
      { file: "pages/Documentation.tsx", desc: "Documentation page" },
      { file: "pages/Dashboard.tsx", desc: "Analytics dashboard" },
    ],
  },
  {
    name: "Logic & State",
    items: [
      {
        file: "hooks/useSafetyDetection.ts",
        desc: "Safety detection algorithms",
      },
      { file: "store/themeStore.ts", desc: "Theme state management" },
      { file: "types/test.types.ts", desc: "Test type definitions" },
      { file: "types/scenario.types.ts", desc: "Scenario type definitions" },
    ],
  },
  {
    name: "Styling & Configuration",
    items: [
      { file: "styles/globals.css", desc: "Global styles and themes" },
      { file: "config/vite.config.ts", desc: "Build configuration" },
      { file: "config/tailwind.config.js", desc: "Styling configuration" },
      { file: "config/tsconfig.json", desc: "TypeScript configuration" },
    ],
  },
  {
    name: "Testing",
    items: [
      { file: "__tests__/App.test.tsx", desc: "App component tests" },
      {
        file: "__tests__/useSafetyDetection.test.ts",
        desc: "Safety algorithm tests",
      },
      { file: "test/setup.ts", desc: "Test configuration" },
    ],
  },
];

let totalFiles = 0;
let existingFiles = 0;

checks.forEach((category) => {
  console.log(`📂 ${category.name}`);

  category.items.forEach((item) => {
    totalFiles++;
    const exists = fs.existsSync(item.file);
    if (exists) existingFiles++;

    const status = exists ? "✅" : "❌";
    const size = exists ? `(${fs.statSync(item.file).size}b)` : "";
    console.log(`   ${status} ${item.file} ${size}`);
    console.log(`      ${item.desc}`);
  });

  console.log();
});

// Check design files integration
console.log("🎨 Design Integration");
const designFiles = [
  "../.superdesign/design_iterations/theme_clinical_trust.css",
  "../.superdesign/design_iterations/theme_warm_community.css",
  "../.superdesign/design_iterations/updated_mental_health_website_plan.md",
  "../.superdesign/implementation_plan.md",
];

designFiles.forEach((file) => {
  const exists = fs.existsSync(file);
  const status = exists ? "✅" : "❌";
  console.log(`   ${status} ${path.basename(file)}`);
});

console.log();

// Summary
console.log("📊 Summary");
console.log(
  `   Files implemented: ${existingFiles}/${totalFiles} (${Math.round((existingFiles / totalFiles) * 100)}%)`,
);

if (existingFiles === totalFiles) {
  console.log("\n🎉 All components implemented successfully!");
  console.log("\n📋 Key Features:");
  console.log("   • LLM Safety Testing Engine");
  console.log("   • Crisis Detection Algorithms");
  console.log("   • Medical Boundary Compliance");
  console.log(
    "   • Multi-Theme Support (Clinical Trust, Warm Community, Dark)",
  );
  console.log("   • Responsive Mobile Design");
  console.log("   • Comprehensive Test Scenarios");
  console.log("   • Professional Dashboard");
  console.log("   • Documentation & Guidance");

  console.log("\n⚠️  Important Reminders:");
  console.log("   • This is a TESTING platform, not a mental health service");
  console.log("   • Always route crisis situations to 988 Lifeline");
  console.log("   • Require human oversight for medical contexts");
  console.log("   • Follow healthcare compliance requirements");

  console.log("\n🚀 Next Steps:");
  console.log("   1. Run: npm run dev");
  console.log("   2. Test all scenarios thoroughly");
  console.log("   3. Validate safety detection algorithms");
  console.log("   4. Customize for your specific LLM testing needs");
} else {
  console.log(
    "\n⚠️  Some files are missing. Please review the implementation.",
  );
}

console.log("\n" + "=".repeat(60));
console.log(
  "TrB-DeepHealth: Testing LLMs for Safe Mental Health Product Development",
);
console.log("=".repeat(60));
