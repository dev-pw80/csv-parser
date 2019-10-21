const mongoose = require('mongoose');

const Aqmpoint = require('./Aqmpoint');

require('dotenv').config();

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


(async () => {

    const foundPost = await Aqmpoint.find();
    console.log(foundPost);

    process.exit();
})();