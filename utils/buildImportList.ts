function buildImportList(file: string): string | undefined {
  if (!file.includes('import')) return;
  const lines = file.split('\n');
  const imports: string[] = [];
  lines.forEach(val => {
    if (val.startsWith('import ')) {
      imports.push(val);
    }
  });
  return imports.join('\n');
}

export default buildImportList;
