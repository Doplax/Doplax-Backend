import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import handleHttpError from '@/utils/errorHandler';
import { sendEmail } from '@/config/nodemailerConfig';
import contactMeTemplate from '@/modules/email/templates/contactMeTemplate';

@ApiTags('Email')
@Controller('api/email')
export class EmailController {

  @Post('contactMe')
  @ApiOperation({ summary: 'Send contact email' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 500, description: 'Error sending email' })
  async contactMe(@Body() body: { name: string; email: string; message: string }) {
    try {
      const { name, email, message } = body;
      const subject = 'Nuevo mensaje de contacto';

      const mailOptions = {
        from: process.env.EMAIL_FROM || email,
        to: email,
        //replyTo: email,
        ...contactMeTemplate({ name, email, subject, message })
      };
      const result = await sendEmail(mailOptions);
      console.log('Email sent:', result, { name, email, message });

      return { data: result };
    } catch (e: any) {
      throw new Error(e);
    }
  }
}