'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const PlayerDescription = props => {
  const paragraphs = props.description.map((paragraph, i) => <li key={i}>{paragraph}</li>);
  return <ul className="player-description">
    {paragraphs}
  </ul>;
};

PlayerDescription.propTypes = {
  description: PropTypes.array
};
