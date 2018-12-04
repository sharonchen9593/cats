import React from "react";
import Card from "./Card";
import "./styles/card.css";

class CatsContainer extends React.Component {
  renderCards = () => {
    const {
      data,
      selected,
      onCardClick,
      onFavoriteClick,
      favorites,
      showFavoritesOnly
    } = this.props;
    return data
      .filter(cat => {
        if (showFavoritesOnly) {
          return favorites[cat.id];
        } else {
          return true;
        }
      })
      .map(cat => {
        return (
          <Card
            key={cat.id}
            id={cat.id}
            url={cat.url}
            fact={cat.fact}
            onClick={onCardClick}
            onFavoriteClick={onFavoriteClick}
            selected={!selected || selected === cat.id}
            favorite={favorites[cat.id]}
          />
        );
      });
  };

  render() {
    return <div className="cats-container">{this.renderCards()}</div>;
  }
}

export default CatsContainer;
