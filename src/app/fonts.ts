import localFont from "next/font/local";
import { Inter, Space_Grotesk } from "next/font/google";

const useLocalFonts = process.env.NEXT_USE_LOCAL_FONTS === "true";

const localInter = localFont({
  src: "../../public/fonts/Inter-Variable.woff2",
  preload: true,
  display: "swap",
  variable: "--font-sans",
});

const localSpaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk-Variable.woff2",
  preload: true,
  display: "swap",
  variable: "--font-display",
});

const googleInter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const googleSpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const inter = useLocalFonts ? localInter : googleInter;
export const spaceGrotesk = useLocalFonts ? localSpaceGrotesk : googleSpaceGrotesk;
