/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';

const globalStyles = css`
  body {
    font-family: system, -apple-system, '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif;
    font-size: 16px;
    margin: 0;
    overflow: hidden;
    /* colors */
    background: #222;
    color: #fff;
  }
`;

const Styles = () => [
  <Global key="global-styles" styles={globalStyles} />,
];

export default Styles;
