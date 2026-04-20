import Head from 'next/head';
import NextLink from 'next/link';
import Script from 'next/script';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { FiArrowLeft } from 'react-icons/fi';
import Layout from '../../components/Layout';
import { getInsightBySlug, getInsightSlugs } from '../../lib/insights';
import useColors from '../../hooks/useColors';

const mdComponents = (colors) => ({
  p: ({ children }) => <Text as="p" fontSize="md" color={colors.textSecondary} lineHeight="1.8" mb={4}>{children}</Text>,
  h2: ({ children }) => <Heading as="h2" size="md" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mt={8} mb={4}>{children}</Heading>,
  h3: ({ children }) => <Heading as="h3" size="sm" fontFamily="heading" fontWeight="400" color={colors.textPrimary} mt={6} mb={3}>{children}</Heading>,
  ul: ({ children }) => <Box as="ul" pl={6} mb={4} sx={{ '& li': { color: colors.textSecondary, lineHeight: 1.8, mb: 1 } }}>{children}</Box>,
  ol: ({ children }) => <Box as="ol" pl={6} mb={4} sx={{ '& li': { color: colors.textSecondary, lineHeight: 1.8, mb: 1 } }}>{children}</Box>,
  strong: ({ children }) => <Text as="strong" fontWeight="600" color={colors.textPrimary}>{children}</Text>,
});

export default function InsightPost({ post }) {
  const colors = useColors();
  if (!post) return null;
  const title = `${post.title} | Calgary Office Advisors`;
  const description = post.excerpt || post.title;
  const siteUrl = 'https://www.calgaryofficeadvisors.com/';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: description,
    author: {
      '@type': 'Organization',
      name: 'Calgary Office Advisors',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calgary Office Advisors',
      url: siteUrl,
    },
    datePublished: post.date || new Date().toISOString(),
    dateModified: post.date || new Date().toISOString(),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does office space cost in Calgary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Calgary office lease rates vary by class and location. Downtown Class A space typically ranges from 32-55 CAD per square foot annually (NNN). Class B space runs 22-32 CAD per square foot. Suburban options are generally 18-30 CAD per square foot. Actual rates depend on building, floor, view, amenities, and negotiation.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Class A, B, and C office space?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Class A buildings are premium high-rises with modern systems, professional management, and high-end finishes. Class B buildings are good quality mid-rise buildings with functional but older finishes. Class C buildings are older properties with dated systems and lower rents. The class determines both the space quality and the lease rate bracket.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I lease directly or work with a tenant rep broker?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A tenant rep broker represents your interests as a tenant, not the landlord. At Calgary Office Advisors, we track every significant lease transaction in Calgary. That market intelligence helps you negotiate better terms, avoid common mistakes, and find options you would not discover on your own. Tenant rep services are typically paid by the landlord through commission structures built into the lease.'
        }
      },
      {
        '@type': 'Question',
        name: 'What should I look for when touring Calgary office space?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check: elevator wait times, lobby condition and cleanliness, parking availability and cost, HVAC reliability, internet carrier options, neighboring tenants, restaurant and service access nearby, transit connections, and building security. Ask about operating cost caps and recent renovations. Always get the actual operating cost breakdown, not just the base rent.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I negotiate tenant improvement allowances in Calgary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TI allowances in Calgary typically range from 20-80 CAD per square foot depending on lease term, building class, and landlord. The longer the term and the better your credit, the more negotiating leverage you have. TI allowances are often the most valuable concession in a Calgary office lease. A 50 CAD per square foot TI allowance on a 10,000 square foot space is 500,000 CAD you can use for your office build-out.'
        }
      }
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/insights/${post.slug}`,
    }
  };

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, faqSchema]) }}
        />
      </Head>
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="720px" px={{ base: 4, md: 8 }}>
            <NextLink href="/insights" passHref legacyBehavior>
              <Link
                fontSize="sm"
                color={colors.textSecondary}
                fontWeight="500"
                mb={8}
                display="inline-flex"
                alignItems="center"
                gap={2}
                _hover={{ color: colors.textPrimary }}
              >
                <FiArrowLeft /> Back to Insights
              </Link>
            </NextLink>

            <VStack align="stretch" spacing={8} textAlign="left">
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color={colors.textSubtle}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb={3}
                >
                  Insight
                </Text>
                <Heading
                  as="h1"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  lineHeight="1.3"
                >
                  {post.title}
                </Heading>
                {post.date && (
                  <Text mt={3} fontSize="sm" color={colors.textSubtle}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </Text>
                )}
              </Box>

              <Box
                className="insight-body"
                sx={{
                  '& p': { mb: 4 },
                  '& ul, & ol': { pl: 6, mb: 4 },
                  '& li': { mb: 1, lineHeight: 1.8 },
                }}
              >
                <ReactMarkdown components={mdComponents(colors)}>
                  {post.content}
                </ReactMarkdown>
              </Box>

              <NextLink href="/insights" passHref legacyBehavior>
                <Link fontSize="sm" color={colors.textSecondary} fontWeight="500" _hover={{ color: colors.textPrimary }}>
                  ← All insights
                </Link>
              </NextLink>
            </VStack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export function getStaticProps({ params }) {
  const post = getInsightBySlug(params.slug);
  return { props: { post: post ? { ...post, slug: params.slug } : null } };
}

export function getStaticPaths() {
  const slugs = getInsightSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}
