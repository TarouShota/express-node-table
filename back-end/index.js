const express = require('express');
const fs = require('fs')
const stringify = require('csv-stringify').stringify
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const parse = require('csv-parse').parse
const os = require('os')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: '/api/tweets' })

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routesHandler);

/* Creating a csv file from the data that is being passed in. */
app.post('/api/create', (req, res) => {
    const data = req.body.data

    if (!data || !data.length) {
        return res.status(400).json({ success: false, message: 'Please enter at least 1 row' })
    }

    stringify(data, {
        header: true
    }, function (err, str) {
        const path = './files/' + Date.now() + '.csv'
        //create the files directory if it doesn't exist
        if (!fs.existsSync('./files')) {
            fs.mkdirSync('./files')
        }
        fs.writeFile(path, str, function (err) {
            if (err) {
                console.error(err)
                return res.status(400).json({ success: false, message: 'An error occurred' })
            }

            res.download(path, 'file.csv')
        })
    })
})

/* Creating a csv file from the data that is being passed in. */
app.post('/api/tweets', upload.single('file'), (req, res) => {
    const path = './files/' + Date.now() + '.csv'
    const file = req.file
    console.log(file)
    const data = fs.readFileSync(file.path)
    parse(data, { delimiter: ';', trim: true }, (err, records) => {
        if (err) {
            console.error(err)
            return res.status(400).json({ success: false, message: 'An error occurred' })
        }

        return res.json({ data: records })
    })
})
app.post('/api/tocsv'), (req, res) => {
    return req[0]
}


const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
