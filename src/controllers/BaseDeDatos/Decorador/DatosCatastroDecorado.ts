import { SedeCatastro } from '../../../interface/baseDatos.interface';

export class DatosCatastroDecorado implements SedeCatastro {
	protected wrappee: SedeCatastro;

	constructor(s: SedeCatastro) {
		this.wrappee = s;
	}

	getDatos(id_catastro: string): Promise<any> {
		throw new Error('Method not implemented.');
	}
}
