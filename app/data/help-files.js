'use strict';

export const helpFile = {
  'help': {
    title: 'Here is a list of help files available to you. Type help <file> to learn more (e.g., "HELP MOVEMENT"):',
    text: [
      'LOOK',
      'GET',
      'DROP',
      'SAY',
      'WHISPER',
      'INVENTORY',
      'UNLOCK',
      'LOCK',
      'MOVEMENT',
      'WHO'
    ]
  },
  'look': {
    title: 'LOOK (shortcut: L)',
    text: 'By itself, LOOK or L will show you the room you\'re currently in, as well as any items and occupants. In development: LOOK <target>.'
  },
  'get': {
    title: 'GET <item>',
    text: 'GET <target> will pick up an item in the room and add it to your inventory. Every item has a handful of terms you can use to refer to it. For example, an item called "a small black key", which shows up in the room as, "A small black key with a simple carving of a noose on it lies here," could be targeted with GET KEY, GET SMALL, or GET BLACK. If you want to pick up a specific item, based on its order in the room, you can use dot notation with the index of the item you want. For example, if a room has two keys, and you want to pick up the second one, you could type GET 2.KEY.'
  },
  'drop': {
    title: 'DROP <item>',
    text: 'Will drop an item from your inventory into the room you\'re currently in. Every item has a handful of terms you can use to refer to it. For example, if your inventory has "a small black key", you can drop it with DROP KEY, DROP SMALL, or DROP BLACK. If you want to drop a specific item, based on its order in your inventory, you can use dot notation with the index of the item you want. For example, if you have two keys, and you want to drop the second one, you can type DROP 2.KEY.'
  },
  'SAY': {
    title: 'SAY <message>',
    text: 'Will have your character say something to everyone in your current room.'
  },
  'WHISPER': {
    title: 'WHISPER <target> <message>',
    text: 'Will send a private message to your target, if they are in the same room as you. This will alert your target that you\'ve whispered them a message, and alert everyone else in the room that you\'ve whispered something to that target, though they will not see what it is.'
  }
};
