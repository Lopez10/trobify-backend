import { coordenada, SedeCatastro } from '../../../interface/baseDatos.interface';
import { DatosCatastro } from '../DatosCatastro';

export class DatosCatastroDecorado implements SedeCatastro {
	protected wrappee: DatosCatastro;

	constructor(s: DatosCatastro) {
		this.wrappee = s;
	}

	getDatos(id_catastro: string): Promise<any> {
		throw new Error('Method not implemented.');
	}
}
