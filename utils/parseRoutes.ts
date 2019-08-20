import * as parser from '@babel/parser';
import { Node } from '@babel/types';

function noop() {}

function walk(node: Node, cb: Function = noop) {
  if (node.type === 'JSXElement') {
    if(node.children.length) {
      // console.log('CHILDREN: ', node.children);
      node.children.forEach((child) => {
        walk(child);
        if(child.type === 'JSXElement' && child.openingElement.attributes.length > 0) {
          console.log('ATTRS: ', child.openingElement.attributes);
        } 
      })
    } else {
      console.log('NODE123: ', node);
    }
  }
}

function parseRoutes(file: string) {
  const parsedFile = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  walk(parsedFile.program.body[0].expression);
  // @ts-ignore
  // console.log(parsedFile.program.body[0].expression.children[1].openingElement.attributes[2].value);
  return [{
    path: 'string',
    component: 'string',
    exact: true
  }];
}

export default parseRoutes;