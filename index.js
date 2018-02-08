const lafourchette = require('./modules/lafourchette')
const michelin = require('./modules/michelin')

// importing the 'restify' module and create an instance.
const restify = require('restify')
const server = restify.createServer()

// michelin.getAllRestaurant((err,data)=>{
//   console.log("Status :" +data)
// })


// lafourchette.matchRestaurant('Le Chiberta','75008', (err, data)=>{
//   console.log(data)
// })




const status = {
	'ok': 200,
	'created': 201,
	'noContent': 204,
	'notModified': 304,
	'badRequest': 400,
	'unauthorised': 401,
	'notFound': 404
}

const defaultPort = 8081

server.get('/', function(req, res) {
	michelin.getAllRestaurant( (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {
				error: err.message
			})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})


server.get('/discount', function(req, res) {
	lafourchette.matchRestaurant('Le Chiberta','75008', (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {
				error: err.message
			})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})



const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})
