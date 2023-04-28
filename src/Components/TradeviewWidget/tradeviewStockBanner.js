import React, { useEffect, useRef } from "react";

export default function SymbolInfoWidget(props) {
  const containerRef = useRef();

  const widgetConfig = {
    width: "100%",
    symbol: props.symbol ? `NASDAQ:${props.symbol}` : "NASDAQ:AAPL",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
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
