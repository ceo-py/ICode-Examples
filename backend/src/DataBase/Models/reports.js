const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    id: { type: String, required: true },
    typeReport: { type: String, required: true },
    reportContent: { type: String, required: true },
});

const Reports = mongoose.model('Report', ReportSchema, 'Reports');

module.exports = Reports;
