import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
// import Collapse from "react-bootstrap/Collapse";

import { FONTS, COLORS } from "constants/theme";
import "css/sideNavBar.css";

const { innerHeight } = window;
const menuItems = [
  {
    title: "Home",
    //icon: "/icons/grid.svg",
    path: "/",
  },
  {
    title: "Admin Profile",
    //icon: "/icons/user.svg",
    path: "/admin/",
  },
  {
    title: "Member",
    //icon: "/icons/message.svg",
    path: "/home",
  },

  {
    title: "Settings",
    //icon: "/icons/settings.svg",
  },
  {
    text: "Messages",
    //icon: "/icons/message.svg",
  },
  {
    text: "Analytics",
    //icon: "/icons/pie-chart.svg",
  },
  {
    text: "File Manager",
    //icon: "/icons/folder.svg",
  },
  {
    text: "Orders",
    //icon: "/icons/shopping-cart.svg",
  },
  {
    text: "Saved Items",
    //icon: "/icons/heart.svg",
  },
  {
    text: "Analytics 1",
    //icon: "/icons/pie-chart.svg",
  },
  {
    text: "File Manager 1",
    //icon: "/icons/folder.svg",
  },
  {
    text: "Orders 1",
    //icon: "/icons/shopping-cart.svg",
  },
  {
    text: "Saved Items 1",
    //icon: "/icons/heart.svg",
  },
];

function MenuItem(props) {
  const { isExpanded, itemObj, onNavigate } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div
        key={itemObj.title}
        className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
        style={{ marginBottom: 0, marginLeft: !isExpanded && "-60px" }}
        onClick={() => {
          itemObj.subItems && setIsCollapsed(!isCollapsed);
          onNavigate(itemObj.path);
        }}
      >
        {itemObj.icon && (
          <img className="menu-item-icon" src={itemObj.icon} alt="" />
        )}
        {isExpanded && (
          <div className="menu-item-title">
            {itemObj.title}
            {itemObj.subItems && (
              <div style={{ marginRight: 10 }}>
                {isCollapsed ? (
                  <MdOutlineExpandLess size={20} />
                ) : (
                  <MdOutlineExpandMore size={20} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {isExpanded && isCollapsed && (
        <MenuSubItems
          subItems={itemObj.subItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
}
function MenuSubItems(props) {
  const { subItems, isCollapsed, onNavigate } = props;

  return (
    <>
      {isCollapsed && (
        <div
          style={{
            transition: " all 0.5s ease-out",
            transitionDelay: "250ms",
          }}
        >
          {subItems.map((subItemObj, index) => (
            <div
              key={`${subItemObj.title}+${index}`}
              className={"menu-sub-item"}
              style={{ marginBottom: 0 }}
              onClick={() => onNavigate(subItemObj.path)}
            >
              <img className="menu-item-icon" src={subItemObj.icon} alt="" />
              <p>{subItemObj.title}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
const SideNavBar = (isExpanded, setExpendState) => {
  let menuRef = useRef();
  const navigate = useNavigate();
  function onNavigate(url) {
    navigate(url);
  }

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setExpendState(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <>
      {/* <div
        style={{ position: "absolute", top: 5, right: 5, background: "blue" }}
        // onClick={() => setExpendState(!isExpanded)}
      >
        <button className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div> */}
      <div
        ref={menuRef}
        className={
          isExpanded
            ? "side-nav-container"
            : "side-nav-container side-nav-container-NX"
        }
        style={{
          position: "absolute",
          height: innerHeight,
          overflow: "hidden",
        }}
      >
        <div className="nav-upper">
          <div className="nav-heading">
            {isExpanded && (
              <div className="nav-brand">
                <img
                  src="/logo.png"
                  alt=""
                  style={{ width: 60, height: 40, alignSelf: "center" }}
                />
                <p style={{ ...FONTS.H2, color: "white" }}>Abc Qwerty</p>
              </div>
            )}
            <div
              onClick={() => setExpendState(!isExpanded)}
              style={{ display: "flex", width: 55, alignItems: "center" }}
            >
              {isExpanded ? (
                <button className="hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              ) : (
                <img
                  src="/logo.png"
                  alt=""
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: "center",
                    margin: "auto",
                    justifyContent: "center",
                  }}
                />
              )}
            </div>
          </div>
          <div
            className="nav-menu hide-y-scroll"
            style={{
              overflowY: "scroll",
              height: innerHeight - 170,
            }}
          >
            {menuItems.map((itemObj, index) => {
              return (
                <MenuItem
                  key={`${itemObj.title}+${index}`}
                  isExpanded={isExpanded}
                  itemObj={itemObj}
                  onNavigate={onNavigate}
                />
              );
            })}
          </div>
        </div>
        <div
          className="nav-footer"
          style={{
            justifyContent: !isExpanded && "center",
            alignItems: !isExpanded && "center",
          }}
        >
          {isExpanded && (
            <div className="nav-details" style={{ alignItems: "center" }}>
              <FaUserCircle style={{ width: 45, height: 45 }} />
              <div className="nav-footer-info">
                <p className="nav-footer-user-name">Welcome, </p>
                <p className="nav-footer-user-name">Aman Singh </p>
                <p
                  className="nav-footer-user-position"
                  onClick={() =>
                    navigate("/auth/logout/", {
                      replace: true,
                    })
                  }
                >
                  Log Out
                </p>
              </div>
            </div>
          )}

          <RiLogoutBoxLine
            style={{ width: 40, height: 40 }}
            onClick={() =>
              navigate("/auth/logout/", {
                replace: true,
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
