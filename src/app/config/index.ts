import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  company_email: process.env.COMPANY_EMAIL,
  total_semester: process.env.TOTAL_SEMESTER,
  student_capacity: process.env.STUDENT_CAPACITY,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  clodinary_api_key: process.env.CLOUDINARY_APY_KEY,
  admin_default_pass: process.env.ADMIN_DEFAULT_PASS,
  registrar_default_pass: process.env.REGISTRAR_DEFAULT_PASS,
  faculty_default_pass: process.env.FACULTY_DEFAULT_PASS,
  student_default_pass: process.env.STUDENT_DEFAULT_PASS,
  clodinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRE_IN,
  clodinary_api_secret: process.env.CLOUDINARY_APY_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRE_IN,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  smtp_secreat_credential: process.env.SMTP_SECRET_CREDENTIAL,
  jwt_access_secret_token: process.env.JWT_ACCESS_SECRET_TOKEN,
  super_admin_default_pass: process.env.SUPER_ADMIN_DEFAULT_PASS,
  jwt_refresh_secret_token: process.env.JWT_REFRESH_SECRET_TOKEN,
};
