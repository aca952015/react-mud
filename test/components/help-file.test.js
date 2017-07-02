'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {HelpFile} from '../../app/components/help-file.jsx';
import {helpFile} from '../../app/data/help-files.js';

describe('<HelpFile /> with the say help file', () => {
  const message = {
    helpObj: helpFile['say']
  };
  const help = shallow(<HelpFile message={message}/>);

  it('Creates a single <HelpFile /> node', () => {
    expect(help.length).toEqual(1);
  });

  it('Should have an h3 tag that says "SAY <message>"', () => {
    expect(help.nodes[0].props.children[0].props.children).toEqual('SAY <message>');
    expect(help.find('h3').length).toEqual(1);
  });

  it('Should have a p tag that says "Will have your character say something to everyone in your current room."', () => {
    expect(help.find('p').length).toEqual(1);
    expect(help.nodes[0].props.children[1].props.children).toEqual('Will have your character say something to everyone in your current room.');
  });

  it('should show an UL with li elements for all the help files when just help is entered', () => {
    const message = {
      helpObj: helpFile['help']
    };
    const help = shallow(<HelpFile message={message} />);
    expect(help.find('li').first().text()).toEqual('DRINK');
    expect(help.find('li').at(1).text()).toEqual('DROP');
    expect(help.find('li').last().text()).toEqual('WHO');
  });
});
