// You can test this by creating a simple page component:
// app/test-lists/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function TestLists() {
  const [lists, setLists] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/rapidmail/lists')
      .then((res) => res.json())
      .then((data) => {
        console.log('Raw API response:', data); // For debugging
        setLists(data);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!lists) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your RapidMail Lists</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(lists, null, 2)}
      </pre>
    </div>
  );
}
