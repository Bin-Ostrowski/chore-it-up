const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    //commented out due to code potentionally obsolete
    //useCreateIndex: true,
    //useFindAndModify: false,
});

module.exports = mongoose.connection;
