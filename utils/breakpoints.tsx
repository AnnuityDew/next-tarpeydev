/* thanks Jordan Eckowitz!
https://medium.com/@jordan.eckowitz/responsive-styled-components-breakpoints-function-447b2db915a2 */

import { css } from "styled-components"

export const breakpoints = (
  cssProp = "padding", // the CSS property to apply to the breakpoints
  cssPropUnits = "px", // the units of the CSS property (can set equal to "" and apply units to values directly)
  values = [], // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
  mediaQueryType = "min-width" // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
) => {
  const breakpointProps = values.reduce((mediaQueries, value) => {
    const [screenBreakpoint, cssPropBreakpoint] = [
      Object.keys(value)[0],
      Object.values(value)[0],
    ]
    return (mediaQueries += `
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssPropBreakpoint}${cssPropUnits};
    }
    `)
  }, "")
  return css([breakpointProps])
}

export const gridBreakpoints = (
  cssProp = "padding", // the CSS property to apply to the breakpoints
  values = [], // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
  mediaQueryType = "min-width" // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
) => {
  const breakpointProps = values.reduce((mediaQueries, value) => {
    const [screenBreakpoint, cssString] = [
      Object.keys(value)[0],
      Object.values(value)[0],
    ]
    return (mediaQueries += `
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssString};
    }
    `)
  }, "")
  return css([breakpointProps])
}
