import { NextResponse } from 'next/server';

const RAPIDMAIL_API_URL = 'https://apiv3.emailsys.net/v1';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 100;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const MESSAGES = {
  invalidEmail: 'Bitte gib eine gültige E-Mail-Adresse an.',
  missingName: 'Bitte gib deinen Vor- und Nachnamen an.',
  missingConsent: 'Bitte bestätige die Einwilligung.',
  tooMany: 'Zu viele Versuche. Bitte versuche es später nochmal.',
  failed: 'Die Anmeldung hat leider nicht geklappt. Bitte versuche es später nochmal.',
};

/**
 * Best-effort, per-instance limiter. Function instances are reused across
 * requests, so this stops simple scripted floods without extra infrastructure.
 */
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const getAuthHeader = () => {
  const username = process.env.RAPIDMAIL_API_USERNAME;
  const password = process.env.RAPIDMAIL_API_PASSWORD;
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${auth}`;
};

const clean = (value: unknown) =>
  typeof value === 'string' ? value.trim().slice(0, MAX_FIELD_LENGTH) : '';

const badRequest = (error: string) =>
  NextResponse.json({ error }, { status: 400 });

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: MESSAGES.tooMany }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return badRequest(MESSAGES.failed);

  // Honeypot: hidden from people, filled in by bots. Pretend it worked.
  if (clean(body.website)) {
    return NextResponse.json({ success: true });
  }

  const email = clean(body.email).toLowerCase();
  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);

  if (!EMAIL_PATTERN.test(email)) return badRequest(MESSAGES.invalidEmail);
  if (!firstName || !lastName) return badRequest(MESSAGES.missingName);
  if (body.consent !== true) return badRequest(MESSAGES.missingConsent);

  try {
    const response = await fetch(`${RAPIDMAIL_API_URL}/recipients`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        recipientlist_id: process.env.RAPIDMAIL_LIST_ID,
        email,
        firstname: firstName,
        lastname: lastName,
        status: 'active',
      }),
    });

    if (!response.ok) {
      console.error(
        'RapidMail error response:',
        response.status,
        await response.text(),
      );
      return NextResponse.json({ error: MESSAGES.failed }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('RapidMail API error:', error);
    return NextResponse.json({ error: MESSAGES.failed }, { status: 500 });
  }
}
