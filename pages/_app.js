import "../styles/globals.css";
import React from "react";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { NotificationsProvider } from "@mantine/notifications";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "@/utils/store";
export default function App(props) {
  const { Component, pageProps } = props;
  let persistor = persistStore(store);
  const [colorScheme, setColorScheme] = React.useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <>
      <Head>
        <title>Fashion and Fabrics</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              emotionOptions={{ key: "mantine", prepend: false }}
              theme={{ colorScheme }}
            >
              <NotificationsProvider autoClose={4000}>
                <Component {...pageProps} />
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
