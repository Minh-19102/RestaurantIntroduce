import axios from "axios";
import React, { Component } from "react";
import "./AddRestaurantForm.css";
export default class AddRestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      introduction: "",
      menu: "",
      active_time: "",
      "restaurant-image": "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }
  saveRestaurant = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/restaurants", this.state);
    if (res.data.status == 200) {
      console.log(res.data.message);
      this.setState({
        name: "",
        introduction: "",
        menu: "",
        active_time: "",
        "restaurant-image": "",
      });
    }
  };
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleFileSelect = (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      this.setState({
        "restaurant-image": event.target.result,
      });
    };
  };
  render() {
    return (
      <div className="add-form">
        <form onSubmit={this.saveRestaurant}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            size="38"
            onChange={this.handleInputChange}
            value={this.state.name}
          />

          <label htmlFor="introduction">Introduction</label>
          <textarea
            name="introduction"
            rows="4"
            cols="40"
            onChange={this.handleInputChange}
            value={this.state.introduction}
          ></textarea>

          <label htmlFor="menu">Menu</label>

          <textarea
            name="menu"
            rows="4"
            cols="40"
            onChange={this.handleInputChange}
            value={this.state.menu}
          ></textarea>

          <label htmlFor="active_time">Active Time</label>

          <textarea
            name="active_time"
            rows="4"
            cols="40"
            onChange={this.handleInputChange}
            value={this.state.active_time}
          ></textarea>

          <label htmlFor="image">Choose an image </label>
          <input
            type="file"
            name="restaurant-image"
            accept="image/*"
            onChange={this.handleFileSelect}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
