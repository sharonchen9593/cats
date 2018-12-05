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
      favorites: {},
      showFavoritesOnly: false
    };
  }

  componentDidMount() {
    this.getCatData();
  }

  getCatData = () => {
    if (localStorage.catData) {
      const data = JSON.parse(localStorage.catData);
      this.setState({ data });
    } else {
      this.fetchCatData();
    }

    if (localStorage.favoritesData) {
      const favorites = JSON.parse(localStorage.favoritesData);
      this.setState({ favorites });
    }
  };

  fetchCatData = async () => {
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
      let lastWord = fact.split(" ");
      lastWord = lastWord[lastWord.length - 1];
      return { id, url, fact, lastWord };
    });
    localStorage.catData = JSON.stringify(data);
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
    localStorage.favoritesData = JSON.stringify(favorites);
    this.setState({ favorites });
  };

  handleFavoriteFilter = showFavoritesOnly => {
    this.setState({ showFavoritesOnly });
  };

  handleSortAZ = () => {
    const { data } = this.state;
    const sortedData = data.sort((a, b) => {
      const lastWordA = a.lastWord.toUpperCase();
      const lastWordB = b.lastWord.toUpperCase();
      if (lastWordA < lastWordB) {
        return -1;
      }
      if (lastWordA > lastWordB) {
        return 1;
      }
      return 0;
    });
    this.setState({ data: sortedData });
  };

  handleSortZA = () => {
    const { data } = this.state;
    const sortedData = data.sort((a, b) => {
      const lastWordA = a.lastWord.toUpperCase();
      const lastWordB = b.lastWord.toUpperCase();
      if (lastWordA < lastWordB) {
        return 1;
      }
      if (lastWordA > lastWordB) {
        return -1;
      }
      return 0;
    });
    this.setState({ data: sortedData });
  };

  handleClearCache = () => {
    delete localStorage.catData;
    delete localStorage.favoritesData;
  };

  render() {
    const { data, favorites, selected, showFavoritesOnly } = this.state;
    return (
      <div className="app">
        <Navigation />
        <Filter
          onFavoriteFilter={this.handleFavoriteFilter}
          onSortAZ={this.handleSortAZ}
          onSortZA={this.handleSortZA}
          onClearCache={this.handleClearCache}
        />
        <CatsContainer
          data={data}
          onCardClick={this.handleCardClick}
          onFavoriteClick={this.handleFavoriteClick}
          selected={selected}
          favorites={favorites}
          showFavoritesOnly={showFavoritesOnly}
        />
      </div>
    );
  }
}

export default App;
