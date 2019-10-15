This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

## Typescript and Redux Framework

This is an example app to show how to build a scalabe singele page progressive web app with typescript, redux and react

react is as loosly coupled as possible to the concept, and could be easily repaced by native WebComponents

https://developer.mozilla.org/de/docs/Web/Web_Components


### Iteration 1
Now we want to combine everything we learned so far. We need to connect our frontend with our backend:

* Start a Backend you already finished from a other lab (mern-asset-management for example)
* Start the frontend of this lab

### Iteration 2
After you connected successfully your frontend with the backend look at the assetsReadActionCreator function in App.tsx.
This function will load all assets from the database. By reloading your page your application should render the assets.
Take your time to understand what this function does. You need to add further CRUD functions for your application.

* Add in your create asset function a database call with axios. 
* Add in your delete asset function a database call with axios.
* Add in your edit asset function a database call witch axios.