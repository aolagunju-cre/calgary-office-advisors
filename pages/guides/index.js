import Head from 'next/head';
import NextLink from 'next/head';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Button,
  SimpleGrid,
  useColorMode,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiDownload, FiMail, FiCheckCircle } from 'react-icons/fi';
import Layout from '../../components/Layout';
import useColors from '../../hooks/useColors';
import { useState } from 'react';

export default function GuidesPage() {
  const colors = useColors();
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.calgaryofficeadvisors.com';

  return (
    <>
      <NextSeo
        title="Free Calgary Office Leasing Guides | Calgary Office Advisors"
        description="Download free guides on Calgary office leasing. Office Leasing 101 covers lease rates, tenant reps, key terms, and how to find the right space in Calgary."
        canonical={`${siteUrl}/guides`}
        openGraph={{
          title: 'Free Calgary Office Leasing Guides | Calgary Office Advisors',
          description: 'Download free guides on Calgary office leasing. Office Leasing 101 covers lease rates, tenant reps, key terms, and how to find the right space in Calgary.',
          url: `${siteUrl}/guides`,
          images: [{ url: `${siteUrl}/images/og-default.jpg` }],
        }}
      />
      <Layout>
        <Box pt={{ base: 28, lg: 32 }} pb={{ base: 16, lg: 24 }}>
          <Container maxW="900px" px={{ base: 4, md: 8 }}>

            {/* Header */}
            <VStack align="stretch" spacing={6} textAlign="center" mb={16}>
              <Text
                fontSize="xs"
                fontWeight="600"
                color={colors.textSubtle}
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                Free Resources
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontFamily="heading"
                fontWeight="400"
                color={colors.textPrimary}
              >
                Calgary Office Leasing Guides
              </Heading>
              <Text fontSize="lg" color={colors.textMuted} maxW="600px" mx="auto">
                Practical resources to help Calgary businesses navigate office leasing.
                Download free. Use immediately.
              </Text>
            </VStack>

            {/* Featured Guide */}
            <Box
              bg={colors.bgCard}
              border="1px solid"
              borderColor={colors.border}
              borderRadius="xl"
              overflow="hidden"
              mb={12}
            >
              <Box bg={colors.brandColor || '#1a2b4a'} px={{ base: 6, md: 10 }} py={10} textAlign="center">
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color="#c9a227"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  mb={3}
                >
                  Featured Guide
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color="white"
                  mb={3}
                >
                  Office Leasing 101: What Calgary Businesses Need to Know
                </Heading>
                <Text color="whiteAlpha.800" fontSize="md">
                  22 pages — Free PDF Download
                </Text>
              </Box>

              <Box px={{ base: 6, md: 10 }} py={8}>
                <VStack align="stretch" spacing={6}>
                  <Text color={colors.textMuted}>
                    The complete guide to navigating your first—or next—commercial office lease in Calgary. Covers:
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {[
                      'Types of office space: Class A, B, and C explained',
                      'Understanding lease rates: NNN, Gross, and Modified Gross',
                      'Who is involved in a lease (and who works for you)',
                      'Key lease terms: TI allowances, free rent, operating cost caps',
                      'How to search for office space in Calgary',
                      'What to look for when touring a space',
                      'Common mistakes to avoid',
                      'How a tenant rep helps (and why you need one)',
                    ].map((item, i) => (
                      <HStack key={i} align="flex-start" spacing={3}>
                        <Box color="#c9a227" mt={1}><FiCheckCircle size={14} /></Box>
                        <Text fontSize="sm" color={colors.textSecondary}>{item}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>

                  <Box
                    bg={colors.bgPrimary}
                    border="1px solid"
                    borderColor={colors.border}
                    borderRadius="lg"
                    px={6}
                    py={6}
                  >
                    {!submitted ? (
                      <VStack spacing={4}>
                        <HStack spacing={3}>
                          <FiMail size={20} color={colors.textMuted} />
                          <Text fontSize="sm" color={colors.textMuted}>
                            Enter your email to get the free guide instantly
                          </Text>
                        </HStack>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                          <VStack spacing={3} width="100%">
                            <input
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: `1px solid ${colors.border}`,
                                background: colors.bgPrimary,
                                color: colors.textPrimary,
                                fontSize: '14px',
                                outline: 'none',
                              }}
                            />
                            <Button
                              type="submit"
                              bg={colors.brandColor || '#1a2b4a'}
                              color="white"
                              width="100%"
                              size="md"
                              fontWeight="600"
                              _hover={{ opacity: 0.9 }}
                              leftIcon={<FiDownload />}
                            >
                              Get the Free Guide — Download PDF
                            </Button>
                          </VStack>
                        </form>
                        <Text fontSize="xs" color={colors.textSubtle} textAlign="center">
                          We'll send you the download link. No spam. Unsubscribe anytime.
                        </Text>
                      </VStack>
                    ) : (
                      <VStack spacing={3} textAlign="center" py={4}>
                        <Box color="#c9a227"><FiCheckCircle size={40} /></Box>
                        <Text fontWeight="600" color={colors.textPrimary}>
                          Your guide is on its way!
                        </Text>
                        <Text fontSize="sm" color={colors.textMuted}>
                          Check your inbox for the download link.
                        </Text>
                        <a
                          href="/downloads/Office-Leasing-101-Calgary-2026.pdf"
                          download
                          style={{ width: '100%' }}
                        >
                          <Button
                            width="100%"
                            size="md"
                            fontWeight="600"
                            leftIcon={<FiDownload />}
                            bg={colors.brandColor || '#1a2b4a'}
                            color="white"
                            _hover={{ opacity: 0.9 }}
                          >
                            Also Download Now (Direct Link)
                          </Button>
                        </a>
                      </VStack>
                    )}
                  </Box>
                </VStack>
              </Box>
            </Box>

            {/* Coming Soon */}
            <VStack spacing={4} textAlign="center" py={8}>
              <Text fontSize="sm" color={colors.textSubtle} fontWeight="600" letterSpacing="0.1em" textTransform="uppercase">
                Coming Soon
              </Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} width="100%">
                {[
                  { title: 'Calgary Office Lease Rate Guide 2026', desc: 'Current lease rates by submarket and building class.' },
                  { title: 'Neighborhood Comparison: Calgary Office Districts', desc: 'Side-by-side comparison of 6 Calgary office submarkets.' },
                  { title: 'Lease Negotiation Checklist', desc: 'The terms every tenant should negotiate before signing.' },
                ].map((g, i) => (
                  <Box
                    key={i}
                    bg={colors.bgCard}
                    border="1px solid"
                    borderColor={colors.border}
                    borderRadius="lg"
                    px={6}
                    py={6}
                    opacity={0.6}
                  >
                    <Text fontWeight="600" fontSize="sm" color={colors.textSecondary} mb={2}>
                      {g.title}
                    </Text>
                    <Text fontSize="xs" color={colors.textSubtle}>
                      {g.desc}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>

            {/* Bottom CTA */}
            <Box textAlign="center" pt={12}>
              <Text fontSize="lg" color={colors.textPrimary} mb={4} fontWeight="500">
                Ready to start your office search?
              </Text>
              <NextLink href="/contact" passHref legacyBehavior>
                <Link
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  px={6}
                  py={3}
                  bg={colors.brandColor || '#1a2b4a'}
                  color="white"
                  borderRadius="md"
                  fontWeight="600"
                  fontSize="sm"
                  _hover={{ opacity: 0.9, textDecoration: 'none' }}
                >
                  Talk to a Broker
                </Link>
              </NextLink>
            </Box>

          </Container>
        </Box>
      </Layout>
    </>
  );
}
