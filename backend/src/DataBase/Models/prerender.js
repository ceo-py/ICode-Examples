const mongoose = require('mongoose');

const PrerenderSchema = new mongoose.Schema({
    URL: { type: String, required: true },
    HTML: { type: String, required: true },
});

const Prerender = mongoose.model('Prerender', PrerenderSchema, 'Prerender');

module.exports = Prerender;