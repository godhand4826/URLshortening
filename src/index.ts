import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { createConnection } from 'typeorm'
import logger from './logger'
import usecases from './usecases'

const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
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
	cookie: { secure: false, httpOnly: true, signed: true, maxAge: 5 * 60 * 1000 },
	resave: false,
	saveUninitialized: true,
}))
app.post("/register", (req, res) => {
	(async () => {
		try {
			const { name, password } = req.body
			const user = await usecases.userUC.createUser(name, password)
			user.password = ""
			logger.info(user)
			req.session.user = user
			res.json(user)
		} catch (error) {
			logger.error(error)
			res.status(401).json({ error })
		}
	})()
})
app.post("/login", (req, res) => {
	(async () => {
		try {
			const { name, password } = req.body
			const user = await usecases.userUC.login(name, password)
			user!.password = ""
			logger.info(user)
			req.session.user = user
			res.json(user)
		} catch (error) {
			logger.error(error)
			res.status(401).json({ error })
		}
	})()
})
app.post("/logout", (req, res) => {
	req.session.user = undefined
	res.json({ ok: true })
})
app.get("/me", (req, res) => {
	if (req.session.user) {
		res.json({ user: req.session.user })
	} else {
		res.status(401).json({})
	}
})

app.get("/link", (req, res) => {
	(async () => {
		try {
			const links = await usecases.linkUC.getLinks(req.session.user!)
			logger.info(links)
			res.json(links)
		} catch (error) {
			logger.error(error)
			res.status(401).json({ error })
		}
	})()
})

app.post("/link", (req, res) => {
	(async () => {
		try {
			const { url } = req.body
			const link = await usecases.linkUC.createLink(req.session.user!, url)
			logger.info(link)
			res.json(link)
		} catch (error) {
			logger.error(error)
			res.status(401).json({ error })
		}
	})()
})

app.get("/r/:shorten", (req, res) => {
	(async () => {
		try {
			const url = await usecases.linkUC.redirect(req.params.shorten)
			res.redirect(url)
		} catch (error) {
			logger.error(error)
			res.status(404).json({ error })
		}
	})()
})

app.get("/", (req, res) => {
	if (req.session.cnt) {
		req.session.cnt += 1
	} else {
		req.session.cnt = 1
	}

	res.status(200).json({ cnt: req.session.cnt })
})

async function main() {
	await createConnection()
	app.listen(9999, () => {
		logger.info(`listening on ${9999}`)
	})
}

main()

