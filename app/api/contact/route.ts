import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, description } = body;

    const senderName = (name || '').trim() || 'Visitor';
    const senderRole = (role || '').trim() || 'Role Opportunity';
    const senderDesc = (description || '').trim() || '';

    // Forward to FormSubmit via server-side request (bypasses browser CORS & adblockers)
    const formSubmitRes = await fetch('https://formsubmit.co/ajax/hariprasad8760@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'http://localhost:3000',
        Referer: 'http://localhost:3000/',
      },
      body: JSON.stringify({
        name: senderName,
        role: senderRole,
        description: senderDesc,
        _subject: `Portfolio Inquiry: ${senderName} (${senderRole})`,
        message: `Name: ${senderName}\nRole / Position: ${senderRole}\n\nDescription / Message:\n${senderDesc}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const data = await formSubmitRes.json();

    if (data.success === 'true' || data.success === true) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully! Hariprasad will receive your email.',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Form submission failed on email gateway.',
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Server error processing contact form.' },
      { status: 500 }
    );
  }
}
