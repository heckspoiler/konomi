import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Called by the Prismic webhook on publish. Prismic sends the webhook's
 * secret in the JSON body; it must match REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    console.error('REVALIDATE_SECRET is not set; refusing to revalidate.');
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const body = await request.json().catch(() => null);

  if (body?.secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidateTag('prismic');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
