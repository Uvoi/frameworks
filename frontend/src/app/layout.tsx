"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import "../styles/globals.css";
import SidePanel from "@/Components/SidePanel/SidePanel";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-background flex">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SidePanel/>
            <main className="p-10">{children}</main>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
