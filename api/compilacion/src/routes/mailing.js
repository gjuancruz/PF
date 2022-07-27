"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = require("express");
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ksuid_1 = __importDefault(require("ksuid"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});
// http://localhost:3001/mailing/send
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, subject, text } = req.body;
        const mailOptions = {
            from: EMAIL,
            to,
            subject,
            text,
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log("Mail enviado: %s", info.messageId);
        res.send("Mail enviado: %s");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
// http://localhost:3001/mailing/send
router.post("/newsletter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log(email);
        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: "Bienvenido al newsletter de MOON CINEMA",
            text: "Ya formas parte de nuestro newsletter. A partir de ahora vas a poder recibir información sobre nuevas películas, estrenos, descuentos e informaciones exclusivas para nuestros fans. Saludos !",
        };
        const newsletter = yield transporter.sendMail(mailOptions);
        res.send("Newsletter message enviado !");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
// http://localhost:3001/mailing/recuperarpassword
router.post("/recuperarpassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user)
            return res.send(" Este usuario no existe , intente ingresando uno correcto");
        // const ksuidFromSync1 = KSUID.randomSync(new Date()).string;
        const newPassword = ksuid_1.default.randomSync(new Date()).string;
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(process.env.SALT_ROUNDS));
        const newUser = yield prisma.user.update({
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
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log("Mail enviado: %s", info.messageId);
        res.send("Mail enviado: %s");
        // console.log("New user password hashed", newUser);
        // return res.status(200).send({
        //   newUser,
        //   message: "Usuario actualizado correctamente",
        // });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error || "Error interno.",
        });
    }
}));
exports.default = router;
//# sourceMappingURL=mailing.js.map