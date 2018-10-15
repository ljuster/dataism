import { css, Interpolation } from 'emotion';

// keep in sync with media-queries section in misc/variables.scss
const breakpoints = {
  // Numerical values will result in a min-width query
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
  // String values will be used as is
  // tallPhone: '(max-width: 360px) and (min-height: 740px)'
}

type Size = (...args: Interpolation[]) => string

type MQ = {
  small: Size
  medium: Size
  large: Size
  xLarge: Size
  tallPhone: Size
}

const mq: any = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    let prefix =
      typeof breakpoints[label] === 'string'
        ? ''
        : 'min-width:'
    let suffix =
      typeof breakpoints[label] === 'string' ? '' : 'px'
    accumulator[label] = cls =>
      css`
        @media (${prefix + breakpoints[label] + suffix}) {
          ${cls};
        }
      `
    return accumulator
  },
  {}
)

export default mq as MQ 
