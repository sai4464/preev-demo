cat > README.md <<'MD'
# Preev Demo — PR Preview Environments (Free Tier)

Every Pull Request automatically gets a **live preview URL** built on Cloudflare Pages.  
A **bot comment** posts the preview link on the PR. Close the PR and keep building — $0 infra.

## How it works
- Push a branch and open a PR → Cloudflare Pages builds a **Preview deployment** for that branch.
- A GitHub workflow calls the Cloudflare API and **comments the Preview URL** on the PR.

## Try it (2 steps)
1. Create a new branch, change any text in `src/App.tsx`, and open a PR.
2. Wait ~1–2 minutes. A bot comment appears with the **Preview URL**. Click it to view your changes live.

## Tech (all free tiers)
- **Cloudflare Pages** for PR previews  
- **GitHub Actions** for the PR comment

## Notes / Limits
- First load of a fresh preview can be a little slow (build + cache warm-up).  
- Multiple previews are fine; each PR gets its own unique URL.  
- Uses platform subdomains (free TLS). No custom domain needed.

## Troubleshooting
- **No PR comment?** Check the workflow run on the PR (Actions/Checks). Most issues are missing repo secrets:
  - `CF_API_TOKEN` (Cloudflare token with Pages permission)
  - `CF_ACCOUNT_ID` (your Cloudflare Account ID)
  - `CF_PAGES_PROJECT` (your Pages project name/slug)
- **Preview shows old page?** Make sure you’re opening the **Preview** URL (hashed subdomain), not the production URL.

---
MD
