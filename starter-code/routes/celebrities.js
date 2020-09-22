const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities/index", (req, res, next) => {
  Celebrity.find({}) 
    .then((dbResult) => {
      res.render("celebrities/index", { celebrities: dbResult });
    })
    .catch((error) => {
      next(error); // Sends us to the error handler middleware in app.js if an error occurs
    });
});


router.get("/celebrities/show/:id", (req, res, next) => {
  
  const celebrityID = req.params.id;
  Celebrity.findById(celebrityID)
    .then((dbResult) => {
      res.render("celebrities/show",  { celebrities: dbResult,}); 
    })
    .catch((error) => {
      next(error); 
    });
});


module.exports = router;
