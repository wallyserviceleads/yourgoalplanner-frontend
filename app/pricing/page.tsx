'use client';

import { useState } from 'react';

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async () => {
    try {
      setLoading(true);
      setError(null);
      const resp = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || 'Failed to start checkout');
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container section">
      <h1>Pricing</h1>
      <p>Get full access to YourGoalPlanner.</p>
      <div style={{ marginTop: 16 }}>
        <button className="button button--primary" disabled={loading} onClick={subscribe}>
          {loading ? 'Redirecting…' : 'Subscribe'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}
