import { connect } from './database';

export class Singleton {
	private static instance: Singleton;
	private constructor() {}
	public static getInstance(): Singleton {
		if (Singleton.instance == null) {
			Singleton.instance = new Singleton();
		}
		return Singleton.instance;
	}

	public async accesoBD(consulta: string): Promise<any> {
		const conn = await connect();
		return await conn.query(consulta);
	}
}
