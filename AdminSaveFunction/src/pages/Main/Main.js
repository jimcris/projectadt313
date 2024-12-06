import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faVideo, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // Updated icons
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, [accessToken, navigate]);

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a href="/main/dashboard" style={{ color: 'violet' }}>
                <FontAwesomeIcon icon={faChartBar} className="nav-icon" /> Dashboard
              </a>
            </li>
            <li>
              <a href="/main/movies">
                <FontAwesomeIcon icon={faVideo} className="nav-icon" /> Movies
              </a>
            </li>
            <li className="logout">
              <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="nav-icon" /> Logout
              </a>
            </li>
          </ul>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
