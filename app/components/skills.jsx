'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const Skills = props => {
  // Create a hash map with keys of levels and values of arrays of all skills for that level
  const skillsSortedByLevel = Object.values(props.skills).reduce((acc, skill, i, arr) => {
    if (!acc[skill.level] && skill.level > 0) acc[skill.level] = arr.filter(skillObj => skillObj.level === skill.level);
    return acc;
  }, {});

  // Skills should be displayed in pairs of levels side by side, with a "tab" of the level
  // and then a list of all the skills learned at that level
  // e.g.:            Level 1:    Slash            Level 2: Searing light
  //                              Heal
  //                  Level 3:    Fireball         Level 4: Lightning bolt
  const skillBoxes = Object.keys(skillsSortedByLevel).map((skillLevel, i) => {
    return <li key={i} className="level-box">
      <p className="level">Level {skillLevel}:</p>
      <ul className="skill-list">
        {skillsSortedByLevel[skillLevel].map((skill, j) => <li key={j}>{`${skill.skillName[0].toUpperCase()}${skill.skillName.slice(1)}`}</li>)}
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
