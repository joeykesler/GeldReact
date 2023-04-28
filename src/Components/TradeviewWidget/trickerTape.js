import React, { useEffect, useRef } from "react";

export default function SymbolInfoWidget(props) {
  const containerRef = useRef();

  const widgetConfig = {
    symbols: [
      {
        proName: "FOREXCOM:SPXUSD",
        title: "S&P 500",
      },
      {
        proName: "FOREXCOM:NSXUSD",
        title: "US 100",
      },
      {
        proName: "FX_IDC:EURUSD",
        title: "EUR/USD",
      },
      {
        proName: "BITSTAMP:BTCUSD",
        title: "Bitcoin",
      },
      {
        proName: "BITSTAMP:ETHUSD",
        title: "Ethereum",
      },
    ],
    showSymbolLogo: true,
    colorTheme: "light",
    isTransparent: false,
    displayMode: "adaptive",
    locale: "en",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    script.innerHTML = JSON.stringify(widgetConfig);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [props.symbol]);

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  );
}
