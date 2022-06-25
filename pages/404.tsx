import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function FourOhFour() {
  return (
    <>
      <Heading as="h1">😯 Oops, this page does not exist</Heading>
      <Link as={NextLink} href="/">
        Go back home
      </Link>
    </>
  );
}
