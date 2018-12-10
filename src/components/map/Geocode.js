import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBoPPKuvvE0W8dwOfm87Qd3m2RxZTwmHmo");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latidude & longitude.
// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//   response => {
//     const address = response.results[0].formatted_address;
//     console.log(address);
//   },
//   error => {
//     console.error(error);
//   }
// );

// Get latidude & longitude from address.
Geocode.fromAddress("3132 Stafford Drive Nashville, TN 37214").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log("address coords",lat, lng);
  },
  error => {
    console.error(error);
  }
);