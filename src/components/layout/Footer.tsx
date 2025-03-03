import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 py-4">
      <div className="container mx-auto px-4 text-center text-white text-sm">
        © {new Date().getFullYear()} Sistema de Asistencia. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;