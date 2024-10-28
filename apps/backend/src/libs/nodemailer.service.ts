import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.SMTP_HOST,
      port: parseInt(this.configService.SMTP_PORT),
      auth: {
        user: this.configService.SMTP_USER,
        pass: this.configService.SMTP_PASS, 
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_FROM, // sender address
      to,
      subject,
      text,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
