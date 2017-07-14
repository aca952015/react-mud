'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {HelpFile} from '../../app/components/help-file.jsx';
import {helpFile} from '../../app/data/help-files.js';

describe('<HelpFile /> with the say help file', () => {
  const helpObj = helpFile['say'];
  const help = shallow(<HelpFile helpObj={helpObj}/>);

  it('Creates a single <HelpFile /> node', () => {
    expect(help.length).toEqual(1);
  });

  it('Should have an h3 tag that says "SAY <message>"', () => {
    expect(help.find('h3').props().dangerouslySetInnerHTML.__html).toEqual('<span class="highlight">SAY {message}</span>');
  });

  it('Should have a li that says "Will have your character say something to everyone in your current room."', () => {
    expect(help.find('li').first().props().dangerouslySetInnerHTML.__html).toEqual('Will have your character say something to everyone in your current room.');
  });

  it('should show a UL with an li containing all the help files when just help is entered', () => {
    const helpObj = helpFile['help'];
    const help = shallow(<HelpFile helpObj={helpObj} />);
    expect(help.find('li').first().props().dangerouslySetInnerHTML.__html).toEqual(`<span class="help-topics">COMBAT</span>
      <span class="help-topics">COMMUNICATION</span>
      <span class="help-topics">DEATH</span>
      <span class="help-topics">EQUIPMENT</span>
      <span class="help-topics">FUZZY MATCHING</span>
      <span class="help-topics">ITEMS</span>
      <span class="help-topics">MOVEMENT</span>
      <span class="help-topics">PREVIOUS COMMANDS</span>
      <span class="help-topics">SAVING CHARACTERS</span>`);
  });
});
