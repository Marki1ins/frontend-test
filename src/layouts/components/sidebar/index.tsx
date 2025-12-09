import { Link } from "@tanstack/react-router";
import "./index.css";

import { FaAddressCard, FaNewspaper } from "react-icons/fa6";
import { useState } from "react";

function SideBar() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="sidebar">
      <div>
        <ul className="menu-list">
          <li className="menu-item">
            <Link
              to="/"
              className={`menu-link ${selectedItem === "/" ? "active" : ""}`}
              onClick={() => handleItemClick("/")}
            >
              <FaAddressCard className="icon-size" />
              <span className="tooltip">CPF</span>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              to="/news"
              className={`menu-link ${selectedItem === "/news" ? "active" : ""}`}
              onClick={() => handleItemClick("/news")}
            >
              <FaNewspaper className="icon-size" />
              <span className="tooltip">Notícias</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;