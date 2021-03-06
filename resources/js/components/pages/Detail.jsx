import React, { Component } from "react";
import axios from "axios";
import Button from "../main-ui/Button";
import "../../../css/Detail.css";
import PopUpMessage from "../main-ui/PopUpMessage";
import EditRestaurantForm from "./EditRestaurantForm";
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: window.location.pathname.split("/").at(-1),
      imgURL: [],
      name: "",
      introduction: "",
      menu: "",
      "active-time": "",
      edit: false,
      delete: false,
      deletedMessage: false,
      popUpMessage: false,
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  async componentDidMount() {
    await fetch(
      "http://127.0.0.1:8000/api/restaurant-image/" + this.state.id
    ).then((data) => this.setState({ imgURL: data.url }));
    await axios
      .get(`http://127.0.0.1:8000/api/restaurants/${this.state.id}`)
      .then((restaurant) => restaurant.data)
      .then((data) => {
        if (data.status == 200) {
          data = data.data;
          this.setState({
            name: data.name,
            introduction: data.introduction,
            menu: data.menu,
            active_time: data.active_time,
          });
        } else {
          this.setState({
            popUpMessage: true,
          });
          setTimeout(function () {
            window.location.replace("/RestaurantsList");
          }, 3000);
        }
      });
  }
  handleEditClick = () => {
    this.setState((state) => {
      return { edit: !state.edit };
    });
  };
  handleDeleteClick = () => {
    this.setState((state) => {
      return { delete: !state.delete };
    });
  };
  deleteRestaurant = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/restaurants/${this.state.id}`)
      .then((res) => {
        this.setState((state) => {
          return {
            delete: false,
            deletedMessage: true,
          };
        });
        setTimeout(function () {
          window.location.replace("/RestaurantsList");
        }, 3000);
      });
  };
  render() {
    let i = 0;
    return (
      <div>
        {!this.state.popUpMessage && (
          <div className="detail-container">
            <img src={this.state.imgURL} alt="Restaurant image" />
            <div className="detail-card">
              <div className="restaurant-id">
                Restaurant's ID: #{this.state.id}
              </div>
              <div className="name">{this.state.name}</div>
              <div className="introduction">
                {this.state.introduction &&
                  this.state.introduction
                    .split("\n")
                    .map((line) => <div key={++i}>{line}</div>)}
              </div>
              <div className="menu">
                <div className="Label">Menu</div>
                {this.state.menu &&
                  this.state.menu
                    .split("\n")
                    .map((line) => <div key={++i}>{line}</div>)}
              </div>
              <div className="active_time">
                <div className="Label">Active time</div>
                {typeof this.state.active_time == "string" &&
                  this.state.active_time
                    .split("\n")
                    .map((line) => <div key={++i}>{line}</div>)}
              </div>
              <div className="control-container">
                <Button
                  btnStyle="edit"
                  btnSize="btn-normal"
                  btnClick={this.handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  btnStyle="delete"
                  btnSize="btn-normal"
                  btnClick={this.handleDeleteClick}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
        {this.state.edit && (
          <EditRestaurantForm
            handle={this.handleEditClick}
            id={this.state.id}
            name={this.state.name}
            introduction={this.state.introduction}
            menu={this.state.menu}
            active_time={this.state.active_time}
          />
        )}
        {this.state.delete && (
          <div className="deleteConfirm-ctn">
            Do you really want to delete this restaurant's information
            <div className="deleteConfirm-btn">
              <Button btnStyle="delete" btnClick={this.deleteRestaurant}>
                Yes
              </Button>
              <Button btnClick={this.handleDeleteClick}>No</Button>
            </div>
          </div>
        )}
        {this.state.deletedMessage && (
          <PopUpMessage>
            Deleted Successfully
            <br />
            You will be redirected in 3 seconds
          </PopUpMessage>
        )}
        {this.state.popUpMessage && (
          <PopUpMessage messageStyle="redPopUp">
            You don't have permission to view the detail
          </PopUpMessage>
        )}
      </div>
    );
  }
}
