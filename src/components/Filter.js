import React from "react";

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
        <div>
          <span onClick={this.props.onSortAZ}>A-Z</span> |{" "}
          <span onClick={this.props.onSortZA}>Z-A</span>
        </div>
        <div>
          <span onClick={this.handleFavoritesClick}>Favorites</span> |{" "}
          <span onClick={this.handleAllClick}>All</span>
        </div>
      </div>
    );
  }
}

export default Filter;
