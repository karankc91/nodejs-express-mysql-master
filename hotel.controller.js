const hotel = require("../models/hotel.model.js");

// Create and Save a new Hotel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create Hotel
  const hotel = new hotel({
    name: req.body.name,
    room: req.body.room,
    price: req.body.price,
    available: req.body.available
  });

  // Save Hotel in the database
  Hotel.create(hotel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the hotel."
      });
    else res.send(data);
  });
};

// Retrieve all Hotels from the database.
exports.findAll = (req, res) => {
  Hotel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hotels."
      });
    else res.send(data);
  });
};

// Find a single Hotel with a hotelId
exports.findOne = (req, res) => {
 Hotel.findById(req.params.hotelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Hotel with id ${req.params.hotelId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Hotel with id " + req.params.hotelId
        });
      }
    } else res.send(data);
  });
};

// Update a Hotel identified by the HotelId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Hotel.updateById(
    req.params.hotelId,
    new Hotel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Hotel with id ${req.params.hotelId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Hotel with id " + req.params.hotelId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Hotel with the specified HotelId in the request
exports.delete = (req, res) => {
 Hotel.remove(req.params.hotelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Hotel with id ${req.params.hotelId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Hotel with id " + req.params.hotelId
        });
      }
    } else res.send({ message: `Hotel was deleted successfully!` });
  });
};

// Delete all Hotel from the database.
exports.deleteAll = (req, res) => {
  Hotel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all hotels."
      });
    else res.send({ message: `All Hotels were deleted successfully!` });
  });
};
