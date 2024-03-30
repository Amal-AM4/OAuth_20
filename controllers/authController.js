async function logIn (req, res) {  
    // handle with passport
    res.render('login', {data: req.user})
}

async function logOut (req, res) { 
    // handle with passport 
    // res.send('logout page')
    req.logout();
    res.redirect('/');
}



module.exports = {
    logIn,
    logOut,
}