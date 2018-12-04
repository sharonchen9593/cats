import React from "react";
import cn from "classnames";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFocus = () => {
    const { onClick, id } = this.props;
    if (onClick) {
      onClick(id);
    }
  };

  handleBlur = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  handleFavoriteClick = e => {
    const { onFavoriteClick, id } = this.props;
    if (onFavoriteClick) {
      onFavoriteClick(id);
    }
  };

  render() {
    const { id, url, fact, selected, favorite } = this.props;
    const clsName = cn({
      ["card"]: true,
      ["card-selected"]: selected
    });

    const iconClsName = cn({
      ["favorite-icon"]: true,
      ["favorite-icon-true"]: favorite
    });

    return (
      <div
        className={clsName}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex="0"
      >
        <img className="card-image" src={url} />
        <div className="card-description">
          <div className={iconClsName} onClick={this.handleFavoriteClick}>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="card-fact">{fact}</div>
        </div>
      </div>
    );
  }
}

export default Card;
