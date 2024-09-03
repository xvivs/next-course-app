// import { Resend } from 'resend';
// import WelcomeTemplate from '@/emails/welcome-template';
import { NextResponse } from 'next/server';

// const resendClient = new Resend(process.env.RESEND_API_KEY)

export async function POST () {
  // const response = await resendClient.emails.send({
  //   from: '...',
  //   to: 'vladiasem@gmail.com',
  //   subject: 'Test subject',
  //   react: <WelcomeTemplate name='Vlad'/>
  // });

  return NextResponse.json({});
};