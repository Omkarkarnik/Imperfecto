import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from './analytics';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Imperfecto",
  description: "ImPerfect.ai helps you refine your text content by providing AI-driven suggestions for improvement.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="16x16" type="image/png" />
      </head>
      <body className={inter.className}>{children}
      <Analytics trackingId="G-MC9VJ7KV3H"/>
      </body>
    </html>
  );
}
