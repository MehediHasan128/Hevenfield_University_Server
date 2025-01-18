import nodemailer from 'nodemailer';
import config from '../config';
import path from 'path';
import fs from 'fs';

export const sendEmail = async (to: string, userName: string, resetLink: string) => {
  console.log(4);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'bayzidahmed467@gmail.com',
      pass: config.smtp_secreat_credential,
    },
  });

  const htmlFilePath = path.join(process.cwd(), 'src/app/templates/password_reset_email.html');
  let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

  htmlContent = htmlContent
    .replace('[User\'s Name]', userName)
    .replace('[RESET_LINK]', resetLink)
    .replace('[Your Company Name]', 'Havenfield University');

  await transporter.sendMail({
    from: 'bayzidahmed467@gmail.com',
    to,
    subject: 'Password reset link',
    html: htmlContent
  });
};
