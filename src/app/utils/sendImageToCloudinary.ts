import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

export const sendImageToCloudinary = async (
  imagePath: string,
  imageName: string,
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.clodinary_cloud_name,
    api_key: config.clodinary_api_key,
    api_secret: config.clodinary_api_secret, // Click 'View API Keys' above to copy your API secret
  });

  return cloudinary.uploader.upload(
    imagePath,
    {
      public_id: imageName,
    },
    function (error, result) {
      console.log(result);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    },
  );
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
