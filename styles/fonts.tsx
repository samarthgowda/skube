import { Global } from "@emotion/react";

function Fonts() {
  return (
    <Global
      styles={`
      /* latin */
      @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/IBMPlexSans-Regular.woff2') format('woff2');
      }
      @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/IBMPlexSans-Medium.woff2') format('woff2');
      }
      @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/IBMPlexSans-SemiBold.woff2') format('woff2');
      }
      @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/IBMPlexSans-Bold.woff2') format('woff2');
      }
      `}
    />
  );
}

export default Fonts;
