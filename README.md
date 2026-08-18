# Personnel Dossier — Milsim Accolades Site

A dark "command dossier" site for tracking USAR (Zanance's United States Army)
and MBA (ReaperMah's British Army) ribbons, medals, badges, and rank history.
React + Vite + Tailwind, Firebase Realtime Database backend, Roblox OAuth
login, owner-only split-pane Editor.

## 1. Install & run locally

```bash
npm install
npm run dev
```

The site will run against placeholder config and show seed/example entries
until you complete steps 2–3 below.

## 2. Firebase setup

1. Create a project at https://console.firebase.google.com (or reuse your
   existing intel-hub project — this app writes to its own top-level keys
   `usar/`, `mba/`, `admins/`, so it won't collide).
2. Enable **Realtime Database**.
3. Enable **Authentication → Sign-in method → Google** (used only to secure
   writes — see the security note below).
4. Project settings → General → "Your apps" → add a Web app → copy the
   config object into `src/lib/firebase.js`, replacing the `REPLACE_ME`
   values.
5. Deploy the included database rules:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only database --project YOUR_PROJECT_ID
   ```
   (or paste `database.rules.json` into Database → Rules in the console).
6. Sign in once via the site's Editor page with the Google account you want
   as owner, note the UID Firebase shows for that error state, and in the
   Database console add:
   ```
   admins/<that-uid> = true
   ```

### ⚠️ Important security note (read this)

Roblox OAuth tells the site **who you are**, but it does not sign you into
*Firebase* — Realtime Database rules can't see a Roblox session, only a
Firebase Auth session. So this app uses two separate logins:

- **Roblox login** (top-right button) — identity/display only, drives the
  Home page profile card and the "logged in as ___" badge.
- **Google sign-in inside the Editor page** — the one that actually
  satisfies `database.rules.json` and unlocks writes.

If you skip the Google sign-in step, the Editor UI stays visible (if you're
Roblox-admin-flagged) but every save will be rejected by the database rules,
which is the correct, secure behavior. Don't weaken the rules to check a
Roblox ID instead — that ID is just JSON in the database, and anyone could
call the Firebase REST API directly and claim to be you.

If you'd rather have a single Roblox-only login with no second sign-in, the
correct way to do that securely is a small serverless function (Firebase
Cloud Function) that verifies the Roblox access token server-side and mints
a Firebase custom token — that requires the Firebase Admin SDK and a service
account, which can't live in this static, client-only site. Flag it if you
want that added; it's a bigger change than fits in this build.

## 3. Roblox OAuth setup

1. https://create.roblox.com/dashboard/credentials → OAuth 2.0 Apps →
   Create App.
2. Redirect URI must exactly match where the site is hosted, e.g.
   `https://phendriieson.github.io/milsim-dossier/`
3. Scopes: `openid profile`.
4. Copy the Client ID into `ROBLOX_CLIENT_ID` in `src/lib/roblox-auth.js`.
   No client secret is used — this uses PKCE, which is the only OAuth flow
   safe to run entirely in the browser with no backend.

## 4. Set the owner allowlist for the UI badge

`src/lib/firebase.js` reads `admins/<robloxUserId>` to decide whether to show
the Editor link in the sidebar (UI convenience only — see security note
above). Add your Roblox numeric user ID there too:
```
admins/<your-roblox-user-id> = true
```

## 5. Deploy to GitHub Pages

1. In `vite.config.js`, set `base: '/your-repo-name/'`.
2. Create the repo, push this code.
3. ```bash
   npm run build
   npm run deploy
   ```
   (uses `gh-pages` to push `dist/` to the `gh-pages` branch — enable Pages
   on that branch in the repo settings).

## Data model

Realtime Database tree:
```
/profile
/admins/{id}            -> true
/usar/info               -> { enlistmentDate, unit, position, history }
/usar/ribbons/{id}       -> { name, imageUrl, dateAwarded, citation, stripeColors: [] }
/usar/badges/{id}
/usar/foreignAwards/{id}
/usar/unitAwards/{id}
/mba/info
/mba/medals/{id}
/mba/badges/{id}
/mba/foreignAwards/{id}
```
`stripeColors` is an array of hex strings rendered as a ribbon-bar swatch
when no `imageUrl` is set — that's the signature visual element used across
every award card.

## Flagged assumptions (per the original brief)

- Used Realtime Database (not Firestore) to match the existing intel-hub
  backend pattern.
- "USAR" / "MBA" treated as in-sim labels only.
- Single-owner editing, enforced via the two-login pattern above rather than
  a Roblox-only flow, for the security reasons described.
- Roblox OAuth is identity/login only — it does not pull live rank data from
  a Roblox group. Say the word if you want a Roblox group-rank sync added;
  it's a separate API integration on top of this.
