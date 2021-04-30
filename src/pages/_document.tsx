import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* <script src="noflash.js" /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
