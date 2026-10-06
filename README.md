# SNK Support – Setup

## 1. GitHub Pages e upload
Ei folder-er shob file repo-r root-e upload korun → Settings → Pages → Branch: main / root.

## 2. Admin
`/admin/login.html` — Demo login: `admin@snksupport.com` / `Admin@1234` (DEMO-LOGIN.txt).
Dashboard theke: Logo & Name, Team, Chatbot FAQ, Inbox (visitor chat-e reply).
**Demo mode-e change shudhu oi browser-e thake.** Shobar jonno live korte Firebase lagbe.

## 3. Firebase (live mode)
1. console.firebase.google.com → project → Web app add → config copy kore `firebase/config.js`-e boshan.
2. Authentication → Email/Password on → admin user banan (email `admin@snksupport.com`, nijer strong password).
3. Firestore Database create → Rules-e `firebase/firestore.rules` paste → Publish.
4. Authentication → Settings → Authorized domains-e `yourdocuments.github.io` add korun.
Live mode-e demo password kaj kore na; Firebase-e banano password-i lagbe.

## 4. APK
Site GitHub Pages-e live hole https://www.pwabuilder.com → site URL din → Android → APK/AAB download.
Note: APK-er app name/icon build-er somoy fixed; admin theke shudhu site-er vitorer logo/nam change hoy.
