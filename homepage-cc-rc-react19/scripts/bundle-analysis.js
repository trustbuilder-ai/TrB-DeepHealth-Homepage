#!/usr/bin/env node

/**
 * Bundle Analysis Tool for React 19 Optimizations
 *
 * This script analyzes the production build to verify React 19 optimizations:
 * - Bundle size analysis
 * - React 19 feature detection
 * - Performance metrics
 * - Optimization recommendations
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");
const assetsDir = path.join(distDir, "assets");

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function analyzeBundleSize() {
  log("bold", "\n📊 Bundle Size Analysis");
  log("blue", "========================");

  if (!fs.existsSync(assetsDir)) {
    log("red", "❌ No dist/assets directory found. Run npm run build first.");
    return null;
  }

  const files = fs.readdirSync(assetsDir);
  const jsFiles = files.filter((f) => f.endsWith(".js"));
  const cssFiles = files.filter((f) => f.endsWith(".css"));

  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;

  const fileAnalysis = [];

  files.forEach((file) => {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalSize += size;

    if (file.endsWith(".js")) {
      jsSize += size;
    } else if (file.endsWith(".css")) {
      cssSize += size;
    }

    fileAnalysis.push({
      name: file,
      size: size,
      type: file.split(".").pop(),
      formatted: formatBytes(size),
    });
  });

  // Sort by size descending
  fileAnalysis.sort((a, b) => b.size - a.size);

  console.log("\n📋 File Breakdown:");
  fileAnalysis.forEach((file) => {
    const icon = file.type === "js" ? "📦" : file.type === "css" ? "🎨" : "📄";
    console.log(`${icon} ${file.name}: ${file.formatted}`);
  });

  console.log("\n📈 Summary:");
  log("green", `Total Bundle: ${formatBytes(totalSize)}`);
  log("blue", `JavaScript: ${formatBytes(jsSize)} (${jsFiles.length} files)`);
  log("yellow", `CSS: ${formatBytes(cssSize)} (${cssFiles.length} files)`);

  return {
    total: totalSize,
    js: jsSize,
    css: cssSize,
    files: fileAnalysis,
  };
}

function analyzeReact19Features() {
  log("bold", "\n🚀 React 19 Feature Detection");
  log("blue", "==============================");

  const srcDir = path.join(__dirname, "..", "src");

  // Check for React 19 hooks
  const react19Hooks = [
    "useActionState",
    "useOptimistic",
    "use(",
    "useFormStatus",
  ];

  const deprecatedPatterns = [
    "React.forwardRef",
    "React.memo",
    "useMemo",
    "useCallback",
  ];

  let hookUsage = {};
  let deprecatedUsage = {};

  function scanFile(filePath) {
    if (!filePath.endsWith(".tsx") && !filePath.endsWith(".ts")) return;

    try {
      const content = fs.readFileSync(filePath, "utf8");

      react19Hooks.forEach((hook) => {
        const matches = (content.match(new RegExp(hook, "g")) || []).length;
        if (matches > 0) {
          hookUsage[hook] = (hookUsage[hook] || 0) + matches;
        }
      });

      deprecatedPatterns.forEach((pattern) => {
        const matches = (
          content.match(new RegExp(pattern.replace("(", "\\("), "g")) || []
        ).length;
        if (matches > 0) {
          deprecatedUsage[pattern] = (deprecatedUsage[pattern] || 0) + matches;
        }
      });
    } catch (err) {
      // Skip files that can't be read
    }
  }

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else {
        scanFile(fullPath);
      }
    });
  }

  scanDirectory(srcDir);

  console.log("\n✅ React 19 Hooks Usage:");
  if (Object.keys(hookUsage).length === 0) {
    log("yellow", "⚠️  No React 19 specific hooks detected");
    log(
      "blue",
      "💡 Consider using useActionState for forms, useOptimistic for UI updates",
    );
  } else {
    Object.entries(hookUsage).forEach(([hook, count]) => {
      log("green", `✅ ${hook}: ${count} usages`);
    });
  }

  console.log("\n🔍 Legacy Pattern Analysis:");
  if (Object.keys(deprecatedUsage).length === 0) {
    log("green", "🎉 No deprecated patterns found - fully React 19 optimized!");
  } else {
    Object.entries(deprecatedUsage).forEach(([pattern, count]) => {
      if (pattern === "useMemo" || pattern === "useCallback") {
        log(
          "yellow",
          `⚠️  ${pattern}: ${count} usages (consider removal for React 19 compiler)`,
        );
      } else {
        log("red", `❌ ${pattern}: ${count} usages (deprecated in React 19)`);
      }
    });
  }

  return { react19: hookUsage, legacy: deprecatedUsage };
}

function generateRecommendations(bundleData, featureData) {
  log("bold", "\n💡 Optimization Recommendations");
  log("blue", "================================");

  const recommendations = [];

  // Bundle size recommendations
  if (bundleData && bundleData.total > 500 * 1024) {
    // > 500KB
    recommendations.push({
      type: "bundle",
      priority: "high",
      message:
        "Bundle size is large. Consider code splitting with React.lazy()",
    });
  }

  // React 19 feature recommendations
  if (Object.keys(featureData.react19).length === 0) {
    recommendations.push({
      type: "features",
      priority: "medium",
      message: "No React 19 hooks in use. Consider useActionState for forms",
    });
  }

  if (
    featureData.legacy["useMemo"] > 10 ||
    featureData.legacy["useCallback"] > 10
  ) {
    recommendations.push({
      type: "optimization",
      priority: "medium",
      message:
        "Many manual optimizations detected. React 19 compiler can handle these automatically",
    });
  }

  if (recommendations.length === 0) {
    log("green", "🎉 No recommendations - your React 19 setup is optimal!");
  } else {
    recommendations.forEach((rec, i) => {
      const icon =
        rec.priority === "high"
          ? "🔴"
          : rec.priority === "medium"
            ? "🟡"
            : "🟢";
      console.log(`${icon} ${rec.message}`);
    });
  }

  return recommendations;
}

function main() {
  log("bold", "🔬 React 19 Bundle Analysis Tool");
  log("blue", "==================================");

  const bundleData = analyzeBundleSize();
  const featureData = analyzeReact19Features();
  const recommendations = generateRecommendations(bundleData, featureData);

  log("bold", "\n📊 Analysis Complete!");

  // Generate summary report
  const report = {
    timestamp: new Date().toISOString(),
    bundle: bundleData,
    features: featureData,
    recommendations: recommendations,
  };

  const reportPath = path.join(__dirname, "..", "bundle-analysis-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  log("green", `📝 Report saved to: bundle-analysis-report.json`);
}

main();
