import fs from 'fs';
import { VALID_EXTENSIONS } from '../constants';

function validateFile(filePath: string) {
  const extension = filePath.slice().split('.').pop() || '';
  const exists = fs.existsSync(filePath);
  const isValidExtension = VALID_EXTENSIONS.includes(extension);
  if (exists && isValidExtension) return { isValid: true };
  return {
    isValid: false,
    error: !exists ? `File: ${filePath} does not exist.` : `Extension: ${extension} is not of type .js or .jsx`
  }
}

export default validateFile;