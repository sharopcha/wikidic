const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Term = require('../models/Term');
const User = require('../models/User');

// @route    POST api/terms
// @desc     Create a term
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('term', 'A new term field cannot be empty')
				.not()
				.isEmpty(),
            check('definition', 'You must provide at least one definition of the word').custom(array => {
                return array.length > 0;
            })
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

// @route    GET api/terms
// @desc     Get all terms
// @access   Public
router.get('/',  async (req, res) => {
	try {
		const terms = await Term.find().sort({
			term: 1
		});
		res.json(terms);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/terms/:id
// @desc     Delete a term
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const term = await Term.findById(req.params.id);

		if (!term) return res.status(404).json({ msg: 'The term  cannot found' });

		// Make sure user owns Term
		if (term.approvedBy.toString() !== req.user.id)
			return res.status(401).json({ msg: 'Not authorized' });

		await Term.findByIdAndRemove(req.params.id);

		res.json({ msg: 'The term removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private
router.put('/:id', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { term, definition, relatedWords, createdBy, approvedBy, approved } = req.body;

	// Build term object
	const termField = {};
	if (term) termField.term = term;
	if (definition) termField.definition = definition;
	if (relatedWords) termField.relatedWords = relatedWords;
    if (createdBy) termField.createdBy = createdBy;
    if (approvedBy) termField.approvedBy = approvedBy;
    if (approved) termField.approved = approved;

	try {
		let term = await Term.findById(req.params.id);

		if (!term) return res.status(404).json({ msg: 'The term cannot found' });

		// Make sure user owns term
		if (term.approvedBy.toString() !== req.user.id)
			return res.status(401).json({ msg: 'Not authorized' });

		term = await Term.findByIdAndUpdate(
			req.params.id,
			{ $set: termField },
			{ new: true }
		);

		res.json(term);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
