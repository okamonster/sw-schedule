import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.APP_URL}/signup/confirm/${email}?token=${token}`;

  await resend.emails.send({
    from: 'noreply@gemba-live.jp',
    to: email,
    subject: '【gemba】認証URLをクリックしてください',
    text: `この度はgembaへのご登録ありがとうございます。
  
  gembaへの登録を完了するためには、以下のURLをクリックしてください。
  
  ${confirmLink}
  
  このURLは24時間有効です。
  
  ※本メールに心当たりがない場合は、お手数ですが破棄して頂きますようお願いいたします。
  `,
    headers: {
      'X-Entity-Ref-ID': new Date().toString(),
    },
  });
};
