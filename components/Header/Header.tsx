import { Box, Button, Flex, HStack, IconButton, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import Connect from "components/Connect";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoDiamond, IoLogoTwitter } from "react-icons/io5";

import Logo from "../Logo";

const LINKS = [
  {
    name: "Profile",
    to: "/profile",
  },
  {
    name: "Badge",
    to: "/badge",
  },
  {
    name: "Job",
    to: "/job",
  },
];

function NavTabs() {
  const router = useRouter();

  return (
    <HStack ml={2} alignItems="center" flexGrow={1}>
      {(LINKS || []).map((link) => {
        const current = router.pathname === link.to;
        return (
          <NextLink key={link.name} href={link.to} passHref>
            <Button
              size="sm"
              colorScheme="white"
              bgGradient={
                current
                  ? "linear(to-l, blue.400, primary.400)"
                  : "linear(to-l, gray.400, gray.400)"
              }
              bgClip="text"
              _hover={{ color: "gray.600" }}
              fontWeight={600}
              fontSize="lg"
            >
              {link.name}
            </Button>
          </NextLink>
        );
      })}
    </HStack>
  );
}

function NavBarContainer({ children, ...props }) {
  return (
    <Flex
      as="nav"
      align="center"
      gap={2}
      flexDirection={{ base: "column", md: "row" }}
      w="100%"
      mx="auto"
      px={4}
      py={2}
      {...props}
    >
      {children}
    </Flex>
  );
}

const NAVMORE = [
  {
    icon: IoDiamond,
    name: "Twitter",
    href: "/twitter",
  },
  {
    icon: IoDiamond,
    name: "Discord",
    href: "/discord",
  },
  {
    icon: IoDiamond,
    name: "About",
    href: "/about",
  },
  {
    icon: IoDiamond,
    name: "Privacy",
    href: "/twitter",
  },
  {
    icon: IoDiamond,
    name: "Contact",
    href: "mailto:samarth@skube.xyz",
  },
];

function NavMore() {
  return (
    <Box>
      <NextLink href="/twitter" passHref>
        <Link target="_blank" rel="noopener noreferrer">
          <IconButton
            colorScheme="twitter"
            variant="ghost"
            aria-label="twitter"
            size="lg"
            icon={<IoLogoTwitter />}
          />
        </Link>
      </NextLink>
      {/* <Menu>
        <MenuButton
          as={IconButton}
          aria-label="More"
          icon={<IoEllipsisHorizontal />}
          size="lg"
          colorScheme="white"
          bgColor="white"
          color="pink.500"
          borderWidth="2px"
          borderColor="white"
          _hover={{ borderColor: "pink.100" }}
        />
        <MenuList shadow="lg" border="none" p={1}>
          {(NAVMORE || []).map((navlink) => {
            const NavIcon = navlink.icon;
            return (
              <NextLink href={navlink.href} passHref key={navlink.name}>
                <MenuItem
                  _hover={{ textDecoration: "none", color: "gray.800" }}
                  fontWeight={600}
                  color="gray.600"
                  fontSize="md"
                  rounded="sm"
                  py={2}
                  icon={
                    <Icon
                      as={NavIcon}
                      fontSize="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    />
                  }
                >
                  {navlink.name}
                </MenuItem>
              </NextLink>
            );
          })}
        </MenuList>
      </Menu> */}
    </Box>
  );
}

function NavBar(props) {
  return (
    <Box my={1}>
      <NavBarContainer {...props}>
        <Logo />
        <NavTabs />
        <Flex align="center" gap={2}>
          <ConnectButton />
          <NavMore />
        </Flex>
      </NavBarContainer>
    </Box>
  );
}

export default NavBar;
