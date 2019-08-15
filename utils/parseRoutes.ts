import * as parser from '@babel/parser';
import { Node } from '@babel/types';

function noop() {}

function walk(node: Node, cb: Function = noop) {
  if (node.type === 'JSXElement') {
    console.dir(node.children);
  }
  
}

function parseRoutes(file: string) {
  const parsedFile = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  // walk(parsedFile.program.body[0]);
  // @ts-ignore
  console.log(parsedFile.program.body[0].expression.children[1].openingElement.attributes[2].value);
  return [{
    path: 'string',
    component: 'string',
    exact: true
  }];
}

export default parseRoutes;