import React, { useEffect, useState } from "react";

function WertIntergration({ wertApiKey }) {
  useEffect(() => {
    if (!window.WERT) {
      const script = document.createElement("script");
      script.src = "https://widget.wert.io/sdk.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.WERT) {
          window.WERT("init", wertApiKey);
        }
      };
    } else {
      window.WERT("init", wertApiKey);
    }
  }, [wertApiKey]);

  return (
    <div>
      <div className="wert-nft-module" data-type="grid" data-width="100%"></div>
    </div>
  );
}

export default WertIntergration;
