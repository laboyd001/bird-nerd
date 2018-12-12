import React, { Component } from "react";
import APIManager from "../../modules/APIManager";

export default class Search extends Component {
  token = null;
  state = {
    query: "",
    birds: []
  };

  handleSearch = evt => {
    const { value } = evt.target;
    this.setState({
      query: value
    });
    this.search(value);
  };

  search = query => {
    const token = {};
    this.token = token;
    APIManager.getAllEntries("birds", `?name=${query}`).then(data => {
      if (this.token === token) this.setState({ birds: data.results });
    });
  };

  componentDidMount() {
    this.search("");
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="search-box"
          placeholder="Search for..."
          onChange={this.handleSearch}
        />
        {this.state.birds}
      </div>
    );
  }
}
