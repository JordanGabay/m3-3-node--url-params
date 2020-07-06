'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();


const { top50 } = require('./data/top50');
const { books } = require('./data/books');

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

app.get('/books', (req,res) => { 
    res.status(404);
    res.render('pages/books', {
        title: 'Top 25 Books',
        books
    });
});

//Exercise 1.5
// app.get('/top50popular-artist', (req, res) => {
//     res.status(404);
//     res.render('pages/top50', {
//         title: 'Most Popular Artist',
//         myName: 'Jordan',
//         top50,
//         path: req.originalUrl
//     });
// });

// app.get('/top50/:song', (req, res) => {
//     const {song} = req.params
//     if(top50[song - 1]) {
//         res.status(200);
//         console.log(top50[song - 1].title)
//         console.log(top50[song - 1].artist)
//         res.render('pages/singlesong', {
//             title: 'Song #' + top50[song - 1].rank,
//             song: top50[song - 1].title,
//             artist: top50[song - 1].artist,
//             streams: top50[song - 1].streams,
//             // id: Number(id)
//         }); 
//     } else {
//         res.status(404);
//         res.render('pages/fourOhFour', {
//             title: 'I got nothing',
//             path: req.originalUrl
//         });
//     }
// });

app.get('/top50/:song', (req, res) => {
    const { song } = req.params
    // console.log(song)
    const lastSong = top50[song - 1]
    const { title, artist, rank, streams } = lastSong
    if(lastSong) {
        res.status(200);
        // console.log(title, artist)
        res.render('pages/singlesong', {
            title: `Song #${rank}`,
            song: title,
            artist,
            streams,
            id: rank 
        });
    } else {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }
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
