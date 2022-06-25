const Modal = {
  parts: [
    "header",
    "overlay",
    "dialogContainer",
    "dialog",
    "closeButton",
    "body",
    "footer",
  ],
  baseStyle: {
    overlay: {
      bg: "blackAlpha.300",
      backdropFilter: "auto",
      backdropBlur: "10px",
    },
    dialog: {
      borderRadius: "xl",
      shadow: "none",
    },
    header: {
      fontSize: "4xl",
    },
    footer: {
      gap: "2",
    },
  },
  defaultProps: {
    size: "xl",
    isCentered: true,
  },
};

export default Modal;
