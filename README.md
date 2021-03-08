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
1. Functionality is not as reliable when both players have same username.

I would fix this issue by figuring out a way to make sure all usernames are unique in order to play the game

2. 

## Technical Issues:
1. App would not deploy to heroku.

Solution: Still solving

2. Socket would emit to the other client, but not to the self

Solution: Read documentation to find exclude_self parameter, and set it to False to remedy the issue.
