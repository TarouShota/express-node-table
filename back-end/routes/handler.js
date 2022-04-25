const express = require('express');
const router = express.Router();

//testing the router.get method, data here is not necessary
router.get('/tweets', (req, res) => {
    const str = {
        "employees": {
            "employee": [
                {
                    "id": "1",
                    "firstName": "Tom",
                    "lastName": "Cruise",
                },
                {
                    "id": "2",
                    "firstName": "Maria",
                    "lastName": "Sharapova",
                },
                {
                    "id": "3",
                    "firstName": "James",
                    "lastName": "Bond",
                }
            ]
        }
    }
    res.end(JSON.stringify(str));
});
router.get('/')

// router.post('/addTweet', (req, res) => {
//     res.end('NA');
// });

module.exports = router;