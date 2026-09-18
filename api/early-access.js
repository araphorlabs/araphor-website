const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  let body;
  try {
    body = request.body ?? {};
  } catch {
    return response.status(400).json({ error: 'Invalid request body.' });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (body.website) return response.status(204).end();
  if (!emailPattern.test(email) || email.length > 254) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }

  const { RESEND_API_KEY, EARLY_ACCESS_FROM_EMAIL, EARLY_ACCESS_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !EARLY_ACCESS_FROM_EMAIL || !EARLY_ACCESS_TO_EMAIL) {
    return response.status(503).json({ error: 'Email service is not configured.' });
  }

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'araphor-website/1.0',
      },
      body: JSON.stringify({
        from: EARLY_ACCESS_FROM_EMAIL,
        to: [EARLY_ACCESS_TO_EMAIL],
        reply_to: email,
        subject: 'Araphor early-access request',
        text: `New Araphor early-access request.\n\nEmail: ${email}`,
      }),
    });

    if (!delivery.ok) {
      console.error('Resend rejected an early-access notification.', { status: delivery.status });
      return response.status(502).json({ error: 'Email delivery failed.' });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Resend could not receive an early-access notification.', { error });
    return response.status(502).json({ error: 'Email delivery failed.' });
  }
}
