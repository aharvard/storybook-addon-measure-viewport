import {
  StoryFn,
  useEffect,
  useGlobals,
  useParameter,
} from "@storybook/addons";

type Params = {
  color: string;
  height: {
    color: string;
    display: "left" | "middle" | "right" | "none";
    measure: "clientHeight" | "innerHeight";
  };
  width: {
    color: string;
    display: "top" | "middle" | "bottom" | "none";
    measure: "clientWidth" | "innerWidth";
  };
};

const style = `#measureViewport {
  position: fixed;
  padding: 0;
  margin: 0;
  border-radius: 3px;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
  user-select: none;
  mix-blend-mode: multiply;
}
.measure {
  position: absolute;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  letter-spacing: 0.05ch;
  font-weight: bold;
  color: var(--color);
  font-size: 1rem;
  block-size: 12px;
  margin-block: 10px;
}
.measure--width {
  left: 0;
  right: 0;
  background-image: 
    repeating-linear-gradient(
      transparent, 
      transparent 6px, 
      currentColor 6px, 
      currentColor 7px, 
      transparent 7px
    ),
    repeating-linear-gradient(
        90deg,
        transparent, 
        transparent 16px, 
        currentColor 17px, 
        transparent 17px,
        transparent 20px
    );
}
.measure--width.measure--top {
  top: 0;
}
.measure--width.measure--middle {
  top: calc(50vh - 1rem);
  z-index: -1;
}
.measure--width.measure--bottom {
  bottom: 0;
}
.measure--width.measure--none {
  display: none;
}
.measure--height {
  top: 0;
  bottom: 0;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent, 
      transparent 6px, 
      currentColor 6px, 
      currentColor 7px, 
      transparent 7px
    ),
    repeating-linear-gradient(
        transparent, 
        transparent 16px, 
        currentColor 17px, 
        transparent 17px,
        transparent 20px
    );
}
.measure--height.measure--left {
  left: 0;
}
.measure--height.measure--middle {
  left: calc(50vw - 1rem);
}
.measure--height.measure--right {
  right: 0;
}
.measure--height.measure--none {
  display: none;
}
.measure-text {
  flex: 0 0 auto;
  padding-inline: 0.25rem;
  padding-block: 0.125rem 0.25rem;
  background: #fff;
}
.measure--prevent-overlap {
  justify-content: flex-start;
}
.measure--prevent-overlap .measure-text {
  margin-inline-start: calc(30%);
}
`;

export const withMeasureViewport = (StoryFn: () => StoryFn) => {
  const [{ measureViewportActive }] = useGlobals();

  const params: Params = useParameter("measureViewport");
  const measureViewportEl = document.createElement("div");
  measureViewportEl.id = "measureViewport";
  measureViewportEl.style.setProperty("--color", params?.color || "#e9004e");

  useEffect(() => {
    function measureWindow() {
      const { clientHeight, clientWidth } = document.documentElement;
      const { innerHeight, innerWidth } = window;

      function getMeasurement(
        measure: Params["width"]["measure"] | Params["height"]["measure"]
      ): number {
        let measurement: number;

        switch (measure) {
          case "clientHeight":
            measurement = clientHeight;
            break;
          case "clientWidth":
            measurement = clientWidth;
            break;
          case "innerHeight":
            measurement = innerHeight;
            break;
          case "innerWidth":
            measurement = innerWidth;
            break;
          default:
            measurement = 0;
            break;
        }

        return measurement;
      }

      measureViewportEl.innerHTML = `
      <style>${style}</style>
        
      <div 
        class="measure measure--height measure--${
          params?.height?.display || "left"
        } measure--${
        params?.width?.display === "middle" &&
        params?.height?.display === "middle" &&
        "prevent-overlap"
      }"
        ${params?.height?.color && `style="--color: ${params?.height?.color}"`}
      >
        <span 
        class="measure-text 
        aria-label="height: ${
          getMeasurement(params?.height?.measure) || innerHeight
        }px">
        ${getMeasurement(params?.height?.measure) || innerHeight}px
        </span>
        </div>
        
        <div 
          class="measure measure--width measure--${
            params?.width?.display || "top"
          } measure--${
        params?.width?.display === "middle" &&
        params?.height?.display === "middle" &&
        "prevent-overlap"
      }"
        ${params?.width?.color && `style="--color: ${params?.width?.color}"`}
        
        >
        <span 
        class="measure-text" 
        aria-label="width: ${
          getMeasurement(params?.width?.measure) || innerWidth
        }px">
        ${getMeasurement(params?.width?.measure) || innerWidth}px

        </span>
      </div>
      `;
    }

    if (measureViewportActive) {
      measureWindow();
      document
        .querySelector("body")
        .insertAdjacentElement("beforeend", measureViewportEl);
    } else {
      document.querySelector("#measureViewport")?.remove();
    }

    window.addEventListener("resize", measureWindow);
    return () => {
      document.querySelector("#measureViewport")?.remove();
      window.removeEventListener("resize", measureWindow);
    };
  }, [measureViewportActive]);

  return StoryFn();
};
