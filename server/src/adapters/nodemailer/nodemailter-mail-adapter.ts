import nodemailer from 'nodemailer'
import { type MailAdapter, type SendMailData } from '../mail-adapter'
import * as dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT != null ? parseInt(process.env.EMAIL_PORT) : 2525,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS
  }
})
export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Wayne Souto <soutowhs@gmail.com>',
      subject,
      html: body
    })
  };
}
