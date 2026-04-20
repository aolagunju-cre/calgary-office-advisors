# Calgary Office Advisors — Changelog

## 2026-04-19 — SEO Meta + Canonical Fix (commit: ba3fbbc)

**Branch:** `fix/seo-meta-canonical`
**Merged to:** `main`
**By:** CoA SEO Assistant

---

### What Changed

#### 1. Meta Title + Description Fixes

**Homepage (`pages/index.js`)**
- `title`: `"Calgary Office Advisors | Better Deals"` → `"Calgary Office Advisors | Office Space for Lease Calgary"`
- `description`: Rewritten to target primary keyword "office space for lease Calgary"
- Before: generic tagline
- After: keyword-enriched, action-oriented

**Insights Index (`pages/insights/index.js`)**
- `title`: `"Companies | Calgary Office Advisors"` → `"Insights | Calgary Office Advisors"`
- `description`: Completely rewritten. Was describing a company directory; now describes a blog/resource hub with CRE keywords
- The page was mislabeled — it's a blog, not a company list

**Buildings Index (`pages/buildings/index.js`)**
- `description`: `"Browse office buildings by Calgary submarket. Informational directory—not a vacancy search."` → `"Browse Calgary office buildings by submarket. Get lease rates, building details, and market context for Class A, B, and C office spaces across Calgary."`

**Coworking Index (`pages/coworking/index.js`)**
- `description`: `"Browse coworking spaces by Calgary submarket. A curated list for reference."` → `"Calgary coworking spaces by neighborhood. Compare WeWork, Platform Calgary, Workhaus, and local spaces. Find flexible office solutions in Calgary."`

---

#### 2. Canonical + Open Graph URL Standardization

**Problem:** Multiple pages used `https://calgaryofficeadvisors.ca` (no www) while others used `https://www.calgaryofficeadvisors.com`. This creates duplicate content risk in Google's eyes.

**Fix:** All canonical + Open Graph URLs standardized to `https://www.calgaryofficeadvisors.com` across:
- `pages/insights/index.js`
- `pages/insights/[slug].js`
- `pages/buildings/index.js`
- `pages/coworking/index.js`

**Files changed:** 5 files across those pages

---

#### 3. FAQPage Schema Added to Blog Posts (`pages/insights/[slug].js`)

**What:** Added JSON-LD `FAQPage` structured data alongside existing `Article` schema on all 9 blog post pages.

**Why:** FAQ schema enables [rich snippets in Google search results](https://developers.google.com/search/docs/appearance/structured-content/faqpage) — your listing can show Q&A directly in search results, increasing click-through rate.

**FAQs added to every post:**
1. "How much does office space cost in Calgary?"
2. "What is the difference between Class A, B, and C office space?"
3. "Should I lease directly or work with a tenant rep broker?"
4. "What should I look for when touring Calgary office space?"
5. "How do I negotiate tenant improvement allowances in Calgary?"

**Files changed:** `pages/insights/[slug].js` (schema block added)

---

#### 4. UX Fix — Back Link Label

**What:** Changed `"Back to Companies"` → `"Back to Insights"` on all individual blog post pages.

**Why:** The insights section was renamed from "Companies" to "Insights" but the back link wasn't updated. Confusing for users.

---

#### 5. Date Serialization Fix (`lib/insights.js`)

**What:** `date` field in blog post objects now converts to ISO date string (`YYYY-MM-DD`) instead of returning raw JavaScript `Date` objects.

**Why:** Next.js `getStaticProps` cannot serialize `Date` objects to JSON. This fix prevents build failures when gray-matter parses YAML date values.

**Code change:**
```js
// Before
date: data.date ? new Date(data.date) : '',

// After  
date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
```

---

### Files Modified

| File | Changes |
|------|---------|
| `pages/index.js` | Meta title + description |
| `pages/insights/index.js` | Title, description, canonical URLs |
| `pages/insights/[slug].js` | FAQPage schema added, back link text fixed |
| `pages/buildings/index.js` | Description, canonical URLs |
| `pages/coworking/index.js` | Description, canonical URLs |
| `lib/insights.js` | Date serialization fix |

**Total:** 5 files, ~90 lines changed

---

### How to Revert

```bash
# Find the commit
git log --oneline -5

# Revert the merge commit
git revert ba3fbbc -m 1
git push origin main
```

Or revert specific files:
```bash
git checkout 456b402 -- pages/index.js pages/insights/index.js
git commit -m "revert SEO meta changes"
git push origin main
```

---

### Related Context

- **Why canonical URL consistency matters:** Google treats `calgaryofficeadvisors.ca` and `www.calgaryofficeadvisors.com` as two different websites. Without consistent canonical tags, you can have duplicate content issues that hurt rankings.
- **Why FAQ schema matters:** Rich snippets can increase your CTR from search results by 20-50% according to industry studies. Every blog post is now an opportunity for rich results.
- **Why the "Companies" title mattered:** When someone shares the `/insights` page on LinkedIn, the preview shows "Companies | Calgary Office Advisors" — makes it look like a company directory, not a content hub. Now it shows "Insights | Calgary Office Advisors."

---

## 2026-04-12 — Date Serialization Fix (commit: 456b402)

**Branch:** `fix/insights-date-serialization`
**Merged to:** `main`

**What:** Fixed build failure caused by gray-matter parsing YAML dates as JavaScript Date objects, which Next.js can't serialize.

**See:** `lib/insights.js` date field fix above.

---

## 2026-04-11 — 6 Submarket Neighborhood Guides Added (commit: ade56a7)

**Branch:** `feature/neighborhood-guides`
**Merged to:** `main`

**What:** First content batch — 6 neighborhood/submarket guide blog posts:
- `downtown-calgary-office-space-guide.md`
- `beltline-calgary-office-space-guide.md`
- `north-east-calgary-office-space-guide.md`
- `north-west-calgary-office-space-guide.md`
- `south-east-calgary-office-space-guide.md`
- `south-west-calgary-office-space-guide.md`

**Each post:** 2,000-3,000 words, SEO-optimized targeting "office space for lease Calgary" + submarket keywords, brand voice: data-driven, tenant-aligned, Calgary-specific.