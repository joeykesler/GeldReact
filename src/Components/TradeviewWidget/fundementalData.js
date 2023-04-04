import React, { useEffect, useRef } from "react";

export default function FundementalData(props) {
  const containerRef = useRef();

  const widgetConfig = {
    colorTheme: "light",
    isTransparent: false,
    largeChartUrl: "",
    displayMode: "regular",
    width: "100%",
    height: 830,
    symbol: props.symbol ? `NASDAQ:${props.symbol}` : "NASDAQ:AAPL",
    locale: "en",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
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
