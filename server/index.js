const express = require('express');
const app = express();
const PORT  = 4000;

const {
    receivePublickToken,
    getTransactions
} = require('./controllers/controller');

app.use(express.json)

//Get the public token and exhange ot for an acess token
app.post('/auth/public_token', receivePublickToken);

//Get transactions
app.get('/transactions', getTransactions);

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});