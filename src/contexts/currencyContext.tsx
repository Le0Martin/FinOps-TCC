import { createContext, useContext, useEffect, useState } from "react";

interface Currency {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

interface CurrencyContextData {
  currency: Currency | null;
  isLoading: boolean;
  isError: boolean;
}

interface CurrencyProviderProps {
  children: React.ReactNode;
}

const CurrencyContext = createContext<CurrencyContextData>({
  currency: null,
  isLoading: true,
  isError: false,
});

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://economia.awesomeapi.com.br/json/last/USD-BRL"
        );
        const data = await response.json();
        setCurrency(data.USDBRL);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, isLoading, isError }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
