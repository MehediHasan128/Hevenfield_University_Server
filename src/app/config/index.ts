import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  student_default_pass: process.env.STUDENT_DEFAULT_PASS,
  total_semester: process.env.TOTAL_SEMESTER,
  student_capacity: process.env.STUDENT_CAPACITY,
};
