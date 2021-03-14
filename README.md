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

_Don't do the Heroku step for assignments, you only need to deploy for Project 2_

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

## Known Problems:

1. Functionality is not as reliable when both players have same username.

I would fix this issue by figuring out a way to make sure all usernames are unique in order to play the game. This might involve comparing all the usernames, or setting constraints preventing usernames to log in if they are already present in the session.

2. If user leaves the middle of the game, it is not logged as a forefit.

I would fix this issue by keeping a turn timer. Once the turn times out, the game is considered lost and the user scores are updated accordingly.

## Technical Issues:

1. App would not deploy to heroku.

Solution: Read the heroku log, and found that psycopg2 was not found in the error logs. Because of this, I updated my requirements.txt to add in psycopg2 and that solved the issue.

2. Could not pass in current user to leaderboard to bold it.

Solution: used pring statements to trace code back to the username state, and figured out that my usestate was not updating. I found that I should pass it to both instances of leaderbord (before the board and after the board)
