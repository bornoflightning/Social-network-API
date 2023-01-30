const express = require('express');
const db = require('./config/connection');
const routes = require('routes');

// create port variable here
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ exnteded: true}));
app.use(routes);

db.once('open', ()=> {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
})