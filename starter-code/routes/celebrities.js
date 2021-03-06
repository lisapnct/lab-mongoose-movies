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


router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new.hbs");
});

router.post(
  "/celebrities/new",
  async (req, res, next) => {

    const newCelebrity = req.body;

    try {
      const dbResult = await Celebrity.create(newCelebrity);
      res.redirect("/celebrities/index");
    } catch (error) {
      next(error); // Sends us to the error handler middleware in app.js if an error occurs
    }
    //
  }
);

router.get("/celebrities/:id/delete", (req, res, next) => {

  const celebrityId = req.params.id;
  Celebrity.findByIdAndDelete(celebrityId)
    .then((dbResult) => {
      res.redirect("/celebrities/index"); 
    })
    .catch((error) => {
      next(error); // Sends us to the error handler middleware in app.js if an error occurs
    });
});

router.get("/celebrities/:id/edit", async (req, res, next) => {
  try {
      const celebrityId = req.params.id;
      const dbResult = await Celebrity.findById(celebrityId);
    res.render("celebrities/edit.hbs", { celebrity: dbResult });
  } catch (error) {
    next(error); // Sends us to the error handler middleware in app.js if an error occurs
  }
});

router.post("/celebrities/:id/edit", async (req, res, next) => {
  try {
    const celebrityId = req.params.id;
    const updatedCelebrity = await Celebrity.findByIdAndUpdate(celebrityId, req.body);
    res.redirect("/celebrities/index");
  } catch (error) {
    next(error); // Sends us to the error handler middleware in app.js if an error occurs
  }
});

module.exports = router;
