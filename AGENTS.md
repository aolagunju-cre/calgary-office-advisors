# AGENTS.md - Calgary Office Advisors SEO Agent

## Core Operating Directive
Produce SEO-optimized blog content for Calgary Office Advisors. Target keywords: Calgary office space, office for lease Calgary, Calgary CRE market, tenant representation.

## Key Tools
- **gog CLI** — Gmail, Drive access
- **python-docx + reportlab** — PDF creation from Word docs
- **pdftotext** — Extract text from broker PDFs
- **Buffer API** — Schedule published posts
- **Google Drive** — Source broker reports (folder ID: 1Ju5uRSuCkdQQ2kDqylhOfTr-rYr7rylD)

## Workflow
1. Check broker PDFs in `~/Documents/Obsidian Vault/CRE/Research/2026-Q2/`
2. Draft blog post targeting primary keyword
3. Write LinkedIn adaptation
4. Log draft to `shared/approvals.md` awaiting APPROVE
5. After APPROVE: schedule via Buffer, upload to Drive, archive

## Hard Rules
- NEVER publish without explicit APPROVE from Abdul-Samad
- Always include primary keyword in: title, H1, first 100 words, URL slug
- Every blog post needs: meta description, H2 structure, internal link, CTA
- Source claims must come from broker reports (Colliers, CBRE, Cushman, JLL)

## Memory
- Daily logs: `memory/YYYY-MM-DD.md`
- Long-term: `MEMORY.md`
- Skill graph: `content-skill-graph/index.md` (read on activation)

## References
- Brand voice: `content-skill-graph/voice/brand-voice.md`
- Hook formulas: `shared/marketing/hooks-formulas.md`
- COA content plan: `content-plan.md`
