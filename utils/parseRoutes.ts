import * as parser from '@babel/parser';
import { JSXAttribute, JSXElement } from '@babel/types';

function noop() {}

function parseAttrs(attrs: JSXAttribute[]) {
  return attrs.map(val => {
    // @ts-ignore
    const { name: { name }, value: { value } } = val;
    let actualValue;
    if (name === 'path' || name === 'component') {
      actualValue = value;
    } else if (name === 'exact') {
      console.log(val);
      actualValue = true;
    }
    return {
      // @ts-ignore
      [name]: actualValue
    }
  })
}

function walk(node: JSXElement, cb: Function = noop) {
  // console.log('CURRENT NODE: ', node);
  if (node.children.length) {
    node.children.forEach((child) => {
      if (child.type === 'JSXElement') {
        walk(child);
        if (child.openingElement.attributes.length > 0) {
          console.log(cb(child.openingElement.attributes));
        }
      }
    })
  } else {
    // console.log('NODE123: ', node);
  }
}

function parseRoutes(file: string) {
  const parsedFile = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  parsedFile.program.body.forEach(val => {
    if (val.type === 'ExpressionStatement' && val.expression.type === 'JSXElement') {
      walk(val.expression, parseAttrs);
    }
  })
  return [{
    path: 'string',
    component: 'string',
    exact: true
  }];
}

export default parseRoutes;