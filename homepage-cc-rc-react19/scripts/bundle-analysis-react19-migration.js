#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "dist", "assets");
const srcDir = path.join(__dirname, "..", "src");

const formatBytes = (bytes) => {
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
};

const scanFeatures = (dir, patterns) => {
  const results = {};
  const scan = (dirPath) => {
    fs.readdirSync(dirPath).forEach((item) => {
      const fullPath = path.join(dirPath, item);
      if (fs.statSync(fullPath).isDirectory()) return scan(fullPath);
      if (!/\.(ts|tsx)$/.test(item)) return;

      const content = fs.readFileSync(fullPath, "utf8");
      patterns.forEach((pattern) => {
        try {
          const matches = (content.match(new RegExp(pattern, "g")) || [])
            .length;
          if (matches) results[pattern] = (results[pattern] || 0) + matches;
        } catch (e) {
          // Skip invalid regex patterns
        }
      });
    });
  };
  scan(dir);
  return results;
};

const analyzeBundles = () => {
  if (!fs.existsSync(assetsDir))
    return console.log("❌ Run npm run build first");

  let js = 0,
    css = 0;
  fs.readdirSync(assetsDir).forEach((file) => {
    if (file.endsWith(".map")) return;
    const size = fs.statSync(path.join(assetsDir, file)).size;
    if (file.endsWith(".js")) js += size;
    if (file.endsWith(".css")) css += size;
  });

  console.log(`📊 JS: ${formatBytes(js)} | CSS: ${formatBytes(css)}`);
  return { js, css };
};

const formatResults = (obj) =>
  Object.keys(obj).length
    ? Object.entries(obj)
        .map(([k, v]) => `${k}(${v})`)
        .join(", ")
    : "none found ✅";

const analyzeFeatures = () => {
  // Complete React 19 hooks
  const react19 = scanFeatures(srcDir, [
    "useActionState",
    "useOptimistic",
    "use\\(",
    "useFormStatus",
    "useTransition",
  ]);

  // Deprecated patterns (removed in React 19)
  const deprecated = scanFeatures(srcDir, [
    "propTypes",
    "defaultProps",
    "React\\.forwardRef",
    '\\sref="',
    "contextTypes",
  ]);

  // Best practices patterns
  const bestPractices = scanFeatures(srcDir, [
    "ref=\\{",
    "action=\\{",
    '"use server"',
    "ErrorBoundary",
    "preload\\(",
    "preinit\\(",
  ]);

  // Manual optimization patterns (React 19 compiler handles these)
  const manualOptimizations = scanFeatures(srcDir, [
    "useMemo",
    "useCallback",
    "React\\.memo",
  ]);

  console.log(`✅ React 19: ${formatResults(react19)}`);
  console.log(`⚠️  Deprecated: ${formatResults(deprecated)}`);
  console.log(`🎯 Best Practices: ${formatResults(bestPractices)}`);
  console.log(`🔄 Manual Opts: ${formatResults(manualOptimizations)}`);

  return { react19, deprecated, bestPractices, manualOptimizations };
};

const generateRecommendations = ({ js, css }, features) => {
  const recommendations = [];

  // Bundle size recommendations
  if (js > 500 * 1024)
    recommendations.push({
      type: "bundle",
      priority: "high",
      message: "JS bundle large, consider code splitting",
    });
  else if (js > 300 * 1024)
    recommendations.push({
      type: "bundle",
      priority: "medium",
      message: "JS bundle could benefit from splitting",
    });

  if (css > 100 * 1024)
    recommendations.push({
      type: "styles",
      priority: "medium",
      message: "CSS bundle large, consider splitting",
    });

  // React 19 specific recommendations
  if (!Object.keys(features.react19).length) {
    recommendations.push({
      type: "react19",
      priority: "medium",
      message: "No React 19 hooks in use - consider useActionState for forms",
    });
  }

  // Deprecated pattern warnings
  if (Object.keys(features.deprecated).length) {
    recommendations.push({
      type: "deprecated",
      priority: "high",
      message: `Deprecated patterns found: ${Object.keys(features.deprecated).join(", ")}`,
    });
  }

  // Manual optimization recommendations
  const manualCount = Object.values(features.manualOptimizations).reduce(
    (a, b) => a + b,
    0,
  );
  if (manualCount > 20) {
    recommendations.push({
      type: "optimization",
      priority: "medium",
      message: `${manualCount} manual optimizations - React 19 compiler handles these`,
    });
  } else if (manualCount > 10) {
    recommendations.push({
      type: "optimization",
      priority: "low",
      message: `${manualCount} manual optimizations - consider removing some`,
    });
  }

  // Best practices feedback
  const practiceCount = Object.values(features.bestPractices).reduce(
    (a, b) => a + b,
    0,
  );
  if (practiceCount > 5) {
    recommendations.push({
      type: "success",
      priority: "low",
      message: `Great! Using ${practiceCount} React 19 best practices`,
    });
  }

  // Error boundary check
  if (!features.bestPractices.ErrorBoundary) {
    recommendations.push({
      type: "react19",
      priority: "high",
      message:
        "Add ErrorBoundary - required in React 19 (errors not re-thrown)",
    });
  }

  // Default success message
  if (!recommendations.length) {
    recommendations.push({
      type: "success",
      priority: "low",
      message: "Excellent React 19 implementation ✅",
    });
  }

  recommendations.forEach((rec) => {
    const icon =
      rec.priority === "high" ? "🔴" : rec.priority === "medium" ? "🟡" : "🟢";
    console.log(`${icon} ${rec.message}`);
  });

  return recommendations;
};

const main = () => {
  console.log("🔬 React 19 Bundle Analysis\n");
  const bundles = analyzeBundles();
  const features = analyzeFeatures();
  const recommendations = generateRecommendations(bundles, features);

  const report = {
    timestamp: new Date().toISOString(),
    bundle: bundles,
    features,
    recommendations,
  };

  fs.writeFileSync(
    path.join(__dirname, "..", "bundle-analysis-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log("\n📝 Report saved to bundle-analysis-report.json");
};

main();
