import React from "react";
import "./styles/filter.css";

class Filter extends React.Component {
  handleFavoritesClick = () => {
    const { onFavoriteFilter } = this.props;
    if (onFavoriteFilter) {
      onFavoriteFilter(true);
    }
  };

  handleAllClick = () => {
    const { onFavoriteFilter } = this.props;
    if (onFavoriteFilter) {
      onFavoriteFilter(false);
    }
  };

  render() {
    return (
      <div>
        <div className="filter">
          Sort:
          <span className="filter-button" onClick={this.props.onSortAZ}>
            A-Z
          </span>
          |
          <span className="filter-button" onClick={this.props.onSortZA}>
            Z-A
          </span>
        </div>
        <div className="filter">
          Filter:
          <span className="filter-button" onClick={this.handleFavoritesClick}>
            Favorites
          </span>
          |
          <span className="filter-button" onClick={this.handleAllClick}>
            All
          </span>
        </div>
        <div className="filter">
          <span className="filter-button" onClick={this.props.onClearCache}>
            Clear Cache
          </span>
        </div>
      </div>
    );
  }
}

export default Filter;
