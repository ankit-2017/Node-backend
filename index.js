require('dotenv').config();
require("fix-esm").register();
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("morgan")
const Router = require("./Routes/Router")
const puppeteer = require('puppeteer')
const fs = require('fs');
// // const swaggerJsdoc = require("swagger-jsdoc")

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const options = {

}

// require("./Utiliy/DbConnection").connection();
const createPDF = async () => {
    //Create a browser instance
    const browser = await puppeteer.launch();

    //Create a new page
    const page = await browser.newPage();

    //Get HTML content from HTML file
    const html = fs.readFileSync('./Templates/template.html', 'utf-8');
    await page.goto('data:text/html;charset=UTF-8,' + html, { waitUntil: 'networkidle0' });

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Downlaod the PDF
    const pdf = await page.pdf({
        path: `result-${Math.random().toString(16).slice(2)}.pdf`,
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });

    // Close the browser instance
    await browser.close();
}

// createPDF()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('Templates'))
app.use(cors())
app.use("/api/v1", Router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use("/*", (req, res) => {
    return res.status(404).json({
        "error": true,
        "message": "Route not found"
    })
})


if (process.env.server == 'development') app.use(logger('dev'));

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("Server is running on port " + port)
})




