import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-semibold">Welcome to the IMR Movie Database</h2>
      <p className="mt-4 text-gray-600">Browse, add, and manage your favorite movies.</p>
      <Link href="/movies" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        View Movies
      </Link>
    </div>
  );
}
