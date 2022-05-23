import React from "react";
import { Link } from "react-router-dom";
import "../../../css/Navbar.css";
import Button from "./Button";
import logo from "../../../asset/image/logo.png";
import axios from "axios";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: !(window.innerWidth <= 900),
      mobile: window.innerWidth <= 900,
      login: localStorage.getItem("username"),
    };
    this.handleClick = this.handleClick.bind(this);
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 900) {
        this.setState({
          mobile: true,
          click: false,
        });
      } else {
        this.setState({
          mobile: false,
          click: true,
        });
      }
    });
  }
  async componentDidMount() {
    await axios.get("/api/user").then((data) => {
      console.log(data);
    });
  }
  handleClick() {
    this.setState((state) => {
      return { click: !state.click };
    });
  }

  closeMenu() {}
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-Container">
            <Link to="/" className="navbar-logo">
              <img className="logo" src={logo}></img>
              <span className="page-name">NimiRes</span>
            </Link>
            {this.state.mobile ? (
              <div
                className={
                  "nav-menu-icon " + (this.state.click ? "change" : "")
                }
                onClick={this.handleClick}
              >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            ) : (
              <></>
            )}
            <ul
              className={
                "nav-menu " +
                (this.state.click ? "active " : "") +
                (this.state.mobile ? " mobile " : "")
              }
            >
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={this.closeMenu}>
                  <Button btnStyle="btn-navbar-type" btnSize="btn-normal">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AboutUs" className="nav-link">
                  <Button btnStyle="btn-navbar-type" btnSize="btn-normal">
                    About Us
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/RestaurantsList" className="nav-link">
                  <Button btnStyle="btn-navbar-type" btnSize="btn-normal">
                    Restaurants List
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Contact" className="nav-link">
                  <Button btnStyle="btn-navbar-type" btnSize="btn-normal">
                    Contact
                  </Button>
                </Link>
              </li>
              {!this.state.login ? (
                <li className="nav-item">
                  <Link to="/Login" className="nav-link">
                    <Button btnStyle="btn-navbar-type" btnSize="btn-normal">
                      Login
                    </Button>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <Button
                      btnStyle="btn-navbar-type"
                      btnSize="btn-normal"
                      btnClick={() => {
                        localStorage.removeItem("username");
                        localStorage.removeItem("access_token");
                        this.setState((state) => ({ login: !state.login }));
                      }}
                    >
                      Logout
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
