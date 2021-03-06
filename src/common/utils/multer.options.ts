import * as multer from 'multer';

import * as path from 'path';

import * as fs from 'fs';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('πΎ Create a root uploads folder...');

    fs.mkdirSync(path.join(__dirname, '..', `uploads`)); //ν΄λλ₯Ό λ§λλ λͺλ Ήμ΄
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`πΎ Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`)); //ν΄λ μμ±
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder); // ν΄λ λ§λ€κ³ 

  return multer.diskStorage({
    //μ΅μμ μ¨μ€λ€.
    destination(req, file, cb) {
      //* μ΄λμ μ μ₯ν  μ§

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName); //cbμ λλ²μ§Έ μΈμκ° μ΄λμ μ μ₯ν μ§λ€.
    },

    filename(req, file, cb) {
      //* μ΄λ€ μ΄λ¦μΌλ‘ μ¬λ¦΄ μ§

      const ext = path.extname(file.originalname); //νμΌμ μ¬λ €μ νμ₯μλ₯Ό μΆμΆνλ€.

      const fileName = `${path.basename(
        file.originalname,

        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
