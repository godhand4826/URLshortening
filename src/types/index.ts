import { Session } from 'express-session'
declare module 'express-session' {
	interface Session {
		cnt: number;
	}
}

import { Request } from 'express'
declare module 'express' {
	interface Request {
		session: Session;
	}
}
