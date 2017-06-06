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
    text: 'By itself, LOOK or L will show you the room you\'re currently in, as well as any items and occupants. Items in the room are displayed in the order they originally started in, or in the order they were added (perhaps via the DROP command).'
  },
  'get': {
    title: 'GET <item>',
    text: 'GET <target> will pick up an item in the room and add it to your inventory. Every item has a handful of terms you can use to refer to it. For example, an item called "a small black key", which shows up in the room as, "A small black key with a simple carving of a noose on it lies here," could be targeted with GET KEY, GET SMALL, or GET BLACK. If you want to pick up a specific item, based on its order in the room, you can use dot notation with the index of the item you want. For example, if a room has two keys, and you want to pick up the second one, you could type GET 2.KEY.'
  },
  'drop': {
    title: 'DROP <item>',
    text: 'Will drop an item from your inventory into the room you\'re currently in. Every item has a handful of terms you can use to refer to it. For example, if your inventory has "a small black key", you can drop it with DROP KEY, DROP SMALL, or DROP BLACK. If you want to drop a specific item, based on its order in your inventory, you can use dot notation with the index of the item you want. For example, if you have two keys, and you want to drop the second one, you can type DROP 2.KEY.'
  },
  'say': {
    title: 'SAY <message>',
    text: 'Will have your character say something to everyone in your current room.'
  },
  'whisper': {
    title: 'WHISPER <target> <message>',
    text: 'Will send a private message to your target, if they are in the same room as you. This will alert your target that you\'ve whispered them a message, and alert everyone else in the room that you\'ve whispered something to that target, though they will not see what it is.'
  },
  'inventory': {
    title: 'INVENTORY (shortcuts: I or INV)',
    text: 'Will display the contents of your inventory. If you have multiples of the same item, they will be displayed with parenthetical notation. For example, if you have two red potions, you would see "(2) a red potion". Items are tracked in your inventory in the order you picked them up.'
  },
  'unlock': {
    title: 'UNLOCK <direction>',
    text: 'Some exits are locked, meaning you cannot move through them until they are unlocked. These exits will be displayed with parentheses around them. To unlock an exit, you will need to have the correct key in your inventory. For example, if "a small black key" is needed to unlock the east exit, you would need to have "a small black key" in your inventory, then type UNLOCK EAST or UNLOCK E.'
  },
  'lock': {
    title: 'LOCK <direction>',
    text: 'If an exit has been unlocked, but you want to lock it back up, you can do so by using LOCK <direction> if you have the correct key. For example, if an east exit requires "a small black key" to be unlocked and you are holding "a small black key", you can type LOCK EAST or LOCK E.'
  },
  'movement': {
    title: 'UP DOWN EAST WEST NORTH SOUTH (shortcuts: U D E W N S)',
    text: 'In order to move from one room to the other, you simply type the exit you want to use, typically a cardinal direction. For example, if a room has exits: [ down  east ], you can type DOWN or EAST in order to move in either direction. If an exit has parentheses around it, it is locked and cannot be moved through unless it is unlocked with the correct key.'
  },
  'who': {
    title: 'WHO',
    text: 'Will show you all players currently connected, including yourself.'
  }
};
