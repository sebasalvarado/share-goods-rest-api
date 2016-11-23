exports.getUserByEmail = function (req, res, next) {
  if (req.query.email != '') {
    var email = req.query.email;
    var string = "SELECT ID FROM ShareGoods.User WHERE email = " + username;
    client.query(string, function(err, qres) {
      if (err) {
        console.log("Error in getting User by Email");
      }
      else {
        res.json(qres.rows);
      }
    })
  } else {
    return next();
  }

}

exports.postListing = function(req, res, next){
  var body = req.body;
  // Get the required fields
  var ownerID = body.ownerID;
  var item = body.item;
  var returnDate = body.returnDate;
  var description = body.description;

  client.query("INSERT INTO ShareGoods.Listings (ownerID,item,returnDate,description) VALUES($1, $2, $3, $4)",
        [ownerID,item,returnDate,description],
      function(err,qres){
        if(err){
          //Err is a map return the error to the user
          return res.send("Listing Already Exists\n");
        }
        else{
          res.send("Success\n");
        }
      });
}
