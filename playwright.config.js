 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/playwright.config.ts b/playwright.config.ts
new file mode 100644
index 0000000000000000000000000000000000000000..55369a148d5de541f72d3ed2814017dde2b6fee5
--- /dev/null
+++ b/playwright.config.ts
@@ -0,0 +1,17 @@
+import { defineConfig } from '@playwright/test';
+
+export default defineConfig({
+  testDir: '.',
+  testMatch: ['login.spec.ts'],
+  timeout: 30_000,
+  expect: { timeout: 15_000 },
+  use: {
+    headless: true,
+    viewport: { width: 1536, height: 864 },
+    ignoreHTTPSErrors: true,
+    trace: 'on-first-retry',
+    screenshot: 'only-on-failure',
+    video: 'retain-on-failure',
+  },
+  reporter: [['list']],
+});
 
EOF
)
