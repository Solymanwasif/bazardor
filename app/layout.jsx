
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body
  suppressHydrationWarning
  className="min-h-screen flex flex-col"
>
  <AuthProvider>
    <Suspense fallback={<div className="h-20 bg-white" />}>
    <Navbar />
   </Suspense>
 
    <Toaster />

    <div className="flex-1 flex flex-col">
      {children}
    </div>

    <Footer />
  </AuthProvider>
</body>
    </html>
  );
}
