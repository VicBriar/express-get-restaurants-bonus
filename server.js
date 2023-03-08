const express = require("express")
const app = express()
const port = 3000;
const {Restaurant, Menu, Item} = require("./models/index")
const {sequelize} = require("./db")

//TODO: 
app.get('/restaurants', async (request, response) => {
    try{
        let restaurants = await Restaurant.findAll({include: { model: Menu, include: {model: Item}}});
        if(restaurants){
            response.status(200).send(restaurants)
        } else {
            response.status(500).send("not found")
        }
    }catch (err){
        console.log(err)
        response.sendStatus(500).send("internal server error")
    }
})

app.listen(port, () => {
    sequelize.sync()
    console.log("App listening on port " + port)
})