import Link from "next/link";

const Navbar: React.FC = () => (
  <header className="bg-white shadow-sm">
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link
        href="/home"
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961]">
        Medea
      </Link>
      <ul className="flex space-x-8">
        <li>
          <Link href="/home" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
        </li>
        <li>
          <Link href="/home" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
        </li>
        <li>
          <Link href="/home" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/home" className="text-gray-600 hover:text-gray-900">
            About us
          </Link>
        </li>
      </ul>
      <button className="bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white px-4 py-2 rounded-full">
        <Link href="/auth/signup">Get Started</Link>
      </button>
    </nav>
  </header>
);

export default Navbar;
