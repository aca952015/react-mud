'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export const HelpFile = props => {
  // helpObj.text is an array of paragraphs. Each text file will be a <ul> of
  // paragraphs, styled as <li>s. This gives more control over spreading text
  // out to be more readable. dangerouslySetInnerHtml is used to parse the
  // spans in the help text for highlighted words.
  const helpText = props.helpObj.text.map((file, i) => <li key={i} dangerouslySetInnerHTML={{__html: file}}></li>);
  return <div className="help-file">
    <h3 dangerouslySetInnerHTML={{__html: props.helpObj.title}}></h3>
    <ul>{helpText}</ul>
  </div>;
};

HelpFile.propTypes = {
  helpObj: PropTypes.object
};
