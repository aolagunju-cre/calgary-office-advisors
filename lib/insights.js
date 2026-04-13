const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const INSIGHTS_DIR = path.join(process.cwd(), 'data', 'insights');

/**
 * Get all insight slugs (for getStaticPaths).
 */
function getInsightSlugs() {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs.readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.(md|mdx)$/, ''));
}

/**
 * Get all insights, sorted by date descending.
 */
function getAllInsights() {
  const slugs = getInsightSlugs();
  const insights = slugs.map((slug) => getInsightBySlug(slug));
  return insights
    .filter(Boolean)
    .sort((a, b) => (new Date(b.date) - new Date(a.date)));
}

/**
 * Get a single insight by slug.
 */
function getInsightBySlug(slug) {
  const extensions = ['.md', '.mdx'];
  let filePath = null;
  for (const ext of extensions) {
    const p = path.join(INSIGHTS_DIR, `${slug}${ext}`);
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }
  if (!filePath) return null;
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title || slug,
    // FIX: Convert Date objects to ISO date string so Next.js can serialize them
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
    excerpt: data.excerpt || '',
    content,
  };
}

module.exports = { getInsightSlugs, getAllInsights, getInsightBySlug };
