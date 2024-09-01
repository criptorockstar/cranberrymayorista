import "@/assets/styles/globals.css";
import "@/assets/styles/icomoon.css";
import { NextUIProvider } from "@nextui-org/react";
import { fonts } from "@/constants";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("./StoreProvider"), {
  ssr: false
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={fonts.manrope.className}>
        <NextUIProvider>
          <ReduxProvider>
            <main className="grid overflow-auto space-y-0">
              {children}
            </main>
          </ReduxProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

export default RootLayout
