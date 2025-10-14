import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getSession();
  const user = session?.user;
  return (
    <main className="container section">
      <h1>Dashboard</h1>
      <p>Welcome{user?.name ? `, ${user.name}` : ''}!</p>
      <div style={{ marginTop: 16 }}>
        <Link href="/api/auth/logout">Log out</Link>
      </div>
      <div style={{ marginTop: 16 }}>
        <Link href="/api/stripe/portal">Manage billing</Link>
      </div>
    </main>
  );
}
