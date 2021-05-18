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

	public async accesoBD(consulta: string, mas?: string[]): Promise<any> {
		const conn = await connect();
		console.log(consulta);
		if (mas) return await conn.query(consulta, mas);
		return await conn.query(consulta);
	}
}
