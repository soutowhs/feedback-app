import nodemailer from "nodemailer"
import { MailAdapter, SendMailData } from "../mail-adapter"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "87395dd147c43e",
        pass: "83201e1b7b08f3"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Wayne Souto <soutowhs@gmail.com>',
            subject,
            html: body,
        })
    };
}
