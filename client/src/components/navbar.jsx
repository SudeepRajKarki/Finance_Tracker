import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button
        onClick={() => navigate(user ? '/dashboard' : '/')}
        className="text-xl font-bold"
      >
        FinTrack
      </button>

      <div className="space-x-4">
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
    </nav>
  );
};

export default Navbar;
