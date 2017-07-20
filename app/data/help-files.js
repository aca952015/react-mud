'use strict';

export const helpFile = {
  'help': {
    title: 'Here is a list of categories you can find help on. Type <span class="highlight">help {category}</span> to see a list of help files associated with that category (e.g., "HELP ITEMS").',
    text: [
      `<span class="help-topics">COMBAT</span>
      <span class="help-topics">COMMUNICATION</span>
      <span class="help-topics">DEATH</span>
      <span class="help-topics">EQUIPMENT</span>
      <span class="help-topics">FUZZY MATCHING</span>
      <span class="help-topics">ITEMS</span>
      <span class="help-topics">MOVEMENT</span>
      <span class="help-topics">PREVIOUS COMMANDS</span>
      <span class="help-topics">SAVING CHARACTERS</span>`
    ]
  },
  'auto_attacks': {
    title: 'AUTO ATTACKS',
    text: ['Players and enemies will automatically attack with their equipped weapon(s) every combat tick (HELP TICKS). A target is randomly selected from all enemies a combatant is currently engaged with, then base attack (ATK) is added to equipment bonuses, before subtracting enemy defenses. Auto attacks cannot deal less than 1 damage.']
  },
  'combat': {
    title: 'Here is a list of topics related to COMBAT. Type <span class="highlight">help {file}</span> to see more information.',
    text: [
      `<span class="help-topics">KILL</span>
      <span class="help-topics">AUTO_ATTACKS</span>
      <span class="help-topics">SKILLS</span>
      <span class="help-topics">TICKS</span>`
    ]
  },
  'communication': {
    title: 'Here is a list of topics related to communicating with other players. Type <span class="highlight">help {file}</span> for more information.',
    text: [
      `<span class="help-topics">DESCRIPTION</span>
      <span class="help-topics">SAY</span>
      <span class="help-topics">WHISPER</span>
      <span class="help-topics">WHO</span>`
    ]
  },
  'death': {
    title: 'Death',
    text: [
      'If your character is reduced to 0 or less HP, you will be killed. Dead players appear as ghosts to other players and have a limited set of commands they can use. You can still move, communicate, and look around, but most physical actions are not available until you\'ve found a way to get resurrected.',
      'You will also not regenerate HP or MP while dead. There is no way to restore yourself except resurrection.'
    ]
  },
  'description': {
    title: '<span class="highlight">DESCRIPTION</spa> (shortcut: DESC)',
    text: [
      'By itself, <span class="highlight">DESCRIPTION</span> will show you your current description - what others see when they LOOK at you.',
      'If you want to clear everything in your description and rewrite it, you can use <span class="highlight">DESCRIPTION CLEAR</span>.',
      'To remove the last paragraph of your description, use <span class="highlight">DESCRIPTION -</span>. If your description only had one paragraph, your description will be changed to "No description set."',
      'To add another paragraph to your description, use <span class="highlight">DESCRIPTION + {paragraph}</span>.'
    ]
  },
  'drink': {
    title: '<span class="highlight">DRINK {item}</span>',
    text: ['Will attempt to drink the contents of a specified item in your inventory. For example, if you have a red potion and you type DRINK potion, you will drink the red potion. If you want to specify an item based on the order in your inventory, you can use dot notation to do so. For example, if you have a blue potion and a red potion, you can type <span class="highlight">DRINK 2.POTION</span> to drink the red potion.']
  },
  'drop': {
    title: '<span class="highlight">DROP {item}</span> -or- <span class="highlight">DROP ALL</span>',
    text: [
      'Will drop an item from your inventory into the room you\'re currently in. DROP ALL will drop everything you\'re carrying. Every item has a handful of terms you can use to refer to it. For example, if your inventory has "a small black key", you can drop it with <span class="highlight">DROP KEY</span>, <span class="highlight">DROP SMALL</span>, or <span class="highlight">DROP BLACK</span>.',
      'If you want to drop a specific item, based on its order in your inventory, you can use dot notation with the index of the item you want. For example, if you have two keys, and you want to drop the second one, you can type <span class="highlight">DROP 2.KEY</span>.'
    ]
  },
  'equipment': {
    title: 'By itself, <span class="highlight">EQUIPMENT</span> (shortcut: EQ) will show you what you currently have equipped. Otherwise, try <span class="highlight">help {file}</span> for more information.',
    text: [
      `<span class="help-topics">REMOVE</span>
      <span class="help-topics">STATS</span>
      <span class="help-topics">WEAR</span>`
    ]
  },
  'examine': {
    title: '<span class="highlight">EXAMINE {target}</span> (shortcut: EX)',
    text: ['Will show you the description of an item in your inventory. If you want to look at an item in the room, use the LOOK command (help LOOK). You can examine a specific item in your inventory if you have multiples by using dot notation, such as <span class="highlight">EX 2.KEY</span> or <span class="highlight">EX 3.POTION</span> to look at the second key in your inventory or the third potion.']
  },
  'exits': {
    title: '<span class="highlight">UP DOWN EAST WEST NORTH SOUTH</span> (shortcuts: U D E W N S)',
    text: ['In order to move from one room to the other, you simply type the exit you want to use, typically a cardinal direction. For example, if a room has exits: <span class="highlight">[ down  east ]</span>, you can type <span class="highlight">DOWN</span> or <span class="highlight">EAST</span> in order to move in either direction. If an exit has parentheses around it, it is locked and cannot be moved through unless it is unlocked with the correct key.']
  },
  'fuzzy matching': {
    title: 'Fuzzy matching',
    text: [
      'Many arguments will target the first matching mob, item, examine, skill, or help file with only partial matching. For example, "<span class="highlight">KILL ZOM</span>" is acceptable shorthand for KILL ZOMBIE. "<span class="highlight">LOOK IN BACK</span>" is acceptable shorthand for LOOK IN BACKPACK.',
      'Dot notation can be used in combination with this, as well as command shortcuts. "<span class="highlight">GET 2.POT 2.BAC</span>" is acceptable shorthand for getting the second potion from your second backpack. "<span class="highlight">L IN 2.COR</span>" is acceptable for looking in the second corpse of the room.',
      'Players cannot be targeted using shorthand and commands must either be fully typed out or use the shortcuts mentioned in their help files.'
    ]
  },
  'get': {
    title: '<span class="highlight">GET {item}</span> -or- <span class="highlight">GET {item} {container}</span> (optionally: <span class="highlight">GET {item} FROM {container}</span>)',
    text: [
      '<span class="highlight">GET {item}</span> will pick up an item in the room and add it to your inventory. Every item has a handful of terms you can use to refer to it. For example, an item called "a small black key", which shows up in the room as, "A small black key with a simple carving of a noose on it lies here," could be targeted with <span class="highlight">GET KEY</span>, <span class="highlight">GET SMALL</span>, or <span class="highlight">GET BLACK</span>.',
      'If you want to pick up a specific item, based on its order in the room, you can use dot notation with the index of the item you want. For example, if a room has two keys, and you want to pick up the second one, you could type <span class="highlight">GET 2.KEY</span>.',
      'You can also get items that are inside a container (HELP LOOK to see how to check what\'s in a container) if you specify the container. For example, "<span class="highlight">GET KEY BACKPACK</span>" or "<span class="highlight">GET KEY FROM BACKPACK</span>" will try to get a key from a backpack container.',
      '<span class="highlight">GET ALL</span> or <span class="highlight">GET ALL {container}</span> will get all items you are able to pick up from either the room or the specified container.'
    ]
  },
  'give': {
    title: '<span class="highlight">GIVE {item} {target}</span> -or- <span class="highlight">GIVE ALL {target}</span>',
    text: ['Will try to give the item from your inventory to another player in the same room. GIVE ALL will give everything you\'re carrying to the target. If you are not carrying the item or it\'s in a container, the command will fail. Dot notation can be used to give a specific item. For example, if you\'re carrying 2 potions, you can <span class="highlight">GIVE 2.POTION {target}</span>.']
  },
  'heal': {
    title: '<span class="highlight">HEAL {target}</span>',
    text: ['Heals the target for 1.5 times your total MAT power. Can be cast outside of combat.']
  },
  'inventory': {
    title: '<span class="highlight">INVENTORY</span> (shortcuts: I or INV)',
    text: ['Will display the contents of your inventory. If you have multiples of the same item, they will be displayed with parenthetical notation. For example, if you have two red potions, you would see "(2) a red potion". Items are tracked in your inventory in the order you picked them up.']
  },
  'items': {
    title: 'Here is a list of topics about interacting with items in the room or in your inventory. Type <span class="highlight">help {file}</span> for more information.',
    text: [
      `<span class="help-topics">DRINK</span>
      <span class="help-topics">DROP</span>
      <span class="help-topics">EXAMINE</span>
      <span class="help-topics">GET</span>
      <span class="help-topics">GIVE</span>
      <span class="help-topics">INVENTORY</span>
      <span class="help-topics">PUT</span>`
    ]
  },
  'kill': {
    title: '<span class="highlight">KILL {target}</span>',
    text: ['Will initiate combat with the targeted enemy. Must be used on an enemy in the same room as you. You can initiate combat with as many enemies in a room at a time as you want. Once you\'ve initiated combat, you cannot move to another room until combat is over. Dot notation can be used if you want to target a specific enemy - for example, if a room contains two "a small bat"s, you can <span class="highlight">KILL 2.BAT</span> to target the second one.']
  },
  'lock': {
    title: '<span class="highlight">LOCK {direction}</span>',
    text: ['If an exit has been unlocked, but you want to lock it back up, you can do so by using <span class="highlight">LOCK {direction}</span> if you have the correct key. For example, if an east exit requires "a small black key" to be unlocked and you are holding "a small black key", you can type <span class="highlight">LOCK EAST</span> or <span class="highlight">LOCK E</span>.']
  },
  'look': {
    title: '<span class="highlight">LOOK {target}</span> -or- <span class="highlight">LOOK IN {container}</span> (shortcut: L)',
    text: [
      'By itself, <span class="highlight">LOOK</span> or <span class="highlight">L</span> will show you the room you\'re currently in, as well as any items and occupants. Items in the room are displayed in the order they originally started in, or in the order they were added (perhaps via the DROP command).',
      'If you specify a target, look will show you the description of either the player you looked at, the item in the room you looked at, or specially hidden objects in the room (usually hinted at in a room\'s description). If you want to look at something in your inventory, use the EXAMINE command (help EXAMINE).',
      'You can look at a specific object if there are multiples of it in the room using dot notation, such as <span class="highlight">LOOK 2.KEY</span> or <span class="highlight">LOOK 3.POTION</span> to look at the second key in the room or the third potion.',
      '<span class="highlight">LOOK IN</span> will show you the contents of a container. For example: "<span class="highlight">LOOK IN BACKPACK</span>"'
    ]
  },
  'movement': {
    title: 'Here is a list of help topics about moving around and interacting with rooms. Type <span class="highlight">help {file}</span> for more information.',
    text: [
      `<span class="help-topics">EXITS</span>
      <span class="help-topics">LOCK</span>
      <span class="help-topics">LOOK</span>
      <span class="help-topics">UNLOCK</span>`
    ]
  },
  'previous commands': {
    title: 'Cycle through previous commands',
    text: ['If you have a keyboard available, you can press the <span class="highlight">up or down arrow keys</span> to cycle through previous input, through your last 20 commands. Entering the same command more than once in a row will count as a single instance of entering input for the purposes of this cycling.']
  },
  'put': {
    title: '<span class="highlight">PUT {item} {container}</span> -or- <span class="highlight">PUT ALL {container}</span> (optionally: <span class="highlight">PUT {item} IN {container}</span>)',
    text: [
      'Will put an item from your inventory into a container you\'re either carrying or that\'s in the room. <span class="highlight">PUT ALL {container}</span> will put everything you\'re carrying into the specified container. For example, "<span class="highlight">PUT POTION BACKPACK</span>" will attempt to put a potion from your inventory into a backpack.',
      'When selecting a container, items you are carrying are prioritized over items in the room. For example, if you have a backpack, but there\'s also a backpack in the room, then "<span class="highlight">PUT POTION BACKPACK</span>" will put the potion in the backpack you\'re carrying.',
      'Put recognizes dot notation on both the targeted item and the container. "<span class="highlight">PUT 2.POTION BACKPACK</span>", "<span class="highlight">PUT POTION 2.BACKPACK</span>", and "<span class="highlight">PUT 2.POTION 2.BACKPACK</span>" are all valid commands.'
    ]
  },
  'remove': {
    title: '<span class="highlight">REMOVE {item}</span> -or- <span class="highlight">REMOVE ALL</span> (optionally: <span class="highlight">RM {item}</span>)',
    text: ['Will remove an item you\'re currently wearing and put it back in your inventory. <span class="highlight">REMOVE ALL</span> will remove all your equipment and put it in your inventory. Dot notation can be used to target specific items, starting from the head down. For example, if you are wearing a leather helm and a leather breastplate, you can <span class="highlight">REMOVE 2.LEATHER</span> to remove the breastplate.']
  },
  'saving characters': {
    title: '<span class="highlight">SAVING AND LOGGING OUT</span>',
    text: [
      'Entering the <span class="highlight">QUIT</span> command will save your character and log you out, taking you back to the Login Room. Saving your character stores current stats, inventory, equipment, effects, and description.',
      'The server will also attempt to save your character if you close the tab or window, but this <span class="highlight">can have unintended side effects</span>. It\'s best to type <span class="highlight">QUIT</span> before leaving.'
    ]
  },
  'say': {
    title: '<span class="highlight">SAY {message}</span>',
    text: ['Will have your character say something to everyone in your current room.']
  },
  'searing light': {
    title: '<span class="highlight">SEARING LIGHT {target}</span>',
    text: ['Will blast your target with holy fire, dealing 1.5 times your total MAT damage minus the target\'s MDF.']
  },
  'skills': {
    title: '<span class="highlight">SKILLS</span>',
    text: [
      'By itself, <span class="highlight">SKILLS</span> will show you a list of all skills available to your class and the level you learn them. In order to use a skill, simply type the name of the skill and targets as necessary. For example, "<span class="highlight">HEAL BOB</span>" will use the heal skill, targeting Bob.',
      'You can type <span class="highlight">HELP {skill}</span>" to learn more about that skill.',
      'If you don\'t specify a target, an offensive skill will be used on a random enemy you are currently fighting and a defensive skill will be cast on yourself. You can also cast a spell on yourself by targeting your name.',
      'Skills can also be fuzzy matched. "<span class="highlight">SEAR BAT</span>" will cast "searing light" on a target of "bat". See HELP FUZZY MATCHING for more information.'
    ]
  },
  'slash': {
    title: '<span class="highlight">SLASH {target}</span>',
    text: ['Will slash your opponent and deal 1.5 times your total ATK power to the target, minus their DEF.']
  },
  'stats': {
    title: 'Equipment stats',
    text: ['Each piece of armor you wear will increase your defense (DEF) or magic defense (MDF), while each weapon will increase your attack (ATK) or magic attack (MAT). These values are used to calculate how much damage your auto-attacks and special abilities do.']
  },
  'ticks': {
    title: 'TICKS',
    text: ['Many events in the game are tracked by a time system the server uses called ticks. Every 30 seconds, the server emits a "tick," and every 2 seconds, the server emits a "combat tick." Auto-attacks occur on every combat tick, for example. Naturally regenerating health and mana occurs every tick. Items and enemies in rooms reset every so many ticks.']
  },
  'unlock': {
    title: '<span class="highlight">UNLOCK {direction}</span>',
    text: ['Some exits are locked, meaning you cannot move through them until they are unlocked. These exits will be displayed with parentheses around them. To unlock an exit, you will need to have the correct key in your inventory. For example, if "a small black key" is needed to unlock the east exit, you would need to have "a small black key" in your inventory, then type <span class="highlight">UNLOCK EAST</span> or <span class="highlight">UNLOCK E</span>.']
  },
  'wear': {
    title: '<span class="highlight">WEAR {item}</span> -or- <span class="highlight">WEAR ALL</span>',
    text: [
      'Will equip an item you are carrying in your inventory. If you are already wearing something in that slot, it will first remove the currently worn item. You can use dot notation to wear specific items in your inventory. For example, if you have "a broad sword" and "a thin sword", you can <span class="highlight">WEAR 2.SWORD</span> to equip the thin sword.',
      '<span class="highlight">WEAR ALL</span> will wear every piece of equipment in your inventory in order, swapping anything that is currently equipped, ignoring duplicates of the same kind of item. For example, if you have 2 leather helms, a leather breastplate, a steel breastplate, and leather boots, and you\'re not wearing anything, WEAR ALL will equip the leather helm, equip the leather breastplate, swap the steel breastplate for the leather breastplate, then equip the leather boots.'
    ]
  },
  'whisper': {
    title: '<span class="highlight">WHISPER {target} {message}</span>',
    text: ['Will send a private message to your target, if they are in the same room as you. This will alert your target that you\'ve whispered them a message, and alert everyone else in the room that you\'ve whispered something to that target, though they will not see what it is.']
  },
  'who': {
    title: '<span class="highlight">WHO</span>',
    text: ['Will show you all players currently connected, including yourself.']
  }
};
