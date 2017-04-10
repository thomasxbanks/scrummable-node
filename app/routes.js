// require express
var express = require('express');
var path = require('path');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
    var WP = require('wordpress-rest-api');
    var wp = new WP({
        endpoint: 'http://scrummable.com/wp-json/wp/v2/posts?_embed'
    });

    // Promises
    wp.posts().then(function(data) {
        // do something with the returned posts
        //console.info(data)


        res.render('pages/home', {
            posts: data
        });

    }).catch(function(err) {
        // handle error
        console.error(err);
    });
});

// route for our single blog post page
router.get('/post/*', function(req, res) {
    var WP = require('wordpress-rest-api');
    var wp = new WP({
        endpoint: 'http://scrummable.com/wp-json/wp/v2/posts?_embed'
    });


    // Promises

let target = req.url.split('/')[2]

    wp.posts().then(function(data) {
        // do something with the returned posts
        //console.info(data)

        data.forEach((post)=>{
          if (post.slug === target) {
            res.render('pages/single', {
                post: post
            });
          }
        })


    }).catch(function(err) {
        // handle error
        console.error(err);
    });
});

// route for our about page
router.get('/about', function(req, res) {
    var users = [{
            name: 'Holly',
            email: 'holly@scrummable.com',
            avatar: 'http://placekitten.com/g/300/300',
            bio: 'Holly worked for a well-known national newspaper for 10 years. She can spell.'
        },
        {
            name: 'Chris',
            email: 'chris@scrummable.com',
            avatar: 'http://placekitten.com/g/400/400',
            bio: 'Chris has been a web designer for 3 months. He likes boxes and big images with white text in them.'
        },
        {
            name: 'Ado',
            email: 'ado@scrummable.com',
            avatar: 'http://placekitten.com/g/500/500',
            bio: 'Since 2012, Ado has hung around with Chris. We gave him a job but no-one know what he actually does.'
        },
        {
            name: 'Samantha',
            email: 'samantha@scrummable.com',
            avatar: 'http://placekitten.com/g/700/700',
            bio: 'Samantha does less than Ado, she is a goldfish.'
        }
    ];


    res.render('pages/about', {
        users: users
    });
});

router.get('/contact', function(req, res) {
    res.render('pages/contact');
});

router.post('/contact', function(req, res) {
    res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
});
