import { access } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

import { UPLOAD_DIR } from 'src/config/app.config';

const destination = `./${UPLOAD_DIR}`;

const filename = (req, file, cb) => {
  const id = uuidv4();

  return cb(null, `${id}${file.originalname}`);
};

export const fileFilter = async (req, file, cb) => {
  try {
    await access(`${UPLOAD_DIR}/${req.params.img}`);
    cb(null, false);
  } catch (ex) {
    cb(null, true);
  }
};

export const uploadImageConfig = () => {
  return diskStorage({
    destination,
    filename,
  });
};
