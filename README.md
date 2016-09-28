# Smart Trip Service

Itinerary builder application created for my Masters Individual Project module. 

Please see [the iOS companion app I created to act as a view of the service.](https://github.com/kelvinharron/smart-trip-ios)

### User Centric Features

- Sign up with a valid email and password. Service validates request content and checks if email already exists. Succesful sign up creates new user in database.
- Login to an existing accout.
- Ccreate a trip (Trip Name, Trip City, Start Date, End Date required).
- View all existing trips.
- Delete an existing trip.
- Search for venues using string query and location coordinates.
The Search query is validated by the service before the request is sent to Google Places API. If no specific location "Cafes in Belfast" is made, results will instead be specific to the users location.
Search results are formatted into name, address and latlng object before response sent to client.
- Save a venue from a search.
- Delete a venue.

### Node Dependencies

- [Express](https://expressjs.com)
- [Express-jwt](https://github.com/auth0/express-jwt)
- [Express-session](https://github.com/expressjs/session)
- [Express-validator](https://github.com/ctavan/express-validator)
- [bcrypt](https://github.com/ncb000gt/node.bcrypt.js)
- [body-parser](https://github.com/expressjs/body-parser)
- [Node.js Client for Google Maps Services](https://github.com/googlemaps/google-maps-services-js)
- [Mongoose](https://github.com/Automattic/mongoose)
- [Mongoose-validate](https://github.com/RGBboy/mongoose-validate)
- [Morgan](https://github.com/expressjs/morgan)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Chai](https://github.com/chaijs/chai)
- [Mocha](https://github.com/mochajs/mocha)

### To-do

1. Implement working session middleware. Currently using Express Session.
2. From working session middleware, I can correctly store venues and trips against unique users.
3. Considering migrating to MySQL or PostgreSQL.
4. Decouple database queries made in endpoint controller files to its own directory.
5. Implement a settings/config that works based on current .env setting.
