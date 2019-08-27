import * as parser from '@babel/parser';
import { JSXAttribute, JSXElement } from '@babel/types';

import { RouteConfig } from '../@types';

function noop() { }

let config: RouteConfig[] = [];

function parseAttrs(attrs: JSXAttribute[]) {
  const attributes = {}
  attrs.forEach(val => {
    const { name: { name }, value} = val;
    let actualValue;
    if (name === 'path') {
      // @ts-ignore
      actualValue = value.value;
    } else if (name === 'exact') {
      if(value === null) actualValue = true;
      // @ts-ignore
      else if (value.value && (value.value === 'false' || value.value === false)) actualValue = false;
      // @ts-ignore
      else actualValue = true;
    } else if(name === 'component') {
      // @ts-ignore
      actualValue = value.expression.name
    }
      // @ts-ignore
      attributes[name] = actualValue
  })
  return attributes;
}

function walk(node: JSXElement, cb: Function = noop) {
  if (node.children.length) {
    node.children.forEach((child) => {
      if (child.type === 'JSXElement') {
        walk(child);
        if (child.openingElement.attributes.length > 0) {
          config = config.concat(cb(child.openingElement.attributes));
        }
      }
    })
  }
}

function parseRoutes(file: string) {
  const parsedFile = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  parsedFile.program.body.forEach(val => {
    if(val.type === 'ImportDeclaration') {
      const importName = val.specifiers[0].local.name;
      // @ts-ignore
      global[importName] = importName
    }
    if (val.type === 'ExpressionStatement' && val.expression.type === 'JSXElement') {
      walk(val.expression, parseAttrs);
    }
  })
  return config;
}

export default parseRoutes;