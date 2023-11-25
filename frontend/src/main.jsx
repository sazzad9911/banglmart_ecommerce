import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import enTranslation from "../public/en.json";
import bnTranslation from "../public/bn.json";
import i18n from "i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";

import AuthProvider from "./providers/AuthProvider";
import { Provider } from "react-redux";
import store from "./services/store/store";

import { ChakraProvider } from "@chakra-ui/react";
import { router } from "./routes/Routes";

i18n.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translation: enTranslation,
    },
    bn: {
      translation: bnTranslation,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <AuthProvider>
          <div className="bg-BackgroundColor">
            <I18nextProvider i18n={i18n}>
              <RouterProvider router={router} />
            </I18nextProvider>
          </div>
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
