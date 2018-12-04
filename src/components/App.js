import React from "react";
import Navigation from "./Navigation";
import Filter from "./Filter";
import CatsContainer from "./CatsContainer";
import "./styles/app.css";
import "babel-polyfill";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: undefined,
      favorites: {}
    };
  }

  componentDidMount() {
    const catImages = this.getCatData();
  }

  getCatData = async () => {
    try {
      const fetchImagesResult = await fetch(
        "https://cors-anywhere.herokuapp.com/http://thecatapi.com/api/images/get?format=json&results_per_page=25"
      );

      const images = await fetchImagesResult.json();

      const fetchFactsResult = await fetch(
        "https://cors-anywhere.herokuapp.com/https://catfact.ninja/facts?limit=25"
      );

      const facts = await fetchFactsResult.json();

      this.mergeCataData(images, facts.data);
    } catch (e) {
      console.log(e);
    }
  };

  mergeCataData = (images, facts) => {
    const data = images.map((image, i) => {
      const { id, url } = image;
      const fact = facts[i].fact;
      return { id, url, fact };
    });

    this.setState({ data });
  };

  handleCardClick = id => {
    this.setState({ selected: id });
  };

  handleFavoriteClick = id => {
    const favorites = Object.assign({}, this.state.favorites);
    if (favorites[id]) {
      favorites[id] = false;
    } else {
      favorites[id] = true;
    }
    this.setState({ favorites });
  };

  render() {
    const { data, favorites, selected } = this.state;
    return (
      <div className="app">
        <Navigation />
        <Filter />
        <CatsContainer
          data={data}
          onCardClick={this.handleCardClick}
          onFavoriteClick={this.handleFavoriteClick}
          selected={selected}
          favorites={favorites}
        />
      </div>
    );
  }
}

export default App;
