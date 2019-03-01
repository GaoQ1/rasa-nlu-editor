# rasa-nlu-trainer
This is a tool to edit your training examples for [rasa NLU](https://github.com/RasaHQ/rasa-nlu-trainer)
But the original project was not maintained, so I create a new repo.

## installation

`$ npm i -g rasa-nlu-trainer` (you'll need [nodejs and npm](https://nodejs.org/) for this)

## launch
`$ rasa-nlu-trainer` in your working directory

this will open the editor in your browser

#### options
- `--source -s` path to the training file (by default it will be searched recursively in the current directory)
- `--port -p` the web app will run here (randomly selected by default)

## development

- git clone this repo
- `$ npm install`
- `$ npm start`

#### using the development build locally

- `$ npm run build`
- `$ npm link`

from here, the `$ rasa-nlu-trainer` command will start the development version

run `$ npm run build` again to update the build

run `$ npm unlink && npm i -g rasa-nlu-trainer` to use the npm version again


This project was bootstrapped with [Create React App](./CRA_README.md).
