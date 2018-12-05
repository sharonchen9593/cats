import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./styles/card.css";

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.objectOf(PropTypes.bool),
  onCardClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  selected: PropTypes.string,
  url: PropTypes.string
};

const CatsContainer = ({
  data,
  favorites,
  onCardClick,
  onFavoriteClick,
  selected,
  showFavoritesOnly
}) => {
  const renderCards = () => {
    return data
      .filter(cat => {
        if (showFavoritesOnly) {
          return favorites[cat.id];
        }
        return true;
      })
      .map(cat => {
        return (
          <Card
            fact={cat.fact}
            favorite={favorites[cat.id]}
            id={cat.id}
            key={cat.id}
            onClick={onCardClick}
            onFavoriteClick={onFavoriteClick}
            selected={!selected || selected === cat.id}
            url={cat.url}
          />
        );
      });
  };

  return <div className="cats-container">{renderCards()}</div>;
};

CatsContainer.propTypes = propTypes;

export default CatsContainer;
