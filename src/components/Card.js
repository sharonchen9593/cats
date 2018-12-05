import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/card.css";

const propTypes = {
  fact: PropTypes.string,
  favorite: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  selected: PropTypes.bool,
  url: PropTypes.string
};

const Card = ({
  fact,
  favorite,
  id,
  onClick,
  onFavoriteClick,
  selected,
  url
}) => {
  const clsName = cn({
    ["card"]: true,
    ["card-selected"]: selected
  });

  const iconClsName = cn({
    ["favorite-icon"]: true,
    ["favorite-icon-true"]: favorite
  });

  const handleFocus = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleBlur = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleFavoriteClick = e => {
    if (onFavoriteClick) {
      onFavoriteClick(id);
    }
  };

  return (
    <div
      className={clsName}
      onBlur={handleBlur}
      onFocus={handleFocus}
      tabIndex="0"
    >
      <img className="card-image" src={url} />
      <div className="card-description">
        <div className={iconClsName} onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="card-fact">{fact}</div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;
export default Card;
