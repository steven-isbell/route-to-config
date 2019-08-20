import * as parser from '@babel/parser';
import { Node, JSXAttribute } from '@babel/types';

function noop() {}

const config = [];

function parseAttrs(attrs: JSXAttribute[]) {
  return attrs.map(val => {
    const { name: { name }} = val;
    let value;
    if(val.value) {
      if(name === 'path' || name === 'component') {
        // @ts-ignore
        value = val.value.value;
      } else if(name === 'exact') {
        value = true;
      }
    }
    return {
      // @ts-ignore
      [name]: value
    }
  })
}

function walk(node: Node, cb: Function = noop) {
  console.log(node);
  if (node && node.type === 'JSXElement') {
    if(node.children.length) {
      node.children.forEach((child) => {
        if(child.type === 'JSXElement' && child.openingElement.attributes.length > 0) {
          console.log(cb(child.openingElement.attributes));
        } 
        walk(child);
      })
    } else {
      // console.log('NODE123: ', node);
    }
  }
}

function parseRoutes(file: string) {
  const parsedFile = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  // @ts-ignore
  walk(parsedFile.program.body, parseAttrs);
  // console.log(parsedFile.program.body[0].expression.children[1].openingElement.attributes[2].value);
  return [{
    path: 'string',
    component: 'string',
    exact: true
  }];
}

export default parseRoutes;