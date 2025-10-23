import localFont from "next/font/local";

const inter = localFont({
  src: "./fonts/assets/Inter-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/assets/SpaceGrotesk-Variable.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
});

export { inter, spaceGrotesk };
