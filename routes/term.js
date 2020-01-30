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
			check('term.term', 'A new term field cannot be empty')
				.not()
				.isEmpty()
		]
    ],
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { created, term, definition, relatedWords } = req.body;

		try {

			// let test = await Term.findOne({ term: term });

			// console.log('hello', test)

			// if(test) {
			// 	return res.status(400)
			// 		.json({ msg: 'The term already exists. If you have other definition for this term, please send a new suggesstion' })
			// }

			newTerm = new Term({
				approvedBy: req.user.id,
				created: {
					firstName: created.firstName,
					lastName: created.lastName,
					email: created.email
				},
				term: {
					approved: term.approved,
					term: term.term
				},
				definition,
				relatedWords

			});

			const returnTerm = await newTerm.save();

			res.json(returnTerm);
		} catch (err) {
			console.error(err);
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

	const { term, definition, relatedWords, created, approvedBy, approved } = req.body;

	// Build term object
	const termField = {};
	if (term) termField.term = term;
	if (definition) termField.definition = definition;
	if (relatedWords) termField.relatedWords = relatedWords;
    if (created) termField.created = created;
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
