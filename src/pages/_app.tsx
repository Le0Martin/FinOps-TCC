import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { QuestionProvider } from "@/contexts/questionsContext";
import { CurrencyProvider } from "@/contexts/currencyContext";
import "react-responsive-pagination/themes/classic.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CurrencyProvider>
        <QuestionProvider>
          <Component {...pageProps} />
        </QuestionProvider>
      </CurrencyProvider>
    </ChakraProvider>
  );
}
