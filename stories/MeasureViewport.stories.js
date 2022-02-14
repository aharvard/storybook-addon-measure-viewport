import React from "react";
import { Button } from "./Button";

export default {
  title: "Viewport Measure",
  component: Button,
};

const Template = (args) => <Button primary={true} label="Button" />;

export const Default = Template.bind({});

export const HeightOnly = Template.bind({});
HeightOnly.parameters = {
  measureViewport: {
    width: {
      display: "none",
    },
  },
};

export const HeightColorChange = Template.bind({});
HeightColorChange.parameters = {
  measureViewport: {
    height: {
      color: "DarkCyan",
    },
  },
};

export const HeightMiddle = Template.bind({});
HeightMiddle.parameters = {
  measureViewport: {
    height: {
      display: "middle",
    },
  },
};
export const HeightRight = Template.bind({});
HeightRight.parameters = {
  measureViewport: {
    height: {
      display: "right",
    },
  },
};

export const WidthOnly = Template.bind({});
WidthOnly.parameters = {
  measureViewport: {
    height: {
      display: "none",
    },
  },
};

export const WidthColorChange = Template.bind({});
WidthColorChange.parameters = {
  measureViewport: {
    width: {
      color: "blue",
    },
  },
};

export const WidthMiddle = Template.bind({});
WidthMiddle.parameters = {
  measureViewport: {
    width: {
      display: "middle",
    },
  },
};

export const WidthBottom = Template.bind({});
WidthBottom.parameters = {
  measureViewport: {
    width: {
      display: "bottom",
    },
  },
};

export const BothMiddle = Template.bind({});
BothMiddle.parameters = {
  measureViewport: {
    height: {
      display: "middle",
    },
    width: {
      display: "middle",
    },
  },
};

export const BothColorChange = Template.bind({});
BothColorChange.parameters = {
  measureViewport: {
    color: "blue",
  },
};
