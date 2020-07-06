'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();

const { top50 } = require('./data/top50');

const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
//set the view engine to ejs
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', (req, res) => {
    res.status(404);
    res.render('pages/top50', {
        title: 'Top 50 Songs Streamed on Spotify',
        myName: 'Jordan',
        top50,
        path: req.originalUrl
    });
});

// app.get('/top50popular-artist', (req, res) => {
//     res.status(404);
//     res.render('pages/top50', {
//         title: 'Most Popular Artist',
//         myName: 'Jordan',
//         top50,
//         path: req.originalUrl
//     });
// });

app.get('/top50/:song', (req, res) => {
    res.status(404);
    const {song} = req.params
    console.log(top50[song - 1].title)
    console.log(top50[song - 1].artist)
    res.render('pages/singlesong', {
        title: 'Song #',
        myName: 'Jordan',
        song: top50[song - 1].title,
        artist: top50[song - 1].artist,
        streams: top50[song - 1].streams,
        path: req.originalUrl
    });
});


// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
