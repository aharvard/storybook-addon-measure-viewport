# storybook-addon-measure-viewport

Storybook Addon Measure Viewport displays the height and width of current viewport.

![storybook-addon-measure-viewport](./assets/showcase.gif)

## Installation

```sh
// Install with NPM
npm install -D storybook-addon-measure-viewport

// Install with Yarn
yarn add -D storybook-addon-measure-viewport
```

within [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
module.exports = {
  addons: ["storybook-addon-measure-viewport"],
};
```

## Configuration

Measure Viewport sets all color and display options by default. Configure the addon with the `measureViewport` [parameter](https://storybook.js.org/docs/react/writing-stories/parameters).

To configure for all stories, set the `measureViewport` parameter in [`.storybook/preview.js`](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering):

```js
export const parameters = {
  measureViewport: {
    color: "DarkCyan", // set's color for both width and height
    height: {
      color: "rgba(0,100,0,0.5)", // overrides measureViewport.color
      display: "right", // "left", "middle, "right", "none"
      measure: "clientHeight", //  "clientHeight", "innerHeight"
    },
    width: {
      color: "#0033cc55", // overrides measureViewport.color
      display: "bottom", // "top", "middle, "bottom", "none"
      measure: "clientWidth", //  "clientWidth", "innerWidth"
    },
  },
};
```

### Addon API

| Property                         | Type/Options                                                                                                                    | Default       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `measureViewport.color`          | String: [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for both width and height                     | `#e9004e`     |
| `measureViewport.height.color`   | String: [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for height, overrides `measureViewport.color` | `#e9004e`     |
| `measureViewport.height.display` | One of: `left`, `middle`, `right`, `none`                                                                                       | `left`        |
| `measureViewport.height.measure` | One of: `innerHeight` (includes scroll bar height in total), `clientHeight`                                                     | `innerHeight` |
| `measureViewport.width.color`    | String: [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for width, overrides `measureViewport.color`  | `#e9004e`     |
| `measureViewport.width.display`  | One of: `top`, `middle`, `bottom`, `none`                                                                                       | `top`         |
| `measureViewport.width.measure`  | One of: `innerWidth` (includes scroll bar width in total), `clientWidth`                                                        | `innerWidth`  |

You can also configure on per-story or per-component basis using [parameter inheritance](https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters):

```js
// Button.stories.js

// Set options for all Button stories
export default {
  title: "Button",
  parameters: {
    measureViewport: {
      color: "DarkCyan", // set's color for both width and height
      height: {
        color: "rgba(0,100,0,0.5)", // overrides measureViewport.color
        display: "right", // "left", "middle, "right", "none"
        measure: "clientHeight", //  "clientHeight", "innerHeight"
      },
      width: {
        color: "#0033cc55", // overrides measureViewport.color
        display: "bottom", // "top", "middle, "bottom", "none"
        measure: "clientWidth", //  "clientWidth", "innerWidth"
      },
    },
  },
};

// Disable height measure in Button/Large story only
export const Large = Template.bind({});
Large.parameters = {
  measureViewport: {
    height: {
      display: "none",
    },
  },
};
```
