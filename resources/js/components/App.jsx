import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./main-ui/Navbar";
import Home from "./pages/Home";
import RestaurantsList from "./pages/RestaurantsList";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Detail from "./pages/Detail";
import "./App.css";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/RestaurantsList" element={<RestaurantsList />} />
          <Route path="/RestaurantsList/:pathParam" element={<Detail />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
