module.exports = app => {
  const hotels = require("../controllers/hotel.controller.js");

  // Create a new Hotel
  app.post("/hotels", hotels.create);

  // Retrieve all hotels
  app.get("/hotels", hotels.findAll);

  // Retrieve a single Hotel with hotelId
  app.get("/hotels/:hotelId", hotels.findOne);

  // Update a Hotel with hotelId
  app.put("/hotels/:hotelId", hotels.update);

  // Delete a Hotel with hotelId
  app.delete("/hotels/:hotelId", hotels.delete);

  // Delete All Hotels
  app.delete("/hotels", hotels.deleteAll);
};
