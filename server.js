const express = require('express');

const app = express();

// Init Middlaware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));