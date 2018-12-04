import React from "react";
import Card from "./Card";
import "./styles/card.css";

class CatsContainer extends React.Component {
  renderCards = data => {
    const { selected, onCardClick, onFavoriteClick, favorites } = this.props;
    return data.map(cat => {
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
    const { data } = this.props;
    return <div className="cats-container">{this.renderCards(data)}</div>;
  }
}

export default CatsContainer;
