import * as parser from '@babel/parser';

function parseRoutes(file: string) {
  const parsedFile = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log(parsedFile.program.body[0]);
  return [{
    path: 'string',
    component: 'string',
    exact: true
  }];
}

export default parseRoutes;