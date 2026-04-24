import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorMode,
  Stack,
  Text,
  Container,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiPhone } from 'react-icons/fi';

const NavLink = ({ href, children, isActive, colorMode }) => {
  const activeColor = colorMode === 'light' ? 'navy.900' : '#e8edf3';
  const inactiveColor = colorMode === 'light' ? 'navy.600' : '#9fb3c8';

  return (
    <NextLink href={href} passHref legacyBehavior>
      <Box
        as="a"
        position="relative"
        px={4}
        py={2}
        fontSize="sm"
        fontWeight="500"
        letterSpacing="0.05em"
        textTransform="uppercase"
        color={isActive ? activeColor : inactiveColor}
        transition="all 0.3s"
        _hover={{
          color: activeColor,
        }}
        _after={{
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: isActive ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
          width: '20px',
          height: '2px',
          bg: 'navy.600',
          transition: 'transform 0.3s ease',
        }}
        sx={{
          '&:hover::after': {
            transform: 'translateX(-50%) scaleX(1)',
          },
        }}
      >
        {children}
      </Box>
    </NextLink>
  );
};

const MobileNavLink = ({ href, children, onClick, colorMode, isActive }) => {
  const defaultColor = colorMode === 'light' ? 'navy.800' : '#e8edf3';
  const activeColor = 'navy.600';
  const linkColor = isActive ? activeColor : defaultColor;

  return (
    <NextLink href={href} passHref legacyBehavior>
      <Box
        as="a"
        display="block"
        w="100%"
        py={4}
        pl={0}
        pr={0}
        fontSize="2xl"
        fontFamily="heading"
        fontWeight="400"
        color={linkColor}
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? 'navy.100' : '#3e4c5a'}
        onClick={onClick}
        transition="color 0.2s"
        _hover={{ color: activeColor }}
      >
        {children}
      </Box>
    </NextLink>
  );
};

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/insights', label: 'Companies' },
    { href: '/buildings', label: 'Buildings' },
    { href: '/coworking', label: 'Coworking' },
    { href: '/references', label: 'References' },
    { href: '/contact', label: 'Contact' },
    { href: '/guides', label: 'Free Guides' },
  ];

  // Solid background so title and links are always readable (e.g. over dark homepage hero)
  const bgColor = {
    light: 'white',
    dark: 'navy.900',
  };
  const showBorder = scrolled;

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bgColor[colorMode]}
      borderBottom={showBorder ? '1px solid' : 'none'}
      borderColor={colorMode === 'light' ? 'navy.100' : '#3e4c5a'}
      transition="all 0.3s ease"
    >
      <Container maxW="1400px" px={{ base: 4, md: 8, lg: 12 }}>
        <Flex h="80px" alignItems="center" justifyContent="space-between">
          <NextLink href="/" passHref legacyBehavior>
            <Box
              as="a"
              display="flex"
              alignItems="center"
              cursor="pointer"
              transition="opacity 0.2s"
              _hover={{ opacity: 0.8 }}
            >
              <Text
                fontFamily="heading"
                fontSize="xl"
                fontWeight="400"
                color={colorMode === 'light' ? 'navy.900' : '#e8edf3'}
                letterSpacing="-0.02em"
              >
                Calgary Office Advisors
              </Text>
            </Box>
          </NextLink>

          <HStack spacing={0} display={{ base: 'none', lg: 'flex' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={router.pathname === link.href || (link.href !== '/' && router.pathname.startsWith(link.href))}
                colorMode={colorMode}
              >
                {link.label}
              </NavLink>
            ))}
          </HStack>

          <HStack spacing={3} display={{ base: 'none', lg: 'flex' }}>
            <Link href="tel:+15874320012" _hover={{ textDecoration: 'none' }}>
              <Button
                size="sm"
                leftIcon={<FiPhone />}
                variant="outline"
                borderColor={colorMode === 'light' ? 'navy.300' : 'whiteAlpha.4'}
                color={colorMode === 'light' ? 'navy.900' : 'white'}
                fontSize="sm"
                fontWeight="600"
                _hover={{
                  bg: colorMode === 'light' ? 'navy.50' : 'whiteAlpha.1',
                }}
              >
                (587) 432-0012
              </Button>
            </Link>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              size="sm"
              onClick={toggleColorMode}
            />
          </HStack>

          <HStack display={{ base: 'flex', lg: 'none' }} spacing={2}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              size="sm"
              onClick={toggleColorMode}
            />
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon boxSize={6} />}
              variant="ghost"
              onClick={onOpen}
            />
          </HStack>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bg={colorMode === 'light' ? 'white' : '#0a1118'}>
          <DrawerCloseButton size="lg" mt={4} mr={4} color={colorMode === 'light' ? 'navy.800' : '#e8edf3'} />
          <DrawerBody pt={20} px={8}>
            <Stack spacing={0} align="stretch" w="100%">
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  colorMode={colorMode}
                  isActive={router.pathname === link.href || (link.href !== '/' && router.pathname.startsWith(link.href))}
                >
                  {link.label}
                </MobileNavLink>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navigation;
