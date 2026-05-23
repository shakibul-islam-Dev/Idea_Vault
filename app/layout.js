import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/Components/Nav/Nav";
import Footer from "@/Components/Footer/Footer";
import "./globals.css";
import ThemeProvider from "@/Components/ThemeProvider/ThemeProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Idea Vault",
  description: "Secure and manage your thoughts dynamically",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${poppins.className} flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={3000}
          />

          <Nav />

          <main className="flex-grow w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
