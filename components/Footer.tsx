import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950/80 backdrop-blur text-gray-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-semibold text-white">💰 ExpenseTracker AI</span>
        </Link>
        <p className="text-xs">
          © {new Date().getFullYear()} ExpenseTracker AI — Built with ❤️ & ☕
        </p>
      </div>
    </footer>
  );
}
