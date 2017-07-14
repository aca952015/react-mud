# React MUD

[![Coverage Status](https://coveralls.io/repos/github/BatemanVO/react-mud/badge.svg?branch=staging)](https://coveralls.io/github/BatemanVO/react-mud?branch=staging)
<img src="https://travis-ci.org/BatemanVO/react-mud.svg?branch=staging">

## What is a MUD?
MUD stands for "Multi-User Dungeon." Essentially, it's a text-based game that many people can connect to and interact in. They're sort of a pre-cursor to modern MMOs - if you were to strip away graphics and GUIs, they'd be quite similar.

## Project MVP
Users should be able to connect, create a new character, set a password on it, then explore the game world. They can pick up items, drink potions, wear equipment, fight enemies, communicate with other users, and even team up with them to tackle fighting multiple enemies at once. A more in-depth listing of all available commands can be found by connecting and typing "HELP".

The primary goal of this project was to mimic the appearance of an old Telnet client and make it feel just like connecting to an old MUD, using React, Redux, and Socket.io. React and Redux are used to manage state and the front end appearance of the app, while Socket.io handles the websockets for each user, allowing players to communicate in real time with the server and with other users.

Users can quit to log in to another character, with their character automatically being saved upon quitting or upon closing the tab. Anything they had in their inventory, as their equipment, as well as their description and any effects are saved upon quitting.

Items and enemies will respawn every so often, according to a "tick" system. If a room is missing an item or a mob it started with, it will respawn in about 2-3 minutes.

The backend database uses a very simple MongoDB instance, with a single character model that stores all the information about a character. Passwords are salted and hashed using bcrypt and the user's password is never stored as plaintext on either the backend or the frontend. When inputting their password, the client should not show player input as feedback.

## Goals
Eventually I would like to add in classes and skills so players can do more than just auto-attack mobs. I plan to include the "holy trinity" of traditional RPG roles: tanks, healers, and DPS. This will be a fully PvE, cooperative game, with an eye towards making it very casual and user-friendly. At the end of the day, I want to look at it and say, "Would I enjoy this? Would my wife enjoy this? Would the both of us enjoy playing it together?" With that in mind, I often update the issues tab with ideas I'd like to tackle or things on my TODO list.

If you want to view the project in development, you can check out https://react-mud-staging.herokuapp.com.

To check out the current state of the development code, go to https://github.com/BatemanVO/react-mud/tree/staging.
