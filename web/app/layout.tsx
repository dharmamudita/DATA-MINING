import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import ChatWidget from "../components/ChatWidget";

export const metadata: Metadata = {
  title: "HeartGuard AI — Sistem Prediksi Risiko Penyakit Jantung",
  description:
    "Sistem penapisan klinis dan prediksi risiko penyakit kardiovaskular berbasis Machine Learning (Random Forest & K-Means Clustering) dengan akurasi 89.96%.",
  keywords: [
    "prediksi penyakit jantung",
    "machine learning",
    "random forest",
    "data mining",
    "kesehatan",
    "cdc brfss",
    "firebase auth",
    "asisten ai",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>
        {/* Exact PortalSPPG Top Ambient Crimson Banner */}
        <div className="top-header-banner" />
        <AuthProvider>
          {children}
          {/* Floating AI Medical Assistant Widget */}
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
