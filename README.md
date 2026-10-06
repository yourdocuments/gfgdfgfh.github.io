# SNK Support – Setup

## 1. GitHub Pages e upload
Ei folder-er shob file repo-r root-e upload korun → Settings → Pages → Branch: main / root.

## 2. Admin
`/admin/login.html` — Demo login: `thesnkgraphic@email.com` / `Admin@1234` (DEMO-LOGIN.txt).
Dashboard theke: Logo & Name, Team, Chatbot FAQ, Inbox (visitor chat-e reply).
**Demo mode-e change shudhu oi browser-e thake.** Shobar jonno live korte Firebase lagbe.

## 3. Firebase (live mode)
1. console.firebase.google.com → project → Web app add → config copy kore `firebase/config.js`-e boshan.
2. Authentication → Email/Password on → admin user banan (email `thesnkgraphic@email.com`, nijer strong password).
3. Firestore Database create → Rules-e `firebase/firestore.rules` paste → Publish.
4. Authentication → Settings → Authorized domains-e `yourdocuments.github.io` add korun.
Live mode-e demo password kaj kore na; Firebase-e banano password-i lagbe.

## 4. APK
Site GitHub Pages-e live hole https://www.pwabuilder.com → site URL din → Android → APK/AAB download.
Note: APK-er app name/icon build-er somoy fixed; admin theke shudhu site-er vitorer logo/nam change hoy.

## Roles (notun)
- **Super admin** (`thesnkgraphic@email.com`): shob dekhe — logo/nam/APK link, team, status, FAQ, shob chat (ke kokhon reply korlo).
- **Team member**: Team page-e super admin email+password dile oi member login korte pare. Shudhu nijer chat dekhe, reply dey, ar "My status" (Available / Marketing / Travelling / In class / Offline) change kore. Available chhara onno status-e site-e Call button disabled thake.
- **APK button**: Settings → "APK download link"-e link dile site-er upore "Download APK" button ashe. APK file repo-te (jemon `snk-support.apk`) rakhle link-e shudhu file-er nam din.
- Live mode: Firestore rules abar publish korun (`firebase/firestore.rules` update hoyeche). Member-er password bhule gele login page-e "Forgot password?".
