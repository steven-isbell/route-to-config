import fs from 'fs';
import { VALID_EXTENSIONS } from '../constants';

function validateFile(filePath: string) {
  const extension = filePath.slice().split('.').pop() || '';
  const exists = fs.existsSync(filePath);
  const isValidExtension = VALID_EXTENSIONS.includes(extension);
  return exists && isValidExtension;
}

export default validateFile;