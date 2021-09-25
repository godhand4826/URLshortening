import winston, { transports } from 'winston'

const consoleLogger = new transports.Console({
	level: "info"
})

const fileLogger = new transports.File({
	level: "info",
	filename: 'urlshortening.log',
})

const logger = winston.createLogger({
	transports: [consoleLogger, fileLogger]
})

export default logger