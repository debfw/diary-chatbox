import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const { senderEmail, message } = req.body;
  console.log(senderEmail, message);
  // Change if you want to receive the email sent
  const recipientEmail = "clwork1324@gmail.com";

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY as string,
  });

  const sentFrom = new Sender(
    "noreply@trial-vywj2lpxmq147oqz.mlsender.net",
    "From Your Profile website"
  );
  const recipients = [new Recipient(recipientEmail, "Liko")];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("This is a Subject")
    .setHtml(`<p>From ${senderEmail}</p><br/><p>${message}</p>`);

  try {
    await mailerSend.email.send(emailParams);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
