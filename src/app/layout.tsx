import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./Component/theme-provide";
import Header from "./Component/header";
import Footer from "./Component/footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark transition-colors duration-100">
        <Header />
        <ThemeProvider /> {children}
        <Footer />
      </body>
    </html>
  );
}
