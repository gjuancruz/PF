require("dotenv").config();
import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import KSUID from "ksuid";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

const EMAIL: string | undefined = process.env.EMAIL;
const PASSWORD: string | undefined = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// http://localhost:3001/mailing/send
router.post("/send", async (req: Request, res: Response) => {
  try {
    const { to, subject, text } = req.body;
    const mailOptions = {
      from: EMAIL,
      to,
      subject,
      text,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail enviado: %s", info.messageId);
    res.send("Mail enviado: %s");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// http://localhost:3001/mailing/send
router.post("/newsletter", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email)
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Bienvenido al newsletter de MOON CINEMA",
      text: "Ya formas parte de nuestro newsletter. A partir de ahora vas a poder recibir información sobre nuevas películas, estrenos, descuentos e informaciones exclusivas para nuestros fans. Saludos !",
    };
    const newsletter = await transporter.sendMail(mailOptions);
    res.send("Newsletter message enviado !");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// http://localhost:3001/mailing/recuperarpassword
router.post("/recuperarpassword", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return res.send(" Este usuario no existe , intente ingresando uno correcto");

    // const ksuidFromSync1 = KSUID.randomSync(new Date()).string;
    const newPassword: string = KSUID.randomSync(new Date()).string
    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUNDS)
    );
    const newUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });

    // const mailOptions = {
    //   from: EMAIL,
    //   to: 'mooncinema2022@gmail.com',
    //   subject: 'MOON-CINEMA => Recupero de Contraseña',
    //   text: `Tu contraseña temporal es : ${newPassword}. `,
    //   html: '<h1> `${newPassword}` </h1> </br></br><p>Aqui te dejamos tu contraseña temporal. Utilizala para iniciar sesion nuevamente. </p>'
    // };

    let mailOptions = {
      from: EMAIL,
      to: email,
      subject: 'MOON-CINEMA => Recupero de Contraseña',
      text: 'For clients with plaintext support only',
      html: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <h1> ${newPassword} </h1> 
          </br></br>
          <p>Aqui te dejamos tu contraseña temporal. Utilizala para iniciar sesion nuevamente. </p>
        </body>
      </html>`,
      amp: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <h1> ${newPassword} </h1> 
          </br></br>
          <p>Aqui te dejamos tu contraseña temporal. Utilizala para iniciar sesion nuevamente. </p>
        </body>
      </html>`
  }
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail enviado: %s", info.messageId);
    res.send("Mail enviado: %s");
    // console.log("New user password hashed", newUser);
    // return res.status(200).send({
    //   newUser,
    //   message: "Usuario actualizado correctamente",
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error || "Error interno.",
    });
  }
});

export default router;
