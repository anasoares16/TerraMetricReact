export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-green-400">
          TerraMetric
        </h1>

        {/* Menu */}
        <ul className="flex gap-6">
          <li>
            <a href="#" className="hover:text-green-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400 transition">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400 transition">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400 transition">
              Contact
            </a>
          </li>
        </ul>

      </div>
    </nav>
  )
}
