import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const MenuItems = ({ mobileMenu }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const handleClick = (e) => {
    if (mobileMenu) {
      e.preventDefault();
    }
  };

  return (
    <ul>
      <li>
        <Link to="/" onClick={handleClick}>
          <span>Home</span>
        </Link>
      </li>

      <li>
        <Link to="/tabs/grafos" onClick={handleClick}>
          <span>Grafos</span>
        </Link>
      </li>
      <li>
        <Link to="/tabs/north" onClick={handleClick}>
          <span>Norwest </span>
        </Link>
      </li>
      <li>
        <Link to="/tabs/sort" onClick={handleClick}>
          <span>Sorts</span>
        </Link>
      </li>
      <li>
        <ThemeToggle />
      </li>

    </ul>
    
  );
}; export default MenuItems;
