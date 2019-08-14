function validateInputs(sourceFile, outputPath) {
  if(!sourceFile || !outputPath || typeof sourceFile !== 'string' || typeof outputPath !== 'string') {
    throw new Error('Please include a source file and an output path.');
  }
  return;
}

export default validateInputs;