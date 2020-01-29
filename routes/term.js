const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Term = require('../models/Term');
const User = require('../models/User');

// @route    POST api/contacts
// @desc     Create a contact
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('term', 'A new term field cannot be empty')
				.not()
				.isEmpty(),
            check('definition', 'You must provide at least one definition of the word').exists()
		]
    ],
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { createdBy, term, approved, definition, relatedWords } = req.body;

		try {
			const newTerm = new Term({
                createdBy,
                term,
                definition,
                relatedWords,
                approved,
				approvedBy: req.user.id
			});

			const created = await newTerm.save();

			res.json(created);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
    }
);

module.exports = router;
