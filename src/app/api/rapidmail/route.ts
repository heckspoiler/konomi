// app/api/rapidmail/route.ts
import { NextResponse } from 'next/server';

const RAPIDMAIL_API_URL = 'https://apiv3.emailsys.net/v1';

const getAuthHeader = () => {
  const username = process.env.RAPIDMAIL_API_USERNAME;
  const password = process.env.RAPIDMAIL_API_PASSWORD;
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${auth}`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Add validation for required fields
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const response = await fetch(`${RAPIDMAIL_API_URL}/recipients`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        recipientlist_id: process.env.RAPIDMAIL_LIST_ID,
        email: body.email,
        firstname: body.firstname || '',
        lastname: body.lastname || '',
        status: 'active',
      }),
    });

    // Get the response as text first
    const responseText = await response.text();

    // Try to parse it as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', responseText, e);
      return NextResponse.json(
        { error: 'Invalid response from RapidMail API', e },
        { status: 500 },
      );
    }

    if (!response.ok) {
      console.error('RapidMail error response:', data);
      return NextResponse.json(
        {
          error: data.message || 'Failed to subscribe',
          details: data,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('RapidMail API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 },
    );
  }
}
