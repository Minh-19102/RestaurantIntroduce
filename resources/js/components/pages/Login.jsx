import axios from "axios";
import { Component } from "react";
import "../../../css/Login.css";
export default class EntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "logIn",
      username: "",
      email: "",
      password: "",
    };
  }

  changeView = (view) => {
    this.setState({
      currentView: view,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRegistration = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/registration", {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("/api/login", {
        name: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        if (response.data.status == 200) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          window.location.replace("/");
        }
      });
  };

  currentView = () => {
    switch (this.state.currentView) {
      case "signUp":
        return (
          <form>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    onChange={this.handleInputChange}
                  />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={this.handleInputChange}
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={this.handleInputChange}
                  />
                </li>
              </ul>
            </fieldset>
            <button onClick={this.handleRegistration}>Submit</button>
            <button type="button" onClick={() => this.changeView("logIn")}>
              Have an Account?
            </button>
          </form>
        );
        break;
      case "logIn":
        return (
          <form>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    onChange={this.handleInputChange}
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={this.handleInputChange}
                  />
                </li>
                <li>
                  <i />
                  <a onClick={() => this.changeView("PWReset")} href="#">
                    Forgot Password?
                  </a>
                </li>
              </ul>
            </fieldset>
            <button onClick={this.handleLogin}>Login</button>
            <button type="button" onClick={() => this.changeView("signUp")}>
              Create an Account
            </button>
          </form>
        );
        break;
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => this.changeView("logIn")}>
              Go Back
            </button>
          </form>
        );
      default:
        break;
    }
  };

  render() {
    return <section id="entry-page">{this.currentView()}</section>;
  }
}
