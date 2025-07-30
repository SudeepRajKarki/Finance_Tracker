import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(user ? '/dashboard' : '/')}
          className="text-xl font-bold"
        >
          FinTrack
        </button>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <Link to="/income" className="hover:underline">Income</Link>
              <Link to="/expense" className="hover:underline">Expense</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-2">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <Link to="/income" className="hover:underline" onClick={() => setMenuOpen(false)}>Income</Link>
              <Link to="/expense" className="hover:underline" onClick={() => setMenuOpen(false)}>Expense</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="hover:underline" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
