import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
import CartDrawer from "@/components/ecommerce/CartDrawer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hemolab - Laboratório de Análises Clínicas",
    default: "Hemolab — Precisão e Cuidado com sua Saúde",
  },
  description:
    "O Hemolab é referência em análises clínicas em Bacabal-MA. Exames laboratoriais confiáveis, tecnologia de ponta e atendimento humanizado. Resultados online, coleta domiciliar, compre exames online.",
  keywords: [
    "laboratório",
    "análises clínicas",
    "exames",
    "Bacabal",
    "Maranhão",
    "Hemolab",
    "exame de sangue",
    "toxicológico",
    "coleta domiciliar",
    "comprar exames online",
    "check-up",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.hemolabma.com.br",
    siteName: "Hemolab",
    title: "Hemolab — Precisão e Cuidado com sua Saúde",
    description:
      "Referência em análises clínicas em Bacabal-MA. Tecnologia, precisão e cuidado.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
