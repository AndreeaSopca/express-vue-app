const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

app.use("/api/posts/test", function(req, res) {
    res.send("Hello")
})


// Handle production
if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static(__dirname + '/public'));

    // Handel single page application
    app.use(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));