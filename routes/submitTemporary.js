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
      .isEmpty()
    // check('createdBy', 'All the fields must be filled')
    //     .custom(obj => {
    //         if(obj.firstName && obj.lastName && obj.email === ''){
    //             console.log('error occured')
    //         }
    //     })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { termID, definition, createdBy } = req.body;
    const { firstName, lastName, email } = createdBy;

    try {
      const tempTerm = new Temporary({
        createdBy: {
          firstName,
          lastName,
          email
        },
        termID,
        definition
      });

      const created = await tempTerm.save();

      res.json(created);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
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
      check("created.firstName", "Please fill your credentials")
        .not()
        .isEmpty(),
      check("created.lastName", "Please fill your credentials")
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
      created: { firstName, lastName, email },
      term,
      definition,
      relatedWords
    } = req.body;

    try {
      newTerm = new Term({
        created: {
          firstName,
          lastName,
          email
        },
        term,
        definition,
        relatedWords
      });

      const returnTerm = await newTerm.save();

      res.json(returnTerm);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/suggestions
// @desc     Get all suggestions
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

// @route    PUT api/suggestions
// @desc     Approve a definition suggestion
// @access   Private
router.put("/:defid", auth, async (req, res) => {
  try {
    let def = await Temporary.findById(req.params.defid);
    // let term = await Term.findById(def.termID);
    console.log(def);
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

// @route    DELETE api/suggestions
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
