import { Global } from "@emotion/react";

function Notion() {
  return (
    <Global
      styles={`
      /* latin */
      .notion {
        font-family: 'IBM Plex Sans' !important;
        font-size: 17px !important;
      }
      .notion-h1 {
        font-size: 2.3rem !important;
        font-weight: 700 !important;
      }
      .notion-h2 {
        font-size: 1.875rem !important;
      }
      .notion-h3 {
        font-size: 1.5rem !important;
      }
      .notion-h4 {
        font-size: 1.375rem !important;
      }
      `}
    />
  );
}

export default Notion;
