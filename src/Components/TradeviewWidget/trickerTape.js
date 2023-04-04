import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TickerTape() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (window.TradingView) {
        new window.TradingView.widget({
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
          colorTheme: "dark",
          isTransparent: false,
          displayMode: "adaptive",
          locale: "en",
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-disclaimer">
        <span>
          Markets today by
          <a
            href="https://www.tradingview.com/markets/"
            rel="noopener"
            target="_blank"
          >
            TradingView
          </a>
        </span>
      </div>
    </div>
  );
}
