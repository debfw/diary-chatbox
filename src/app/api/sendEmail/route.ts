import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function POST(request: Request) {
  const { senderEmail, message } = await request.json();

  // Change if you want to receive the email sent
  const recipientEmail = "clwork1324@gmail.com";

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY as string,
  });

  const sentFrom = new Sender(
    "hello@trial-z86org8yw0elew13.mlsender.net",
    "From Your Profile website"
  );
  const recipients = [new Recipient(recipientEmail, "Liko")];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("This is a Subject")
    .setHtml(`<p>From ${senderEmail}</p><br/><p>${message}</p>`);

  try {
    await mailerSend.email.send(emailParams);
    return Response.json({ success: 'email sent to clwork1324@gmail.com' }, { status: 201 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}
