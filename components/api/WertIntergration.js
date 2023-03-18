import React, { useEffect, useState } from "react";
import { WidgetInitializer } from "@wert-io/widget-initializer";
import { Button } from "@mui/material";
function WertIntergration() {
  // useEffect(() => {
  //   const widgetInitializer = new WidgetInitializer(apiKey);
  //   widgetInitializer.init();
  // }, [apiKey]);

  return (
    <div>
      <div className="wert-nft-module" data-type="grid" data-width="100%">
        <Button>CLick to see how wert work</Button>
      </div>
    </div>
  );
}

export default WertIntergration;
