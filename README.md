# Bird Nerd
Bird Nerd is an app for casual bird enthusiasts that enjoy birdwatching, but don't have the best memory.  This app provides the user a tool where they can record a bird sighting, lookup a bird by type and color, and view their bird sightings on a map.  Bird Nerd is written using the React framework.

# Getting Started
To run Bird Nerd locally, create an empty directory and clone the project by running the following command in your terminal: ```git@github.com:laboyd001/bird-nerd.git```

Once you have the project cloned in your terminal run: ```npm install```

This will install the libraries and other dependencies used by Bird Nerd.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Database

Don't forget to run the JSON server in another instance of your terminal so you will have access to the data that Bird Nerd is capturing.

Make sure while in the new terminal window you ```cd``` into the ```api``` directory for Bird Nerd.  Once you are there run the following command: ```json-server -p 5002 -w birdnerd.json```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
