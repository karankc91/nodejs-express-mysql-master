const sql = require("./db.js");

// constructor
const Hotel = function(hotel) {
 
  this.name = hotel.name;
  this.room = hotel.rooml;
  this.price = hotel.price;
  this.available = hotel.available;
};

Hotel.create = (newHotel, result) => {
  sql.query("INSERT INTO hotels SET ?", newHotel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created hotel: ", { id: res.insertId, ...newHotel });
    result(null, { id: res.insertId, ...newHotel });
  });
};

Hotel.findById = (hotelId, result) => {
  sql.query(`SELECT * FROM hotels WHERE id = ${hotelId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found hotel: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Hotel with the id
    result({ kind: "not_found" }, null);
  });
};

Hotel.getAll = result => {
  sql.query("SELECT * FROM hotels", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("hotels: ", res);
    result(null, res);
  });
};

Hotel.updateById = (id, hotel, result) => {
  sql.query(
    "UPDATE hotels SET name = ?, room = ?, price = ? WHERE id = ?",
    [hotel.name, hotel.room, hotel.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Hotel with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated hotel: ", { id: id, ...hotel });
      result(null, { id: id, ...hotel });
    }
  );
};

Hotel.remove = (id, result) => {
  sql.query("DELETE FROM hotels WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Hotel with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted hotel with id: ", id);
    result(null, res);
  });
};

Hotel.removeAll = result => {
  sql.query("DELETE FROM hotels", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} hotels`);
    result(null, res);
  });
};

module.exports = Hotel;
