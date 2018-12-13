# Bird Nerd
Bird Nerd is an app for casual bird enthusiasts that enjoy birdwatching, but don't have the best memory.  This app provides the user a tool where they can record a bird sighting, lookup a bird by type and color, and view their bird sightings on a map.  Bird Nerd is written using the React framework.

## Getting Started
To run Bird Nerd locally, create an empty directory and clone the project by running the following command in your terminal: ```git@github.com:laboyd001/bird-nerd.git```

Once you have the project cloned in your terminal run: ```npm install```

This will install the libraries and other dependencies used by Bird Nerd.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Database

Don't forget to run the JSON server in another instance of your terminal so you will have access to the data that Bird Nerd is capturing.

Make sure while in the new terminal window you ```cd``` into the ```api``` directory for Bird Nerd.  Once you are there run the following command: ```json-server -p 5002 -w birdnerd.json```

## Resources

### Google Maps JavaScript API & Google Geocoding API

<img src="https://cdn.dativery.com/cdn/logos/channels/resized/google-maps-256.png" alt="google_maps" width="100px">
The mapping component is built using both the Google Maps JavaScript API and the Google Geocoding API.  Both APIs will need to be enabled in the Google Developer Console.

Markers are added to the map based on the location that the user is adding to their Bird Sighting entry.  The google geocoder is able to take the name of that location and look up the longitude and latitude.  I then post those coordinates to the database of bird sightings.  If the location is updated the geocoder with find the new coordinates and I then patch those to the database.

Markers are displayed on the map by iterating over the bird sighting database, finding the coordinates, filtering to just the logged in user's data, and then rendering them on the map.  

The map itself uses the computer's location for the initial center.  So if the user is in Chicago that's the center of the map.  Likewise, if the user is in Nashville, that will be the center of the map.

To use the Google mapping resources you will need to sign up to recieve a unique API key.  You will also need to tell Google a little about the project using your API key.

To learn more about the Google Maps Platform visit [The Google Cloud Developer Portal](https://cloud.google.com/maps-platform/)

### Reactstrap

<img src="https://pbs.twimg.com/profile_images/713060283602698240/0Xm63ShM_400x400.jpg" alt="reactstrap" width="100px">
I used the Reactstrap library for styling purposes.  This allowed for the clean look of the app.  I utilized modal, card, input, button, and container components.

To learn more about Reactstrap vist their documentation [reactstrap](https://reactstrap.github.io/)

### Canva

<img src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/yc9v9k1wnlf82njvxdxh" alt="canva" width="100px">
For help with logos I visited the Canva website and found a simplistic bird logo.  I was able to create it in a couple different colors for usage in different components in the app.

Check out [Canva](https://www.canva.com/)

### Moment.js

<img src="https://www.bootcdn.cn/assets/img/momentjs.svg?1541408619167" alt="moment.js" width="100px">
I used the Moment.js tool for formatting dates in this app.  With moment.js the user can parse, validate, manipulate, and display dates and times in JavaScript.

When using moment.js in react make sure to use the following npm command ```npm install --save moment react-moment```

For more information check out [Moment.js](https://momentjs.com/)  and  [npm](https://www.npmjs.com/package/react-moment)
 





