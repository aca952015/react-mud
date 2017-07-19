'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Skills = props => {
  const skillsSortedByLevel = Object.values(props.skills).reduce((acc, skill, i, arr) => {
    if (!acc[skill.level]) acc[skill.level] = arr.filter(skillObj => skillObj.level === skill.level);
    return acc;
  }, {});

  const skillBoxes = Object.keys(skillsSortedByLevel).map((skillLevel, i) => {
    return <li key={i} className="level-box">
      <p className="level">Level {skillLevel}:</p>
      <ul className="skill-list">
        {skillsSortedByLevel[skillLevel].map((skill, j) => <li key={j}>{skill.skillName}</li>)}
      </ul>
    </li>;
  });

  const dualBoxes = [];
  for (let i = 0; i < skillBoxes.length; i += 2) {
    dualBoxes.push(<ul key={`${i}dual`} className="dual-box">
      {skillBoxes[i]}
      {skillBoxes[i + 1]}
    </ul>);
  }


  return <div className="skills">
    <ul>{dualBoxes}</ul>
    <div className="clearfix" style={{clear: 'both'}}></div>
  </div>;
};

Skills.propTypes = {
  skills: PropTypes.object
};
