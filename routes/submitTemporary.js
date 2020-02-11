const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Term = require("../models/Term");
const Temporary = require("../models/Temporary");

// @route    POST api/suggest/definition
// @desc     Create a new definition suggestion
// @access   Public
router.post(
  "/definition",
  [
    check("definition", "A definition field cannot be empty")
      .not()
      .isEmpty(),
    check("createdBy.name", "The name field cannot be empty")
      .not()
      .isEmpty(),
    check("createdBy.email", "Please enter your valid eamil").isEmail()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      termID,
      term,
      definition,
      createdBy: { name, email }
    } = req.body;

    console.log(definition);
    //   try {
    //     const tempTerm = new Temporary({
    //       createdBy: {
    //         name,
    //         email
    //       },
    //       termID,
    //       term,
    //       definition
    //     });

    //     await tempTerm.save();

    //     res
    //       .status(200)
    //       .send(
    //         "Your definition successfully created. Please wait untill admin of this site approve your definition!"
    //       );
    //   } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send("Server Error");
    //   }
  }
);

// @route    GET api/suggest/newterm
// @desc     Create a new term suggesstion
// @access   Public
router.post(
  "/newterm",
  [
    [
      check("term", "A new term field cannot be empty")
        .not()
        .isEmpty(),
      check("created.name", "Please fill your credentials")
        .not()
        .isEmpty(),
      check("created.email", "Please fill your credentials").isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      created: { name, email },
      term,
      definition
    } = req.body;

    try {
      Term.findOne({ term }, (err, word) => {
        if (err) {
          res.status(500).send("Server Error");
        }

        if (word) {
          return res.status(409).json({ msg: "The term already exists." });
        }
      });

      newTerm = new Term({
        created: {
          name,
          email
        },
        term,
        definition
      });

      const returnTerm = await newTerm.save();

      res.json(returnTerm);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/suggest
// @desc     Get all suggestion
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const temps = await Temporary.find();
    res.json(temps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/suggest
// @desc     Approve a definition suggestion
// @access   Private
router.put("/:defid", auth, async (req, res) => {
  try {
    let def = await Temporary.findById(req.params.defid);
    // let term = await Term.findById(def.termID);
    // console.log(def);
    // console.log(term);

    let approvedDef = {
      title: def.definition,
      createdBy: def.createdBy,
      approved: true
    };

    await Term.updateOne(
      { _id: def.termID },
      { $push: { definition: approvedDef } }
    );

    await Temporary.findByIdAndDelete(def._id);

    res.status(200).json({ msg: "done" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/suggest
// @desc     Disapprove a definition suggestion
// @access   Private
router.put("/:defid", auth, async (req, res) => {
  try {
    let def = await Temporary.findById(req.params.defid);

    await Temporary.findByIdAndDelete(def._id);

    res.status(200).json({ msg: "done" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
