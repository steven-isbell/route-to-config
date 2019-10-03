function buildImportList(file: string): string | undefined {
  if (!file.includes('import')) {
    return;
  }

  return file
    .split('\n')
    .filter(val => val.startsWith('import '))
    .join('\n');
}

export default buildImportList;
