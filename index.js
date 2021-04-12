require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("morgan")
const Router = require("./Routes/Router")
// // const swaggerJsdoc = require("swagger-jsdoc")

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const options = {

}

require("./Utiliy/DbConnection").connection();

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));

app.use(cors())
app.use("/api/v1", Router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use("/*", (req, res)=> {
    return res.status(404).json({
        "error": true,
        "message": "Route not found"
    })
})


if(process.env.server == 'development') app.use(logger('dev'));

const port  = process.env.PORT || 4000

app.listen(port,  ()=>{
    console.log("Server is running on port "+port)
})




