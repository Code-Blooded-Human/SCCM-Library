const express = require('express');
const cardReader = require(".");
var cors = require('cors')




let Card = undefined;
async function onCardConnect(card){
  console.log("Card Connection established");
  
  Card = card;
  // let data = await card.readAttributes(['name','uid']);
  // console.log(data);

}
cardReader.registerSCF('./demo/rani_scf.json');
cardReader.onCardConnect(onCardConnect);


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res, next) => {

  let {name,id} = await Card.readAttributes(['name','id']);
  console.log(name,id);
  res.send({name,id});
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = 5556;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));