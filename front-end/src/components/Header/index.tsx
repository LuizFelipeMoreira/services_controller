import React from 'react';
import './styles.scss';
import logo from '../../assets/img/logo.png';

export const Header = () => {
  return (
    <div className="header">
      <div className="gradient"></div>
      <div className=" bg-header">
        <div className="container header-content">
          <div className="logo">
            <img src={logo} alt="" height="28" />
            <h3 className="fw-bold">ServicePro</h3>
          </div>
          <div className="nav-icons">
            <div className="notification">
              <i className="fa-solid fa-bell"></i>
            </div>
            <div className="user">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
