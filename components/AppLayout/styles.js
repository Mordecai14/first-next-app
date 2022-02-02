import css from "styled-jsx/css"
import { breakPoints, colors, fonts } from "../../styles/theme"
import { addOpacityColor } from "./utils"

const bgColor = addOpacityColor(colors.primary, 0.3)
const bgColorSecond = addOpacityColor(colors.blue, 0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${bgColorSecond} 1px, transparent 1px),
      radial-gradient(${bgColor} 2px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow-y: auto;
    width: 100%;
  }

  @media (min-width: ${breakPoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakPoints.mobile};
    }
  }
`
