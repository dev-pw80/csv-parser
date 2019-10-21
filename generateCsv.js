const mongoose = require('mongoose');

const Aqmpoint = require('./Aqmpoint');

require('dotenv').config();

const fs = require('fs')

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


(async () => {

    const foundPost = await Aqmpoint.find({'aqm.noxevent':{$gte: 50}});
    
    let CsvText = 'r3000, r5000, noxevent, r2000, coevent, system_time, gps_time, latitude, longitude\n' ;
    
    foundPost.map(point => {
        CsvText += `${point.aqm.r3000}, ${point.aqm.r5000}, ${point.aqm.noxevent}, ${point.aqm.r2000}, ${point.aqm.coevent}, ${point.gps.system_time}, ${point.gps.gps_time}, ${point.gps.latitude}, ${point.gps.longitude}\n`
    });
    
    await fs.writeFileSync(process.env.DATALINK, CsvText)
    console.log(foundPost, CsvText);
    process.exit();
})();