import React, { Component } from "react";
import axios from "axios";
import Card from "../main-ui/Card";
import "./RestaurantsList.css";
import AddRestaurantForm from "./AddRestaurantForm";
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
      console.log(this.state);
    }
  }
  render() {
    return (
      <div>
        Restaurants List
        <button onClick={this.handleAddFormClick}>Add</button>
        {this.state.showForm && <AddRestaurantForm />}
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
