import React from "react";
import PropTypes from "prop-types";
import "./styles/filter.css";

const propTypes = {
  onClearCache: PropTypes.func,
  onFavoriteFilter: PropTypes.func,
  onSortAZ: PropTypes.func,
  onSortZA: PropTypes.func
};

const Filter = ({ onClearCache, onFavoriteFilter, onSortAZ, onSortZA }) => {
  const handleFavoritesClick = () => {
    if (onFavoriteFilter) {
      onFavoriteFilter(true);
    }
  };

  const handleAllClick = () => {
    if (onFavoriteFilter) {
      onFavoriteFilter(false);
    }
  };

  return (
    <div>
      <div className="filter">
        Sort:
        <span className="filter-button" onClick={onSortAZ}>
          A-Z
        </span>
        |
        <span className="filter-button" onClick={onSortZA}>
          Z-A
        </span>
      </div>
      <div className="filter">
        Filter:
        <span className="filter-button" onClick={handleFavoritesClick}>
          Favorites
        </span>
        |
        <span className="filter-button" onClick={handleAllClick}>
          All
        </span>
      </div>
      <div className="filter">
        <span className="filter-button" onClick={onClearCache}>
          Clear Cache
        </span>
      </div>
    </div>
  );
};

Filter.propTypes = propTypes;

export default Filter;
