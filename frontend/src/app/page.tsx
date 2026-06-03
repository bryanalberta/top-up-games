import HomeClient from '@/components/HomeClient';

// Fetch games from our Node.js backend
async function getGames() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
      cache: 'no-store', // Disable cache to see fresh data for now
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return [];
  }
}

export default async function Home() {
  const games = await getGames();
  return <HomeClient games={games} />;
}
