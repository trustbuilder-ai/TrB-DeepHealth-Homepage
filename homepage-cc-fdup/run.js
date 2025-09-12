#!/usr/bin/env node

/**
 * Simple development runner for TrB-DeepHealth
 * This script sets up the development environment from the src directory
 */

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Check if we're in the src directory
const currentDir = process.cwd();
const isSrcDir = currentDir.endsWith("/src") || currentDir.endsWith("\\src");

if (!isSrcDir) {
  console.error("❌ Please run this script from the src/ directory");
  process.exit(1);
}

// Check for package.json
if (!fs.existsSync("./package.json")) {
  console.error("❌ package.json not found in src directory");
  process.exit(1);
}

const command = process.argv[2] || "dev";

const scripts = {
  dev: "vite --config ./config/vite.config.ts",
  build:
    "tsc --project ./config/tsconfig.json && vite build --config ./config/vite.config.ts",
  preview: "vite preview --config ./config/vite.config.ts",
  test: "vitest",
  install: "npm install",
  lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
};

if (!scripts[command]) {
  console.error(`❌ Unknown command: ${command}`);
  console.log("Available commands:");
  Object.keys(scripts).forEach((cmd) => {
    console.log(`  - ${cmd}`);
  });
  process.exit(1);
}

console.log(`🚀 Running: ${command}`);
console.log(`📂 Working directory: ${currentDir}`);

const child = exec(scripts[command], { cwd: currentDir });

child.stdout?.on("data", (data) => {
  process.stdout.write(data);
});

child.stderr?.on("data", (data) => {
  process.stderr.write(data);
});

child.on("close", (code) => {
  if (code === 0) {
    console.log(`✅ ${command} completed successfully`);
  } else {
    console.error(`❌ ${command} failed with code ${code}`);
  }
  process.exit(code);
});
