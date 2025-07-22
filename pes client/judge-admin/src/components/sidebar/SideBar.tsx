import "./_.scss";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiFlag} from "react-icons/fi";
import { BiPowerOff } from "react-icons/bi";

export const SideBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Events");
  const navigate = useNavigate();

  const navBarItems = [
    { name: "Evaluation", icon: <FiFlag />, path: "/" },
   
  ];

  return (
    <div id="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        <h2>Judgify</h2>
      </div>

      <div className="sidebar-menu">
        <ul>
          <ul>
            {navBarItems.map((item) => (
              <div key={item.name}>
                <li
                  className={activeItem === item.name ? "active" : "active"}
                  onClick={() => {
                    setActiveItem(item.name);
                    navigate(item.path);
                  }}
                >
                  <div className="menu-item">
                    <span
                      className={
                        activeItem === item.name ? "active-icon" : "icon"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </ul>
      </div>
      <div className="sidebar-footer">
        <span className="sidebar-footer-icon">
          <BiPowerOff />
        </span>
        <h2>Logout</h2>
      </div>
    </div>
  );
};
