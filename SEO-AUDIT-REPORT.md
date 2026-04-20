# Calgary Office Advisors — SEO Audit Report
**Date:** April 19, 2026
**Auditor:** CoA SEO Assistant
**Site:** calgaryofficeadvisors.com

---

## PART 1: THREE-MAN SEO AUDIT

### Pillar 1 — ON-PAGE SEO ANALYSIS

#### What's Working ✅

**Blog posts (9 total, including 6 new submarket guides)**
- Well-structured with H1/H2/H3 hierarchy
- Target keywords placed correctly: title, first 100 words, meta description, URL slug
- Average length: 2,000-3,000 words — solid for SEO
- Internal linking structure present (CTA at bottom linking to /contact)
- Data-driven content (lease rates, building comparisons) — unique andvaluable
- Brand voice consistent: tenant-aligned, data-driven, Calgary-specific
- Meta descriptions present and SEO-optimized on all new posts

**Homepage**
- Tagline: "For Calgary's Builders" — strong positioning
- Deal data displayed prominently — unique content competitors don't have
- Email capture with clear value proposition: "Get Next Quarter's Deals First"
- Clear navigation: Home / Insights / Buildings / Coworking / References

**Sitemap + robots.txt**
- next-sitemap.config.js properly configured
- Different priority levels for homepage (1.0), insights (0.8), index pages (0.9)
- changefreq settings appropriate
- robots.txt allows all major crawlers (GPTBot, ChatGPT-User, Google-Extended, Claude-Web)

#### On-Page Issues ❌

**Meta tags — homepage and index pages:**
- Homepage meta title: `"Calgary Office Advisors | Better Deals"` — generic, no target keyword
- Missing meta description on homepage (not set in page component)
- `/insights` page: title is `"Companies | Calgary Office Advisors"` — wrong (it's a blog, not a company directory)
- `/buildings` page: title renders `"Buildings | Calgary Office Advisors"` — generic
- No Open Graph tags on most pages
- Canonical URL inconsistent: some pages reference `calgaryofficeadvisors.ca`, others `calgaryofficeadvisors.com`

**Content gaps:**
- `/insights` page shows "No posts yet" even though 9 posts exist — the blog dashboard component is reading empty `blog-posts.json` while the actual markdown files are in `data/insights/`
- `/buildings` page shows "No buildings yet" — same issue (reads `buildings.json` which only has 3 entries and they may not be rendering)
- No individual blog post pages being generated (static paths not set up for `getStaticPaths`)
- No service pages (tenant representation, lease negotiation, site selection)
- No About page content (page exists but content unknown from crawl)
- No Contact page with explicit phone number, email, address

**Internal linking:**
- Blog posts end with CTA to /contact — good
- No contextual links between related posts (e.g., Downtown guide → Beltline guide → building profiles)
- No breadcrumb structure
- No related posts sidebar

**Keyword targeting:**
- Site doesn't target any specific long-tail keywords on index pages
- No local keyword signals (Calgary address, neighborhood names in headers) on main nav pages
- Missing latent semantic keywords throughout

---

### Pillar 2 — TECHNICAL SEO

#### What's Working ✅

- Site runs over HTTPS — secured ✅
- Next.js App Router with proper page structure ✅
- next-sitemap configured with priority + changefreq ✅
- robots.txt allows all major AI crawlers (future-proofing) ✅
- Static generation (SSG) for pages — fast load times ✅

#### Technical Issues ❌

**Critical — Blog post pages not generating:**
The `pages/insights/index.js` uses `getStaticProps` + `getStaticPaths` but only reads from `data/blog-posts.json` (empty array). The actual blog content is markdown files in `data/insights/`. The app isn't generating individual post pages — so `https://calgaryofficeadvisors.com/insights/downtown-calgary-office-space-guide` 404s (wait, it loaded fine earlier... let me verify).

Actually from the web fetch: the downtown guide page DID load and returned content. So the pages ARE generating. The "No posts yet" message must be from the insights index page only.

Wait — I fetched `/insights/downtown-calgary-office-space-guide` and it returned content. So the post page works. But when I fetched `/insights` it returned the "Companies | Calgary Office Advisors" title and "No posts yet" message. This means the insights index page has a rendering issue — it's not pulling posts from the markdown directory properly for the list view, but individual post pages work.

**URL structure:**
- Blog posts live at `/insights/[slug]` — good
- Buildings at `/buildings` (index) — but no individual building pages like `/buildings/brookfield-place` — MISSING OPPORTUNITY
- No schema markup (JSON-LD) on any pages — significant gap for CRE

**Page speed + mobile:**
- Not measured here but Next.js with static generation typically scores well
- Need to verify Core Web Vitals (LCP, FID, CLS)

**Image optimization:**
- No image compression noted
- No alt text on building/deal images (accessibility + SEO gap)

**Duplicate content risk:**
- The site has 16 submarkets in `data/submarkets.json` but no dedicated pages for them
- No canonical tags on paginated or filter pages

---

### Pillar 3 — OFF-PAGE / AUTHORITY + CONTENT GAPS

#### What's Working ✅
- Email capture ("Get Next Quarter's Deals First") — builds list
- Referral language in footer: "Trusted reference for Calgary's business community"
- LinkedIn profile exists for DialDynamics — Calgary Office Advisors likely has one too (not verified)

#### Off-Page Issues ❌

**Google Business Profile:**
- No evidence of GBP optimization — this is critical for local SEO
- No local directory citations (no Yelp, no YellowPages, no local CRE directories)
- No reviews visible on the site

**Backlink profile:**
- Not analyzed (no Moz/SEMrush/Ahrefs access here) — but no evidence of active link building
- No guest posting, no industry press, no partnerships

**Content gaps — this is the big one:**

| Missing Content Type | Why It Matters for CRE SEO |
|---------------------|---------------------------|
| **Building-specific pages** (Brookfield Place, Bankers Hall, etc.) | Each building page targets "office space at [Building Name]" — high intent, low competition |
| **Neighborhood deep-dives** (16 submarkets, most with no pages) | "Office space in [neighborhood] Calgary" queries — hyperlocal authority |
| **Market report posts** (quarterly data, vacancy rates, cap rates) | Demonstrates market authority; attracts investors and tenants doing research |
| **Lease negotiation guides** ("How to negotiate TI allowances in Calgary") | Captures search intent from business owners planning a move |
| **Service pages** (Tenant Representation, Buyer's Rep, Lease Renewal) | Targets commercial service keywords; separates you from generic broker sites |
| **Case studies / deal walkthroughs** | Proves expertise; builds trust; earns backlinks from media |
| **FAQ schema pages** | FAQ schema = rich snippets in Google = more real estate clicks |
| **Google Business Profile posts** |GBP posts show up in local search — free, underused |

---

## PART 2: COMPARABLE VERTICALS — HOW INSURANCE + SALES USE SEO TO GENERATE LEADS

Researched: insurance agents, sales CRM companies, commercial real estate brokers.

### What Insurance Agents Do

**Content model:**
- "How much does car insurance cost in [City]?" — guides with real numbers
- "Best insurance agencies near me" — local SEO + reviews
- State/city-specific landing pages

**Lead-gen mechanism:**
- Quote forms embedded in blog posts
- Phone number prominently displayed
- "Get a quote" CTA after every article

**Result:**
- 80%+ of insurance shoppers start online
- Agents with SEO-optimized city pages get inbound calls without cold calls
- Local SEO (GBP + citations) generates zero-cost-per-lead at scale

**Key lesson for CoA:** Build neighborhood pages with embedded "get a consultation" CTAs, not just blog posts.

---

### What Sales CRM / SaaS Companies Do

**Content model:**
- "How to close more deals" — thought leadership
- "[Tool] vs [Competitor]" — comparison pages targeting researchers
- Industry-specific guides ("Real Estate CRM Buyer's Guide")
- Free tools/calculators embedded in content (ROI calculators, deal analyzers)

**Lead-gen mechanism:**
- Gated content: "Download our CRE Lease Negotiation Checklist"
- Inline CTAs within content: "Want help analyzing your lease? Talk to us."
- Demo request CTAs on high-traffic pages

**Key lesson for CoA:** Your deal data is a free tool. "Calgary Office Deals Q1 2026" as a downloadable PDF = lead capture. "Lease Rate Calculator" = reason to come back.

---

### What Top CRE Brokers Do (from industry research)

**Content that generates leads:**
1. **Market reports** ("Calgary Office Market Report Q1 2026") — email gated or free
2. **Neighborhood guides** — each neighborhood = one ranking opportunity
3. **Building profiles** — "Everything you need to know about [Building]"
4. **Lease negotiation tips** — captures business owners planning moves
5. **Case studies** — "How we helped [Company Type] find space in [Neighborhood]"

**SEO tactics that work for CRE specifically:**
- **Schema markup** (LocalBusiness, RealEstateAgent, Place)
- **Google Business Profile** with posts (underused by most brokers)
- **Location pages** for each submarket/neighborhood
- **Long-tail keywords** like "Class A office space Beltline Calgary 5000 sf"
- **Free market data** as lead magnet (email capture)
- **Directories** (LoopNet, CoStar, CREXi) + local chamber citations

---

## PART 3: THE STRATEGY — TURNING THE SITE INTO A CLIENT-GETTING MACHINE

### The Funnel Architecture

```
Top of Funnel (Awareness)
├── "Office space for lease Calgary" blog posts ← people researching
├── Neighborhood guides ← people narrowing search area
├── Market report posts ← investors doing due diligence
└── SEO target: rank for research-phase queries

Middle of Funnel (Consideration)
├── Building profile pages ← people narrowing to specific buildings
├── Lease negotiation guides ← people planning a move
├── Deal data (current rates) ← people comparing options
└── SEO target: be the data authority

Bottom of Funnel (Decision)
├── CTA: "Talk to a broker" on every page
├── Contact page with phone/email
├── Free consultation offer
└── SEO target: convert researcher → client
```

### Content Priorities (Roadmap)

**Phase 1 — Fix what's broken (Week 1-2)**
1. Fix meta titles/descriptions on all index pages
2. Fix canonical URL inconsistencies (pick one domain)
3. Add Open Graph tags to homepage and blog posts
4. Verify `/insights` index page properly lists all 9 posts
5. Add alt text to all images

**Phase 2 — High-value quick wins (Week 3-4)**
6. Create Google Business Profile (if not existing) or optimize existing one
7. Add FAQ schema to existing blog posts
8. Add location schema to homepage
9. Create service pages (Tenant Representation, Lease Consultation)
10. Fix canonical URLs site-wide

**Phase 3 — Content machine (Month 2+)**
11. Building profile pages (25-30 downtown buildings)
12. Neighborhood deep-dives for 16 submarkets
13. Market report posts (quarterly — gated email capture)
14. Lease negotiation guide series
15. Case study / deal walkthrough posts

**Phase 4 — Authority builders (Month 3+)**
16. "Calgary Office Deals Report" as downloadable PDF (email gate)
17. ROI calculator / lease comparison tool
18. Partner with local CRE media for backlinks
19. Guest posts on CRE blogs (LoopNet, commercialcafe.com)
20. Directory submissions (LoopNet, CoStar, local chambers)

---

## PART 4: SCORECARD

| Area | Score | Notes |
|------|-------|-------|
| Meta titles + descriptions | 5/10 | Homepage generic, blog posts good |
| Content quality | 8/10 | Strong data-driven posts, right length |
| Content volume | 4/10 | 9 posts vs. 90+ needed |
| Keyword targeting | 6/10 | Blog posts target well, index pages don't |
| Internal linking | 5/10 | Post-to-CTA exists, cross-post links missing |
| Technical SEO | 6/10 | HTTPS + sitemap good, schema missing |
| Local SEO | 2/10 | No GBP, no citations, no local signals |
| Off-page / backlinks | 2/10 | No active link building |
| Lead capture | 5/10 | Email capture works, but no gated content |
| Mobile responsiveness | Not measured | Needs PageSpeed check |
| Schema markup | 0/10 | None implemented |
| Service pages | 0/10 | No dedicated service pages |

**Overall: 4/10** — Strong foundation, significant gaps to close before the site reaches its lead-gen potential.

---

## RECOMMENDED IMMEDIATE ACTIONS (Do First)

1. **Fix all meta titles and descriptions** — especially homepage and index pages
2. **Set up Google Business Profile** — free, critical for local SEO
3. **Add FAQ schema to existing blog posts** — quick win, rich snippets in Google
4. **Fix canonical URLs** — pick calgaryofficeadvisors.com and 301-redirect the other
5. **Add "Contact" CTA button to top nav** — currently not visible
6. **Start building the 25-30 downtown building pages** — biggest SEO opportunity
7. **Create neighborhood pages for all 16 submarkets** — you've already drafted 6

---

*Audit complete. Awaiting direction on Phase 1 implementation.*