// Redux
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "redux/store";
import Fonts from "styles/fonts";
import Notion from "styles/notion";
// UI
import theme from "styles/theme";

const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <Fonts />
          <Notion />
          <Box width="100%" height="100vh" overflow="auto" position="fixed">
            {getLayout(<Component {...pageProps} />)}
          </Box>
        </ChakraProvider>
      </ReduxProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
