import * as parser from '@babel/parser';
import { JSXElement, JSXAttribute } from '@babel/types';

import { RouteConfig, RouteAttrs } from '../@types';

function noop() {}

let config: RouteConfig[] = [];

function parseAttrs(attrs: JSXAttribute[]) {
  const attributes = <RouteAttrs>{};
  attrs.forEach(val => {
    const {
      name: { name },
      value,
    } = val;
    let actualValue;
    if (name === 'path' && value && value.type === 'StringLiteral') {
      actualValue = value.value;
    } else if (name === 'exact') {
      if (value === null) actualValue = true;
      else if (
        value &&
        value.type === 'StringLiteral' &&
        value.value &&
        value.value === 'false'
      )
        actualValue = false;
      else actualValue = true;
    } else if (
      name === 'component' &&
      value &&
      value.type === 'JSXExpressionContainer' &&
      value.expression.type === 'Identifier'
    ) {
      actualValue = value.expression.name;
    }
    if (typeof name === 'string') attributes[name] = actualValue;
  });
  return attributes;
}

function walk(node: JSXElement, cb: Function = noop) {
  if (node.children.length) {
    node.children.forEach(child => {
      if (child.type === 'JSXElement') {
        walk(child);
        if (child.openingElement.attributes.length > 0) {
          config = config.concat(cb(child.openingElement.attributes));
        }
      }
    });
  }
}

function parseRoutes(file: string) {
  const parsedFile = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
  parsedFile.program.body.forEach(val => {
    if (val.type === 'ImportDeclaration') {
      const importName = val.specifiers[0].local.name;
      global[importName] = importName;
    }
    if (
      val.type === 'ExpressionStatement' &&
      val.expression.type === 'JSXElement'
    ) {
      walk(val.expression, parseAttrs);
    }
  });
  return config;
}

export default parseRoutes;
