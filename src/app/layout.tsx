import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2025键政含金量测试 | 互联网冲浪成分鉴定",
  description: "快来测测你在网络政治圈的身位！2025年度网络热门话题灵魂拷问。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-serif">
        <div className="fixed-background" />
        <div className="mobile-container">
          <div className="mobile-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
