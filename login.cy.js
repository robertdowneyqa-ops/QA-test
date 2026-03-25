 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/package.json b/package.json
new file mode 100644
index 0000000000000000000000000000000000000000..74bb9d1280f7fe188a1f0e12d5b0b30807c35bc5
--- /dev/null
+++ b/package.json
@@ -0,0 +1,11 @@
+{
+  "name": "qa-test",
+  "private": true,
+  "version": "1.0.0",
+  "scripts": {
+    "test:login": "playwright test login.spec.ts"
+  },
+  "devDependencies": {
+    "@playwright/test": "^1.53.0"
+  }
+}
 
EOF
)
