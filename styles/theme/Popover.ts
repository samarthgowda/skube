import { popoverAnatomy } from "@chakra-ui/anatomy";

const Popover = {
  parts: popoverAnatomy.keys,
  baseStyle: {
    body: {
      boxShadow: "xl",
      rounded: "lg",
    },
  },
  defaultProps: {},
};

export default Popover;
