import { createGlobalStyle } from 'styled-components';
import media from 'styled-media-query';

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html {
    font-size: 62.5%;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background: var(--body-bg);
    font-weight: 400;
    font-family: "Open Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    font-size: 1.5rem;
    line-height: 160%;
    ${media.greaterThan('large')`
      font-size: 1.7rem;
    `}
  }
  strong {
    font-weight: bold !important;
  }
  em {
    font-style: italic !important;
  }
  img {
    display: block;
  	max-width: 100%;
  	height: auto;
  }

  a {
    color: var(--primaryColor)
  }

  .homesubtitle {
    line-height: 140%;
    font-size: 2rem;
    font-weight: bold;
    
    ${media.greaterThan('medium')`
      line-height: 1.1;
      font-size: 2.5rem;
    `}

    ${media.greaterThan('large')`
      line-height: 1.1;
      font-size: 3rem;
    `}
  }

  :root { 
    --dark-blue: #3675b3;
    --light-blue: #4da6ff;
    --light-pink: #ff4d8b;
    --dark-pink: #b33662;
    --bright-yellow: #fff04d;

    --gray-extra-light: #eaeaea; 
    --gray-light: #747d8d;  
    --gray: #475060;
    --gray-dark: #2e333e;

    --primary-color: var(--dark-pink);//#0066f9;
    --secondary-color: #ffffff;//var(--light-blue);//#2e333e;
    --thirdy-color: var(--brigh-yellow);#001ff9;

    --body-bg: #FFFFFF; 

    --bg-light: var(--light-pink);
    --bg-dark: var(--dark-pink);

    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    
    --link-color: var(--primary-color);
    --link-color-hover: var(--thirdy-color);
    
    --text-color: var(--dark-blue);
    --text-light:var(--light-blue);
    --text-dark: var(--dark-pink);
    --text-disabled: var(--gray-dark);
    --post-item-text: #ffffff;

    --nav-link: #ffffff;

    --width-container: 1040px;

    --space: 2rem;
    --space-sm: 1rem;
    --space-lg: 3rem;
  }
`;
export default GlobalStyles;
