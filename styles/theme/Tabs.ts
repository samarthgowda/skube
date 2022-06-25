const Tabs = {
  parts: ["tab", "tabpanel"],
  baseStyle: {
    tab: {
      fontWeight: 500,
    },
    tabpanel: {
      py: 6,
      px: 0,
    },
  },
  sizes: {
    lg: {
      tab: {
        px: 8,
      },
    },
  },
  defaultProps: {
    size: "lg",
  },
};

export default Tabs;
