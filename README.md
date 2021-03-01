# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`



## Known Problems:
1. Grid sometimes dislocates when certain moves are done
2. Button is not centered under login textbox

## Technical Issues:
1. Restart function would not work. Board would show up for one player, but not the other (the other player would see the restart button), and would alternate each time a player selected restart.

Solution: Use restart function to ONLY reset board, instead of board and first-move boolean. This way the loser would get a chance to go first, and both players would have to hit restart to start a new game. I used print statements and worked through my logic on paper to solve this issue.

2. Padding would not appear between text box and button.

Solution: Added a div element around the button, and added top padding to the div. I used stack overflow to search how to add padding-top OUTSIDE of a button border, but instead found a solution that involved wrapping the button in a div.

3. On draw, user could not tell who had first turn

Solution: Added functionality to Board.js so the application would tell player if it was their turn or the opponent. Used a boolean to decide whether it was current player's turn or opponent's turn, and then displayed correct message accordingly
