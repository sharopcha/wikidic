const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Term = require('../models/Term');
const Temporary = require('../models/Temporary');

// @route    POST api/suggest
// @desc     Create a temporary term
// @access   Public
router.post(
	'/',
		[
			check('definition', 'A definition field cannot be empty')
				.not()
                .isEmpty(),
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
                definition,
			});

			const created = await tempTerm.save();

			res.json(created);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
    }
);

// @route    GET api/suggestions
// @desc     Get all suggestions
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const temps = await Temporary.find()
		res.json(temps);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});







module.exports = router;
