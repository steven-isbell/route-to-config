import fs from 'fs';

import { VALID_EXTENSIONS } from '../constants';
import { ValidateFileOutput } from '../@types';

function validateFile(filePath: string): ValidateFileOutput {
  const exists: boolean = fs.existsSync(filePath);
  const extension: string =
    filePath
      .slice()
      .split('.')
      .pop() || '';
  const isValidExtension: boolean = VALID_EXTENSIONS.includes(extension);
  if (exists && isValidExtension) return { isValid: true };
  return {
    isValid: false,
    error: !exists
      ? `File: ${filePath} does not exist.`
      : `Extension: ${extension} is not of type ${VALID_EXTENSIONS}`,
  };
}

export default validateFile;
