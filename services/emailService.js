import nodemailer from 'nodemailer';
import config from '../config/config.js';

const purchaseEmailService = async (message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: config.mailUser,
      pass: config.mailUserPass,
    },
  });

  await transporter.sendMail({
    from: "Librería",
    to: "example@gmail.com",
    subject: "Compra exitosa",
    html: `
    <section>
        <h1>${message}</h1>
    </section>
    `,
  });

  return { status: "success", message: "Email enviado" };
};

export default purchaseEmailService;