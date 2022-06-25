import { menuAnatomy } from "@chakra-ui/anatomy";

const Menu = {
  parts: menuAnatomy.keys,
  baseStyle: {
    menulist: {
      boxShadow: "lg",
    },
    menuitem: {
      fontWeight: 800,
    },
  },
  defaultProps: {},
};

export default Menu;
