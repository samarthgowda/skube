import { Box, Container } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "components/Header";

export default function Layout({
  bare = false,
  maxW = "container.xl",
  px = 4,
  children,
}) {
  return (
    <Box>
      <Box bgColor="gray.50">
        {!bare && <Header />}
        <Container
          maxW={maxW}
          h="100%"
          px={px}
          display="flex"
          flexDirection="column"
        >
          <Box as="main" flexGrow={1}>
            {children}
          </Box>
          {!bare && <Footer />}
        </Container>
      </Box>
    </Box>
  );
}
