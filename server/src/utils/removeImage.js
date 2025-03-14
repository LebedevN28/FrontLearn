const fs = require('fs/promises');
const path = require('path');

async function removeImage(filename) {
  try {
    await fs.unlink(path.resolve(__dirname, '..', '..', 'public', 'images', filename));
  } catch (error) {
    console.log(error);
    console.log('Ошибка удаления файла');
  }
}

module.exports = removeImage;
