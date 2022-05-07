import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import Card from "../main-ui/Card";
import "./RestaurantsList.css";
import AddRestaurantForm from "./AddRestaurantForm";
import Button from "../main-ui/Button";
export default class RestaurantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantsList: [],
      loaded: false,
      showForm: false,
    };
    this.handleAddFormClick = this.handleAddFormClick.bind(this);
  }
  handleAddFormClick(e) {
    this.setState((state) => {
      return { showForm: !state.showForm };
    });
  }
  async componentDidMount() {
    const res = await axios.get("http://127.0.0.1:8000/api/restaurants");
    if (res.status == 200) {
      this.setState({
        restaurantsList: res.data,
        loaded: true,
      });
    }
  }
  render() {
    return (
      <div>
        <div className="title">Restaurants List</div>
        <Button btnStyle="add" btnClick={this.handleAddFormClick}>
          Add
        </Button>
        {this.state.showForm && (
          <AddRestaurantForm handle={this.handleAddFormClick} />
        )}
        <div className="list-container">
          {this.state.loaded &&
            this.state.restaurantsList.map((restaurant) => (
              <Card
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                introduction={restaurant.introduction}
              />
            ))}
        </div>
      </div>
    );
  }
}
