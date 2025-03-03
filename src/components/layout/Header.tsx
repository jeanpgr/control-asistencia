import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClipboardList, UserPlus, Menu, X } from 'lucide-react';
import { useCurrentTime } from '../../hooks/useCurrentTime';

interface HeaderProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, toggleMenu }) => {
  const location = useLocation();
  const currentTime = useCurrentTime();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Sistema de Asistencia</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-medium">{currentTime}</div>
          {/* Menú para escritorio */}
          <nav className="hidden md:flex space-x-3">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-700'
                  : 'hover:bg-blue-700'
              }`}
            >
              <UserPlus className="h-5 w-5 mr-1" />
              <span>Registrar</span>
            </Link>
            <Link
              to="/registros"
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/registros'
                  ? 'bg-blue-700'
                  : 'hover:bg-blue-700'
              }`}
            >
              <ClipboardList className="h-5 w-5 mr-1" />
              <span>Ver Registros</span>
            </Link>
          </nav>
          {/* Botón hamburguesa para móviles */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full bg-blue-700 hover:bg-blue-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="Menú"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Menú móvil */}
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link
              onClick={toggleMenu}
              to="/"
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-700'
                  : 'hover:bg-blue-700'
              }`}
            >
              <UserPlus className="h-5 w-5 mr-1" />
              <span>Registrar</span>
            </Link>
            <Link
              onClick={toggleMenu}
              to="/registros"
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/registros'
                  ? 'bg-blue-700'
                  : 'hover:bg-blue-700'
              }`}
            >
              <ClipboardList className="h-5 w-5 mr-1" />
              <span>Ver Registros</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
