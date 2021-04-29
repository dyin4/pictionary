# Project Description

## Objectives: 
This application is a React application designed for multiple, synchronous users. It is a groupware application that supports synchronous communication, coordination, joint attention, and group awareness.

## Project constraints and limitations:

- This application is designed not to support user
accounts or authentication.
Users can join the game by only entering a name.
- We used mock data for Pictionary words list.

## Features and Capabilities:
Pictionary is an app that allows multiple players to play games.
1. Users are not required to sign in to use the app. Users can enter the name to join the chat room. 
- If there is already a game in progress, the join chat is disabled and a progress bar will be shown on the screen to inform when the play could get in.
2. A tutorial slide will be shown to demonstrate how to play the game.
- Expert users can choose to skip the tutorials.
3. After join the chat room, the player’s name will be shown on the player list and chat room.
   1. If the players amount is less than two, the game is not able to start. So user need to wait for other players to join in. 
   2. When the game gets enough players, the “start drawing” button will be shown and clickable to user. 
   3. After all users clicked start, the game begins. 
   4. The host player will receive a word on the screen. 
   5. All other players can only see “host player is drawing” but not the word. There is a 30 seconds timer for each game. The host can start drawing on canvas. 
   6. Host can click “clear” button to clear the drawing.
   7. At the same time, all other players can view the picture the host is drawing, and guess the word. They can type message in chat box. 
   8. If they typed correct word, a message will shown in chat room that he/she is correct. Once a player got the correct answer, the next player will become the host and receive a new word,until all players played as host. 
   9. If no one get the correct answer, the game will end and will not pass the host to next player. 

## Deployed on Heroku:
<http://reactpictionary.herokuapp.com/>