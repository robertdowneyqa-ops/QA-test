 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/login.spec.ts b/login.spec.ts
new file mode 100644
index 0000000000000000000000000000000000000000..04dc7b8263efcd56141a621b60aa71838398bd01
--- /dev/null
+++ b/login.spec.ts
@@ -0,0 +1,43 @@
+import { test, expect } from '@playwright/test';
+
+/**
+ * Usage:
+ *   BASE_URL="https://pozitivehub.com" \
+ *   LOGIN_EMAIL="your-email@example.com" \
+ *   LOGIN_PASSWORD="your-password" \
+ *   npx playwright test login.spec.ts
+ */
+
+test('user can log in from the PozitiveHub login page', async ({ page }) => {
+  const baseUrl = process.env.BASE_URL ?? 'https://pozitivehub.com';
+  const email = process.env.LOGIN_EMAIL;
+  const password = process.env.LOGIN_PASSWORD;
+
+  test.skip(!email || !password, 'Set LOGIN_EMAIL and LOGIN_PASSWORD environment variables.');
+
+  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
+
+  // Prefer semantic selectors first; fallback to indexed input locators if needed.
+  const emailInput = page
+    .getByRole('textbox', { name: /email|username/i })
+    .or(page.getByPlaceholder(/email|username/i))
+    .or(page.locator('input[type="email"]'))
+    .or(page.locator('input').nth(0));
+
+  const passwordInput = page
+    .getByLabel(/password/i)
+    .or(page.getByPlaceholder(/password/i))
+    .or(page.locator('input[type="password"]'))
+    .or(page.locator('input').nth(1));
+
+  const loginButton = page
+    .getByRole('button', { name: /^login$/i })
+    .or(page.locator('button:has-text("Login")'));
+
+  await emailInput.fill(email!);
+  await passwordInput.fill(password!);
+  await loginButton.click();
+
+  // Post-login assertion: adjust for your app if it redirects differently.
+  await expect(page).not.toHaveURL(/login/i, { timeout: 15000 });
+});
 
EOF
)
