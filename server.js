const jsonServer = require('json-server');
const db = require('./db.json');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use( function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origins, X-Requested-With, Content-Type, Accept');
    next()
});

/**
 * Endpoint to search kit based on the params being passed
 * Possible params
 * id, shipping_tracking_code, shipping_tracking_code
 */
server.get('/search-kit',(req, res)=>{

    const {query} = req;
    const key = Object.keys(query)[0];
    const value = query[key];
    
    if(key && value){

        const filteredList = db.filter((each)=>{
            const current = `${each[key] || ''}`
            return current.includes(value) && current.indexOf(value) === 0;
        })
        res.jsonp(filteredList)
    }else{
        res.jsonp([])
    }
})

server.use(middlewares);
server.listen(5000, ()=>{
    console.info('JSON Server is running in port 5000');
})