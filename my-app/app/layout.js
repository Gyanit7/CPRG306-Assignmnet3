import Link from "next/link";
import "./globals.css"; // Ensure global styles are applied

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col">
        
        {/* Navbar */}
        <header className="w-full bg-gray-900 text-white p-4 flex justify-between">
          <h1 className="text-xl font-bold">IMR Movie Database</h1>
          <nav>
            <Link href="/" className="text-blue-400 hover:underline mx-4">Home</Link>
            <Link href="/movies" className="text-blue-400 hover:underline">Movies</Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-white text-center p-4">
          <p>&copy; 2025 Internet Movies Rental Company</p>
        </footer>

      </body>
    </html>
  );
}
