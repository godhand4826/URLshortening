import { Session } from 'express-session'
import { User } from 'entity'
declare module 'express-session' {
	interface Session {
		cnt: number;
		user: User | undefined;
	}
}

import { Request } from 'express'
declare module 'express' {
	interface Request {
		session: Session;
	}
}
