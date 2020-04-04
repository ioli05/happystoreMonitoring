// Libraries
const express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');

// Server prop
const app = express()
const port = 5005

// create application/json parser
var jsonParser = bodyParser.json()

// Get filename based on param
const fetchFileName = service => {
    const birthday = new Date();
    const day = birthday.getDate();
    const year = birthday.getFullYear();
    const month = birthday.getMonth();

    const fileSuffix = day + "-" + (month + 1) + "-" + year;
    const authFileName = "auth-service-" + fileSuffix + ".log"
    const cartFileName = "cart-service-" + fileSuffix + ".log"
    const deliveryFileName = "delivery-service-" + fileSuffix + ".log"

    switch (service) {
        case "AuthService":
            return authFileName
        case "DeliveryService":
            return deliveryFileName;
        case "CartService":
            return cartFileName;
        default:
            return null;
    }
}

// params = {
//     service: SERVICE_NAME,
//     timestamp: Date.now(),
//     message: message,
// }
// Add to log file of service
app.post('/log', jsonParser, async function (req, res) {

    // create /var/logs first
    const path = '/var/log/happystore'

    const logFile = path + "/" + fetchFileName(req.body.service)
    if (logFile != null) {
        const dateLocal = Date(req.body.timestamp);
        const logLine = `[${dateLocal}][${req.body.service}][INFO: ${req.body.message}] \n`

        fs.appendFile(logFile, logLine, function (err) {
            if (err) throw err;
            console.log(`Saved to ${logFile}!`);
        });
    } else {
        console.log("[MONITORING] Couldn't write to file with name " + req.body.service);
    }

    res.send('');
})

app.get('/', (req, res) => res.send('Hello World!'))


// Start server and establish connection to db
app.listen(port, () => {

    console.log(`Monitoring listening at http://localhost:${port}`)
})