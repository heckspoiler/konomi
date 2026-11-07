import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Called by the Prismic webhook on publish.
 *
 * Optional protection: if REVALIDATE_SECRET is set, the webhook's secret
 * (sent by Prismic in the JSON body) must match it. Without it, any POST
 * clears the Prismic cache – harmless, it only triggers a refetch.
 */
export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;

  if (expected) {
    const body = await request.json().catch(() => null);
    if (body?.secret !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  revalidateTag('prismic');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
