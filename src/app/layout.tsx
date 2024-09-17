import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garden of Data Protection Law",
  description: "Created by Harvey Chiu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className="font-medium">
            <Link href="/">Data Protection Book</Link>
        </h1>
        {children}
        {/* <Script id="footnotes-handler">
          {`
            document.addEventListener('click', function(e) {
              if (e.target.closest('.footnote-ref')) {
                e.preventDefault();
                const footnoteId = e.target.closest('.footnote-ref').getAttribute('href').substring(1);
                const footnoteElement = document.getElementById(footnoteId);
                if (footnoteElement) {
                  footnoteElement.scrollIntoView({ behavior: 'smooth' });
                  footnoteElement.classList.add('highlight');
                  setTimeout(() => footnoteElement.classList.remove('highlight'), 2000);
                }
              }
            });
          `}
        </Script> */}
      </body>
    </html>
  );
}
