import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    // ================================
    // VALIDATE
    // ================================
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // ================================
    // CREATE TRANSPORTER
    // ================================
    // Using Gmail SMTP
    // You need to create an App Password
    // ================================
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // ================================
    // EMAIL TO YOU (notification)
    // ================================
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #012c56; padding: 32px; border-radius: 16px 16px 0 0;">
            <h1 style="color: #f0ece3; margin: 0; font-size: 24px;">
              New Portfolio Message 📩
            </h1>
          </div>

          <div style="background: #ffffff; padding: 32px; border: 1px solid #e0d5c4;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ece3; color: #7a9abb; font-size: 13px; font-weight: bold; width: 100px;">
                  NAME
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ece3; color: #012c56; font-size: 15px;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ece3; color: #7a9abb; font-size: 13px; font-weight: bold;">
                  EMAIL
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ece3; color: #012c56; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #e01f37; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ece3; color: #7a9abb; font-size: 13px; font-weight: bold;">
                  SUBJECT
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ece3; color: #012c56; font-size: 15px;">
                  ${subject}
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <p style="color: #7a9abb; font-size: 13px; font-weight: bold; margin-bottom: 8px;">
                MESSAGE
              </p>
              <div style="background: #f6f3ee; padding: 20px; border-radius: 12px; color: #012c56; font-size: 15px; line-height: 1.8;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>

          <div style="background: #e01f37; padding: 20px; border-radius: 0 0 16px 16px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 13px;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      `,
    })

    // ================================
    // AUTO-REPLY TO SENDER
    // ================================
    await transporter.sendMail({
      from: `"Hari Narayan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 🙌`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #012c56; padding: 32px; border-radius: 16px 16px 0 0;">
            <h1 style="color: #f0ece3; margin: 0; font-size: 24px;">
              Thanks for your message! 🎉
            </h1>
          </div>

          <div style="background: #ffffff; padding: 32px; border: 1px solid #e0d5c4;">
            <p style="color: #012c56; font-size: 16px; line-height: 1.8;">
              Hi ${name},
            </p>
            <p style="color: #3a5f85; font-size: 15px; line-height: 1.8;">
              Thank you for reaching out through my portfolio website.
              I have received your message and will get back to you as soon as possible.
            </p>
            <p style="color: #3a5f85; font-size: 15px; line-height: 1.8;">
              Here is a copy of your message:
            </p>

            <div style="background: #f6f3ee; padding: 20px; border-radius: 12px; margin: 20px 0;">
              <p style="color: #7a9abb; font-size: 13px; font-weight: bold; margin-bottom: 8px;">
                Subject: ${subject}
              </p>
              <p style="color: #012c56; font-size: 14px; line-height: 1.8;">
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>

            <p style="color: #3a5f85; font-size: 15px; line-height: 1.8;">
              Best regards,<br>
              <strong style="color: #012c56;">Hari Narayan</strong><br>
              Full Stack Developer
            </p>
          </div>

          <div style="background: #e01f37; padding: 20px; border-radius: 0 0 16px 16px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 13px;">
              Hari Narayan | Full Stack Developer
            </p>
          </div>
        </div>
      `,
    })

    return Response.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Email error:', error)
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}