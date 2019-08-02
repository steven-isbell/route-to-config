import fs from 'fs';

function validateFile(filePath) {
  const extension = filePath.slice().split('.').pop();
  const exists = fs.existsSync(filePath);
  const isValidExtension = 
}