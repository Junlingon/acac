import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const component = require('../index').default;

export default function prerender(config: any) {
  return new Promise((f, r) => {
    try {
      return f(
        renderToStaticMarkup(createElement(component, { ...config, config })),
      );
    } catch (err) {
      return r(err);
    }
  });
}