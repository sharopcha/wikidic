const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Term = require("../models/Term");
const User = require("../models/User");

// @route    POST api/terms
// @desc     Create a term
// @access   Private
router.post(
  "/",
  [
    auth,
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
      approved,
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
        approved,
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

// @route    GET api/terms
// @desc     Get all terms
// @access   Public
router.get("/", async (req, res) => {
  try {
    const terms = await Term.find().sort({
      term: 1
    });
    res.json(terms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/terms/:id
// @desc     Delete a term
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const term = await Term.findById(req.params.id);

    if (!term)
      return res.status(404).json({ msg: "The term  cannot be found" });

    // // Make sure user owns Term
    // if (term.approvedBy.toString() !== req.user.id)
    //   return res.status(401).json({ msg: "Not authorized" });

    await Term.findByIdAndRemove(req.params.id);

    res.json({ msg: "The term removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    PUT api/tems/:id
// @desc     Update a Term
// @access   Private
router.put("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    term,
    definition,
    created: { name, email },
    approved
  } = req.body;

  // Build term object
  const termField = {};
  if (term) termField.term = term;
  if (definition) termField.definition = definition;
  termField.created = {};
  const { created } = termField;
  if (name) created.name = name;
  if (email) created.email = email;
  if (approved !== null) termField.approved = approved;

  try {
    let term = await Term.findById(req.params.id);

    if (!term) return res.status(404).json({ msg: "The term cannot be found" });

    // Make sure user owns term
    // if (term.approvedBy.toString() !== req.user.id)
    //   return res.status(401).json({ msg: "Not authorized" });

    term = await Term.findByIdAndUpdate(
      req.params.id,
      { $set: termField },
      { new: true }
    );

    res.json(term);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
