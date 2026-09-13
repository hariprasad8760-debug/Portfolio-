import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, description } = body;

    const senderName = (name || '').trim() || 'Visitor';
    const senderRole = (role || '').trim() || 'Role Opportunity';
    const senderDesc = (description || '').trim() || '';

    // Forward to FormSubmit via server-side request with full browser headers
    const formSubmitRes = await fetch('https://formsubmit.co/ajax/hariprasad8760@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'http://localhost:3000',
        Referer: 'http://localhost:3000/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        name: senderName,
        role: senderRole,
        description: senderDesc,
        _subject: `Portfolio Inquiry: ${senderName} (${senderRole})`,
        message: `Name: ${senderName}\nRole / Position: ${senderRole}\n\nDescription / Message:\n${senderDesc}\n\nSent via Portfolio Contact Form`,
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
      const isActivation = data.message && typeof data.message === 'string' && data.message.toLowerCase().includes('activation');
      return NextResponse.json(
        {
          success: false,
          needsActivation: isActivation,
          message: isActivation
            ? "FormSubmit sent an activation email to hariprasad8760@gmail.com. Please open your inbox and click 'Activate Form' once to start receiving messages!"
            : (data.message || 'Form submission failed on email gateway.'),
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
