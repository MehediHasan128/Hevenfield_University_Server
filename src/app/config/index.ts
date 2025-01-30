import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  student_default_pass: process.env.STUDENT_DEFAULT_PASS,
  faculty_default_pass: process.env.FACULTY_DEFAULT_PASS,
  admin_default_pass: process.env.ADMIN_DEFAULT_PASS,
  total_semester: process.env.TOTAL_SEMESTER,
  student_capacity: process.env.STUDENT_CAPACITY,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret_token: process.env.JWT_ACCESS_SECRET_TOKEN,
  jwt_refresh_secret_token: process.env.JWT_REFRESH_SECRET_TOKEN,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRE_IN,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  smtp_secreat_credential: process.env.SMTP_SECRET_CREDENTIAL,
  company_email: process.env.COMPANY_EMAIL,
  clodinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  clodinary_api_key: process.env.CLOUDINARY_APY_KEY,
  clodinary_api_secret: process.env.CLOUDINARY_APY_SECRET,
};
