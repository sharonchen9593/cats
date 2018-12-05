import React from "react";
import Navigation from "./Navigation";
import Filter from "./Filter";
import CatsContainer from "./CatsContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./styles/app.css";
import "babel-polyfill";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      favorites: {},
      isLoading: true,
      selected: undefined,
      showFavoritesOnly: false
    };
  }

  componentDidMount() {
    this.getCatData();
  }

  getCatData = () => {
    let data = [];
    let favorites = {};
    if (localStorage.catData) {
      try {
        data = JSON.parse(localStorage.catData);
      } catch (e) {
        alert(`Error when parsing catData: ${e}`);
      }
    } else {
      this.fetchCatData();
      return;
    }

    if (localStorage.favoritesData) {
      try {
        favorites = JSON.parse(localStorage.favoritesData);
      } catch (e) {
        alert(`Error when parsing favoritesData: ${e}`);
      }
    }

    this.setState({ data, favorites, isLoading: false });
  };

  fetchCatData = async () => {
    try {
      const [fetchImagesResult, fetchFactsResult] = await Promise.all([
        fetch(
          "https://cors-anywhere.herokuapp.com/http://thecatapi.com/api/images/get?format=json&results_per_page=25"
        ),
        fetch(
          "https://cors-anywhere.herokuapp.com/https://catfact.ninja/facts?limit=25"
        )
      ]);

      // nullcheck fetchimage and fetchfacts
      const [images, facts] = await Promise.all([
        fetchImagesResult.json(),
        fetchFactsResult.json()
      ]);

      this.mergeCatData(images, facts.data || []);
    } catch (e) {
      alert(`Error when parsing favoritesData: ${e}`);
    }
  };

  mergeCatData = (images, facts) => {
    const data = images.map((image, i) => {
      const { id, url } = image;
      const fact = facts[i].fact;
      let lastWord = fact.split(" ");
      lastWord = lastWord[lastWord.length - 1];
      return { id, url, fact, lastWord };
    });
    try {
      localStorage.catData = JSON.stringify(data);
      this.setState({ data, isLoading: false });
    } catch (e) {
      alert(`Error when stringifying catData: ${e}`);
    }
  };

  handleCardClick = id => {
    this.setState({ selected: id });
  };

  handleFavoriteClick = id => {
    const favorites = Object.assign({}, this.state.favorites);
    favorites[id] = !favorites[id];

    try {
      localStorage.favoritesData = JSON.stringify(favorites);
      this.setState({ favorites });
    } catch (e) {
      alert(`Error when stringifying favorites: ${e}`);
    }
  };

  handleFavoriteFilter = showFavoritesOnly => {
    this.setState({ showFavoritesOnly });
  };

  compare = (a, b) => {
    const lastWordA = a.lastWord.toUpperCase();
    const lastWordB = b.lastWord.toUpperCase();
    if (lastWordA < lastWordB) {
      return -1;
    }
    if (lastWordA > lastWordB) {
      return 1;
    }
    return 0;
  };

  handleSortAZ = () => {
    const { data } = this.state;
    const sortedData = data.sort((a, b) => {
      return this.compare(a, b);
    });
    this.setState({ data: sortedData });
  };

  handleSortZA = () => {
    const { data } = this.state;
    const sortedData = data.sort((a, b) => {
      return this.compare(b, a);
    });
    this.setState({ data: sortedData });
  };

  handleClearCache = () => {
    delete localStorage.catData;
    delete localStorage.favoritesData;
    this.setState({ isLoading: true });
    location.reload(true);
  };

  renderLoadingSpinner = () => {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  };

  render() {
    const {
      data,
      favorites,
      isLoading,
      selected,
      showFavoritesOnly
    } = this.state;
    return (
      <div className="app">
        <Navigation />
        <Filter
          onFavoriteFilter={this.handleFavoriteFilter}
          onSortAZ={this.handleSortAZ}
          onSortZA={this.handleSortZA}
          onClearCache={this.handleClearCache}
        />
        {isLoading && this.renderLoadingSpinner()}
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
