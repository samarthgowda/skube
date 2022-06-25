import { Box, Link } from "@chakra-ui/react";
import Layout from "components/Layout";

export default function Contact() {
  return (
    <Box>
      Please{" "}
      <Link href="https://twitter.com/skubelabs" color="primary.500">
        reach out on Twitter
      </Link>{" "}
      with any questions or feedback.
    </Box>
  );
}

Contact.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
