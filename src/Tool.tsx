import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ measureViewportActive }, updateGlobals] = useGlobals();
  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        measureViewportActive: measureViewportActive ? undefined : true,
      }),
    [measureViewportActive]
  );
  return (
    <IconButton
      key={TOOL_ID}
      active={measureViewportActive}
      title="Measure viewport"
      onClick={toggleMyTool}
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg" 
      >
            <rect
              id="outerFrame"
              stroke="currentColor"
              fill="transparent"
              strokeWidth="80"
              strokeLinejoin="round"
              x="103"
              y="167"
              width="818"
              height="690"
            ></rect>
            <g
              id="vBar"
              transform="translate(263.000000, 167.000000)"
              fill="currentColor"
            >
              <rect
                id="verticalBar"
                x="80"
                y="0"
                width="80"
                height="490"
              ></rect>
              <rect
                id="verticalBarCap"
                x="0"
                y="450"
                width="240"
                height="80"
                rx="40"
              ></rect>
            </g>
            <g
              id="hBar"
              transform="translate(103.000000, 327.000000)"
              fill="currentColor"
            >
              <rect
                id="horizontalBarCap"
                x="578"
                y="0"
                width="80"
                height="240"
                rx="40"
              ></rect>
              <rect
                id="horizontalBar"
                x="0"
                y="80"
                width="618"
                height="80"
              ></rect>
            </g>
      </svg>
    </IconButton>
  );
};


