import { Container, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { IoFlash, IoHourglass } from "react-icons/io5";

export default function EmptyState({
  title = "Nothing here! 👋",
  subtitle = null,
  comingSoon = false,
}) {
  return (
    <Container centerContent>
      <VStack p={8}>
        <Icon
          as={comingSoon ? IoFlash : IoHourglass}
          w={16}
          h={16}
          mb={2}
          color="primary.400"
        />
        <Heading as="h4" size="lg" textAlign="center">
          {title}
        </Heading>
        {subtitle && (
          <Text size="sm" fontWeight={500} color="gray.400" lineHeight={1.2}>
            {subtitle}
          </Text>
        )}
      </VStack>
    </Container>
  );
}
