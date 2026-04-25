import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  SimpleGrid,
  Button,
  Badge,
  Divider,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiArrowRight, FiMapPin, FiTrendingUp, FiBookOpen, FiShield, FiClock, FiCheckCircle } from 'react-icons/fi';
import Layout from '../components/Layout';
import useColors from '../hooks/useColors';
import { useState, useEffect, useRef } from 'react';

// ─── Scroll animation hook ───────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated section wrapper ────────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  const { ref, inView } = useInView();
  return (
    <Box
      ref={ref}
      opacity={inView ? 1 : 0}
      transform={inView ? 'translateY(0)' : 'translateY(28px)'}
      transition={`opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`}
      style={style}
    >
      {children}
    </Box>
  );
}

// ─── Stat pill ───────────────────────────────────────────────────────────────
function Stat({ value, label }) {
  const colors = useColors();
  return (
    <VStack spacing={0} flex={1} textAlign="center">
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="700" color={colors.gold}>
        {value}
      </Text>
      <Text fontSize="xs" color={colors.textSubtle} textTransform="uppercase" letterSpacing="0.08em">
        {label}
      </Text>
    </VStack>
  );
}

// ─── Insight card ────────────────────────────────────────────────────────────
function InsightCard({ title, excerpt, slug, delay = 0 }) {
  const colors = useColors();
  return (
    <FadeUp delay={delay}>
      <NextLink href={`/insights/${slug}`} passHref legacyBehavior>
        <Link
          display="block"
          bg={colors.bgCard}
          border="1px solid"
          borderColor={colors.border}
          borderRadius="xl"
          overflow="hidden"
          _hover={{ borderColor: colors.gold, transform: 'translateY(-3px)', textDecoration: 'none' }}
          transition="all 0.25s ease"
          style={{ textDecoration: 'none' }}
        >
          <Box px={6} py={5}>
            <Text fontSize="xs" color={colors.gold} fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" mb={2}>
              Insight
            </Text>
            <Heading as="h3" fontSize={{ base: 'md', md: 'lg' }} fontWeight="600" color={colors.textPrimary} mb={2} lineHeight="1.4">
              {title}
            </Heading>
            <Text fontSize="sm" color={colors.textMuted} lineHeight="1.6" noOfLines={3}>
              {excerpt}
            </Text>
          </Box>
          <HStack px={6} py={4} borderTop="1px solid" borderColor={colors.border} spacing={2}>
            <Text fontSize="xs" color={colors.textSubtle}>Read more</Text>
            <Box color={colors.gold}><FiArrowRight size={12} /></Box>
          </HStack>
        </Link>
      </NextLink>
    </FadeUp>
  );
}

// ─── Feature pill ───────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  const colors = useColors();
  return (
    <FadeUp delay={delay}>
      <HStack
        align="flex-start"
        spacing={4}
        bg={colors.bgCard}
        border="1px solid"
        borderColor={colors.border}
        borderRadius="xl"
        p={5}
        _hover={{ borderColor: colors.gold }}
        transition="border-color 0.2s"
        cursor="default"
      >
        <Box bg={colors.gold} p={2} borderRadius="lg" color="white" mt={0.5}>
          <Icon size={18} />
        </Box>
        <VStack align="flex-start" spacing={1} flex={1}>
          <Text fontWeight="600" fontSize="sm" color={colors.textPrimary}>{title}</Text>
          <Text fontSize="xs" color={colors.textMuted} lineHeight="1.6">{description}</Text>
        </VStack>
      </HStack>
    </FadeUp>
  );
}

// ─── Submarket pill ─────────────────────────────────────────────────────────
function SubmarketCard({ name, note, delay = 0 }) {
  const colors = useColors();
  return (
    <FadeUp delay={delay}>
      <NextLink href="/insights" passHref legacyBehavior>
        <Link
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={5}
          py={3}
          bg={colors.bgCard}
          border="1px solid"
          borderColor={colors.border}
          borderRadius="lg"
          _hover={{ borderColor: colors.gold, textDecoration: 'none' }}
          transition="border-color 0.2s"
          style={{ textDecoration: 'none' }}
        >
          <Text fontSize="sm" fontWeight="500" color={colors.textPrimary}>{name}</Text>
          <Box color={colors.gold}><FiArrowRight size={14} /></Box>
        </Link>
      </NextLink>
    </FadeUp>
  );
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
function Testimonial({ quote, author, role, delay = 0 }) {
  const colors = useColors();
  return (
    <FadeUp delay={delay}>
      <Box bg={colors.bgCard} border="1px solid" borderColor={colors.border} borderRadius="xl" p={6} position="relative">
        <Box position="absolute" top={-3} left={6} fontSize="6xl" color={colors.gold} opacity={0.3} lineHeight={1}>"</Box>
        <Text fontSize="sm" color={colors.textMuted} lineHeight="1.8" fontStyle="italic" mb={4}>
          {quote}
        </Text>
        <Divider borderColor={colors.border} mb={3} />
        <HStack spacing={3}>
          <Box w={8} h={8} borderRadius="full" bg={colors.gold} display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="xs" fontWeight="700" color="white">{author.charAt(0)}</Text>
          </Box>
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="xs" fontWeight="600" color={colors.textPrimary}>{author}</Text>
            <Text fontSize="xs" color={colors.textSubtle}>{role}</Text>
          </VStack>
        </HStack>
      </Box>
    </FadeUp>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function HomePage({ insights = [] }) {
  const colors = useColors();
  const { colorMode } = useColorMode();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.calgaryofficeadvisors.com';

  return (
    <>
      <NextSeo
        title="Calgary Office Advisors | Office Space for Lease Calgary"
        description="Find office space for lease in Calgary with Calgary Office Advisors. Browse buildings, get market rates, and connect with a tenant-focused broker. For Calgary's builders."
        canonical={siteUrl}
        openGraph={{
          title: 'Calgary Office Advisors | Office Space for Lease Calgary',
          description: 'Find office space for lease in Calgary with Calgary Office Advisors. Browse buildings, get market rates, and connect with a tenant-focused broker.',
          url: siteUrl,
          images: [{ url: `${siteUrl}/images/og-default.jpg` }],
        }}
      />

      <Layout>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Box
          minH="92vh"
          display="flex"
          alignItems="center"
          position="relative"
          overflow="hidden"
          bg={colors.bgPrimary}
        >
          {/* Subtle grid background */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.03}
            backgroundImage="radial-gradient(circle, currentColor 1px, transparent 1px)"
            backgroundSize="40px 40px"
            pointerEvents="none"
          />
          {/* Gold gradient glow */}
          <Box
            position="absolute"
            top="-20%"
            right="-10%"
            w="60%"
            h="60%"
            bg="radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)"
            pointerEvents="none"
          />

          <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
            <VStack align="flex-start" spacing={6} maxW="760px">

              <FadeUp>
                <Badge
                  bg={colors.gold}
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="600"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  Tenant Representation — Calgary
                </Badge>
              </FadeUp>

              <FadeUp delay={80}>
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                  lineHeight="1.05"
                  letterSpacing="-0.02em"
                >
                  Office space intelligence.{' '}
                  <Text as="span" color={colors.gold}>For Calgary's builders.</Text>
                </Heading>
              </FadeUp>

              <FadeUp delay={160}>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={colors.textMuted}
                  maxW="580px"
                  lineHeight="1.7"
                >
                  We track every significant office lease transaction in Calgary. Our market intelligence helps businesses find the right space at the right economics — without the guesswork.
                </Text>
              </FadeUp>

              <FadeUp delay={240}>
                <HStack spacing={4} pt={2} flexWrap="wrap">
                  <NextLink href="/insights" passHref legacyBehavior>
                    <Link
                      display="inline-flex"
                      alignItems="center"
                      gap={2}
                      px={6}
                      py={3}
                      bg={colors.gold}
                      color="white"
                      borderRadius="md"
                      fontWeight="600"
                      fontSize="sm"
                      _hover={{ opacity: 0.9, textDecoration: 'none' }}
                      style={{ textDecoration: 'none' }}
                    >
                      Explore Market Insights <FiArrowRight size={16} />
                    </Link>
                  </NextLink>
                  <NextLink href="/guides" passHref legacyBehavior>
                    <Link
                      display="inline-flex"
                      alignItems="center"
                      gap={2}
                      px={6}
                      py={3}
                      bg={colors.bgCard}
                      color={colors.textPrimary}
                      border="1px solid"
                      borderColor={colors.border}
                      borderRadius="md"
                      fontWeight="600"
                      fontSize="sm"
                      _hover={{ borderColor: colors.gold, textDecoration: 'none' }}
                      style={{ textDecoration: 'none' }}
                    >
                      Free Leasing Guide <FiBookOpen size={16} />
                    </Link>
                  </NextLink>
                </HStack>
              </FadeUp>

            </VStack>
          </Container>
        </Box>

        {/* ── Stats bar ───────────────────────────────────────────────────── */}
        <Box bg={colors.bgCard} borderY="1px solid" borderColor={colors.border} py={8}>
          <Container maxW="1200px" px={{ base: 4, md: 8 }}>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              <Stat value="300+" label="Transactions Tracked" />
              <Stat value="6" label="Submarkets Covered" />
              <Stat value="2026" label="Current Market Data" />
              <Stat value="$0" label="Cost to Access Insights" />
            </SimpleGrid>
          </Container>
        </Box>

        {/* ── Featured insights ──────────────────────────────────────────── */}
        <Box py={{ base: 16, lg: 24 }} bg={colors.bgPrimary}>
          <Container maxW="1200px" px={{ base: 4, md: 8 }}>
            <VStack align="flex-start" spacing={2} mb={10}>
              <FadeUp>
                <Text fontSize="xs" fontWeight="600" color={colors.gold} letterSpacing="0.12em" textTransform="uppercase">
                  Latest from the market
                </Text>
              </FadeUp>
              <FadeUp delay={60}>
                <Heading
                  as="h2"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  Market insights & guides
                </Heading>
              </FadeUp>
              <FadeUp delay={120}>
                <NextLink href="/insights" passHref legacyBehavior>
                  <Link
                    fontSize="sm"
                    color={colors.gold}
                    fontWeight="500"
                    _hover={{ textDecor: 'underline' }}
                    style={{ textDecoration: 'none' }}
                  >
                    View all insights →
                  </Link>
                </NextLink>
              </FadeUp>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {insights.slice(0, 3).map((post, i) => (
                <InsightCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  delay={i * 80}
                />
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* ── Why section ─────────────────────────────────────────────────── */}
        <Box py={{ base: 16, lg: 24 }} bg={colors.bgSecondary}>
          <Container maxW="1200px" px={{ base: 4, md: 8 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 12, lg: 20 }} alignItems="center">

              {/* Left: copy */}
              <VStack align="flex-start" spacing={6}>
                <FadeUp>
                  <Text fontSize="xs" fontWeight="600" color={colors.gold} letterSpacing="0.12em" textTransform="uppercase">
                    Why Calgary Office Advisors
                  </Text>
                </FadeUp>
                <FadeUp delay={80}>
                  <Heading
                    as="h2"
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                    lineHeight="1.2"
                  >
                    Tenant representation.{' '}
                    <Text as="span" color={colors.gold}>Always.</Text>
                  </Heading>
                </FadeUp>
                <FadeUp delay={160}>
                  <Text color={colors.textMuted} lineHeight="1.8" fontSize="md">
                    Most CRE brokers represent landlords. We represent tenants. That means our loyalty is to your interests — not the building owner's. We track the Calgary market so you don't have to guess whether you're getting a fair deal.
                  </Text>
                </FadeUp>
                <FadeUp delay={240}>
                  <VStack align="flex-start" spacing={3} pt={2}>
                    {[
                      'Track every significant Calgary office lease transaction',
                      'Negotiate TI allowances, free rent, and operating cost caps',
                      'Compare buildings and submarkets with real market data',
                      'No landlord-side conflicts — ever',
                    ].map((item, i) => (
                      <HStack key={i} align="flex-start" spacing={3}>
                        <Box color={colors.gold} mt={0.5}><FiCheckCircle size={15} /></Box>
                        <Text fontSize="sm" color={colors.textMuted}>{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </FadeUp>
              </VStack>

              {/* Right: features bento grid */}
              <SimpleGrid columns={2} spacing={4}>
                <FeatureCard
                  icon={FiMapPin}
                  title="Local Market Intelligence"
                  description="Every significant transaction across all Calgary submarkets, tracked in real time."
                  delay={100}
                />
                <FeatureCard
                  icon={FiTrendingUp}
                  title="Lease Rate Transparency"
                  description="Actual closing rates — not asking rents — so you negotiate from real data."
                  delay={180}
                />
                <FeatureCard
                  icon={FiShield}
                  title="Conflict-Free Representation"
                  description="We only represent tenants. Our interest is aligned with yours."
                  delay={260}
                />
                <FeatureCard
                  icon={FiClock}
                  title="No Obligation"
                  description="Initial consultations are free. You decide if we're the right fit."
                  delay={340}
                />
              </SimpleGrid>

            </SimpleGrid>
          </Container>
        </Box>

        {/* ── Calgary submarkets ─────────────────────────────────────────── */}
        <Box py={{ base: 16, lg: 24 }} bg={colors.bgPrimary}>
          <Container maxW="1200px" px={{ base: 4, md: 8 }}>
            <VStack align="flex-start" spacing={2} mb={10}>
              <FadeUp>
                <Text fontSize="xs" fontWeight="600" color={colors.gold} letterSpacing="0.12em" textTransform="uppercase">
                  Where we operate
                </Text>
              </FadeUp>
              <FadeUp delay={60}>
                <Heading
                  as="h2"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontFamily="heading"
                  fontWeight="400"
                  color={colors.textPrimary}
                >
                  Calgary submarkets
                </Heading>
              </FadeUp>
              <FadeUp delay={120}>
                <Text color={colors.textMuted} fontSize="md" maxW="500px">
                  Deep coverage across Calgary's office districts — from downtown core to suburban business parks.
                </Text>
              </FadeUp>
            </VStack>

            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
              {[
                { name: 'Downtown Calgary', note: 'Financial core, Stephen Ave' },
                { name: 'Beltline', note: '17th Ave, urban, walkable' },
                { name: 'East Village', note: 'Library district, mixed-use' },
                { name: 'South East', note: 'Quarry Park, industrial' },
                { name: 'South West', note: 'Aspen Woods, suburban premium' },
                { name: 'North Calgary', note: 'Growing suburban market' },
              ].map((s, i) => (
                <SubmarketCard key={s.name} name={s.name} note={s.note} delay={i * 60} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* ── Guide CTA ──────────────────────────────────────────────────── */}
        <Box py={{ base: 16, lg: 24 }} bg={colors.bgCard} borderY="1px solid" borderColor={colors.border}>
          <Container maxW="800px" px={{ base: 4, md: 8 }} textAlign="center">
            <FadeUp>
              <Box
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={3}
                py={1}
                bg={colors.bgPrimary}
                border="1px solid"
                borderColor={colors.border}
                borderRadius="full"
                mb={6}
              >
                <FiBookOpen size={14} color={colors.gold} />
                <Text fontSize="xs" color={colors.textMuted}>Free resource</Text>
              </Box>
            </FadeUp>
            <FadeUp delay={80}>
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontFamily="heading"
                fontWeight="400"
                color={colors.textPrimary}
                mb={4}
              >
                Office Leasing 101: The Calgary Guide
              </Heading>
            </FadeUp>
            <FadeUp delay={160}>
              <Text color={colors.textMuted} fontSize="md" mb={8} maxW="560px" mx="auto" lineHeight="1.7">
                22 pages covering lease rates, key terms, tenant rep value, and how to search for office space in Calgary. Free PDF download.
              </Text>
            </FadeUp>
            <FadeUp delay={240}>
              <HStack spacing={4} justify="center" flexWrap="wrap">
                <NextLink href="/guides" passHref legacyBehavior>
                  <Link
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    px={6}
                    py={3}
                    bg={colors.gold}
                    color="white"
                    borderRadius="md"
                    fontWeight="600"
                    fontSize="sm"
                    _hover={{ opacity: 0.9, textDecoration: 'none' }}
                    style={{ textDecoration: 'none' }}
                  >
                    Download Free Guide <FiArrowRight size={16} />
                  </Link>
                </NextLink>
                <NextLink href="/contact" passHref legacyBehavior>
                  <Link
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    px={6}
                    py={3}
                    bg={colors.bgPrimary}
                    color={colors.textPrimary}
                    border="1px solid"
                    borderColor={colors.border}
                    borderRadius="md"
                    fontWeight="600"
                    fontSize="sm"
                    _hover={{ borderColor: colors.gold, textDecoration: 'none' }}
                    style={{ textDecoration: 'none' }}
                  >
                    Talk to a Broker
                  </Link>
                </NextLink>
              </HStack>
            </FadeUp>
          </Container>
        </Box>

        {/* ── Trust / about ──────────────────────────────────────────────── */}
        <Box py={{ base: 16, lg: 24 }} bg={colors.bgPrimary}>
          <Container maxW="1200px" px={{ base: 4, md: 8 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 10, lg: 20 }} alignItems="center">

              {/* Left: quote / credibility */}
              <FadeUp>
                <VStack align="flex-start" spacing={6}>
                  <Text fontSize="xs" fontWeight="600" color={colors.gold} letterSpacing="0.12em" textTransform="uppercase">
                    About Calgary Office Advisors
                  </Text>
                  <Heading
                    as="h2"
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontFamily="heading"
                    fontWeight="400"
                    color={colors.textPrimary}
                    lineHeight="1.2"
                  >
                    Built for Calgary's builders.
                  </Heading>
                  <Text color={colors.textMuted} lineHeight="1.8" fontSize="md">
                    We believe Calgary businesses deserve better market intelligence when making lease decisions. Our model is simple: track every significant transaction, publish what we learn, and represent tenants — not landlords.
                  </Text>
                  <Text color={colors.textMuted} lineHeight="1.8" fontSize="md">
                    For businesses looking for office space in Calgary, we offer what no landlord's broker can: an independent, data-driven view of the market, focused entirely on your interests.
                  </Text>
                  <NextLink href="/about" passHref legacyBehavior>
                    <Link
                      fontSize="sm"
                      color={colors.gold}
                      fontWeight="500"
                      _hover={{ textDecor: 'underline' }}
                      style={{ textDecoration: 'none' }}
                    >
                      Learn more about us →
                    </Link>
                  </NextLink>
                </VStack>
              </FadeUp>

              {/* Right: value props */}
              <FadeUp delay={100}>
                <VStack spacing={4} align="stretch">
                  <Box bg={colors.bgCard} border="1px solid" borderColor={colors.border} borderRadius="xl" p={6}>
                    <Text fontWeight="600" fontSize="sm" color={colors.textPrimary} mb={2}>
                      For Business Owners
                    </Text>
                    <Text fontSize="xs" color={colors.textMuted} lineHeight="1.7">
                      Whether you're leasing 500 square feet or 50,000, we help you understand the market, find the right space, and negotiate better terms.
                    </Text>
                  </Box>
                  <Box bg={colors.bgCard} border="1px solid" borderColor={colors.border} borderRadius="xl" p={6}>
                    <Text fontWeight="600" fontSize="sm" color={colors.textPrimary} mb={2}>
                      For Startups & Growth Companies
                    </Text>
                    <Text fontSize="xs" color={colors.textMuted} lineHeight="1.7">
                      We help growing companies navigate their first — or next — office lease. Understand your options before you sign.
                    </Text>
                  </Box>
                  <Box bg={colors.bgCard} border="1px solid" borderColor={colors.border} borderRadius="xl" p={6}>
                    <Text fontWeight="600" fontSize="sm" color={colors.textPrimary} mb={2}>
                      For Companies Relocating
                    </Text>
                    <Text fontSize="xs" color={colors.textMuted} lineHeight="1.7">
                      Moving to Calgary or relocating within the city? We know every building and every submarket — and we'll help you find the right fit.
                    </Text>
                  </Box>
                </VStack>
              </FadeUp>

            </SimpleGrid>
          </Container>
        </Box>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <Box py={12} borderTop="1px solid" borderColor={colors.border} bg={colors.bgSecondary}>
          <Container maxW="1200px" px={{ base: 4, md: 8 }}>
            <HStack justify="space-between" flexWrap="wrap" spacing={4}>
              <VStack align="flex-start" spacing={1}>
                <Text fontWeight="700" fontSize="sm" color={colors.textPrimary}>
                  Calgary Office Advisors
                </Text>
                <Text fontSize="xs" color={colors.textSubtle}>
                  Tenant Representation — Calgary, Alberta
                </Text>
              </VStack>
              <HStack spacing={6} flexWrap="wrap">
                {[
                  { label: 'Insights', href: '/insights' },
                  { label: 'Guides', href: '/guides' },
                  { label: 'Buildings', href: '/buildings' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <NextLink key={link.href} href={link.href} passHref legacyBehavior>
                    <Link fontSize="xs" color={colors.textSubtle} _hover={{ color: colors.gold }} style={{ textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </NextLink>
                ))}
              </HStack>
            </HStack>
            <Text fontSize="xs" color={colors.textSubtle} mt={6} textAlign="center">
              © 2026 Calgary Office Advisors. All rights reserved.
            </Text>
          </Container>
        </Box>

      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // Load latest insights for the homepage
  let insights = [];
  try {
    const { getAllInsights } = require('../lib/insights');
    insights = (getAllInsights() || []).slice(0, 6).map((i) => ({
      title: i.title,
      slug: i.slug,
      excerpt: i.excerpt || '',
      date: i.date,
    }));
  } catch (e) {
    // If insights lib not available, return empty
  }
  return { props: { insights }, revalidate: 60 };
}
