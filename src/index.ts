import express from 'express'
import morgan from 'morgan'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import logger from './logger'

const app = express()
app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
	immediate: true,
	stream: {
		write: (message) => logger.info(message.trim())
	}
}))
app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
	stream: {
		write: (message) => logger.info(message.trim())
	}
}))

const RedisStore = connectRedis(session)
app.use(session({
	store: new RedisStore({ client: redis.createClient() }),
	secret: 'keyboard cat',
	cookie: { httpOnly: true, signed: true, maxAge: 3000 },
	resave: false,
	saveUninitialized: false,
}))
app.get("/", (req, res) => {
	if (req.session.cnt) {
		req.session.cnt += 1
	} else {
		req.session.cnt = 1
	}

	res.status(200).json({ cnt: req.session.cnt })
})

app.listen(9999, () => {
	logger.info(`listening on ${9999}`)
})
