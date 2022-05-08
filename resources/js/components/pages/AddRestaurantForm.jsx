import axios from "axios";
import React, { Component } from "react";
import "../../../css/AddRestaurantForm.css";
import Button from "../main-ui/Button";
import PopUpMessage from "../main-ui/PopUpMessage";
export default class AddRestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      introduction: "",
      menu: "",
      active_time: "",
      "restaurant-image": "",
      message: false,
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
        message: true,
      });
      setTimeout(function () {
        window.location.replace("/RestaurantsList");
      }, 3000);
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
        <Button
          btnStyle="delete"
          btnClick={this.props.handle}
          btnSize="btn-normal"
        >
          Exit
        </Button>
        <form onSubmit={this.saveRestaurant} className="main-form">
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
            rows="2"
            cols="40"
            onChange={this.handleInputChange}
            value={this.state.menu}
          ></textarea>

          <label htmlFor="active_time">Active Time</label>

          <textarea
            name="active_time"
            rows="2"
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
          <div className="submit-ctn">
            <Button btnStyle="add">
              <input className="submit-btn" type="submit" value="Submit" />
            </Button>
          </div>
        </form>
        {this.state.message && (
          <PopUpMessage>
            Added Succeffully
            <br />
            You will be redirected in 3 seconds
          </PopUpMessage>
        )}
      </div>
    );
  }
}
