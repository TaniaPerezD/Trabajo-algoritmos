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

      <li className="has-dropdown">
        <Link
          to="#"
          className={expandedMenu === 'nosotros' ? 'expanded' : ''}
          onClick={(e) => {
            e.preventDefault();
            toggleMenu('nosotros');
          }}
        >
          <span>Grafos</span>
        </Link>
        <ul className={expandedMenu === 'nosotros' ? 'submenu d-block' : 'submenu'}>
          <li>
            <Link to="/tabs/grafos" onClick={handleClick}>
              <span>Johnson </span>
            </Link>
          </li>
          <li>
            <Link to="/tabs/grafos" onClick={handleClick}>
              <span>Asignación </span>
            </Link>
          </li>
          
        </ul>
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
        <Link to="/tabs/tree" onClick={handleClick}>
          <span>Trees</span>
        </Link>
      </li>

      <li>
        <ThemeToggle />
      </li>

    </ul>
    
  );
}; export default MenuItems;
