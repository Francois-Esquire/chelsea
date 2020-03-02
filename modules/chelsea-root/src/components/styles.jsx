/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';

const globalStyles = css`
  body {
    padding: 0;
    margin: 0;
  }
`;

const Styles = () => [
  <Global key="global-styles" styles={globalStyles} />,
];

export default Styles;
