import { ConexionBD } from '../../ConexionBD';

export class Contiene {
    id_catastro: string;
    id_caractSecundaria: number;

    private constructor() {}

    async getDatosContiene(id_catastro: string){
        let contiene = new Contiene();

        let select: string = 'SELECT id_catastro, id_caractSecundaria ';
        let from: string = 'FROM Contiene ';
        let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

        let consulta = await ConexionBD.getConsulta(select + from + where);
        
        contiene.id_catastro = id_catastro;
        contiene.id_caractSecundaria = consulta[0].id_caractSecundaria;

        return contiene;
    }

   // async updateDatosContiene(id_catastro: string){}

    async insertDatosContiene(id_catastro: string, id_caractSecundaria: number[]){
        try {
            for ( let i = 0; i < id_caractSecundaria.length; i++ ){
                let insert: string = 'INSERT INTO id_catastro, id_caractSecundaria ';
                let values: string = 'VALUES ("' + id_catastro + '", "' + id_caractSecundaria + '");';
                await ConexionBD.getConsulta(insert + values);
            }
        }catch {
            return 'La tabla Contiene no ha sido actualizada, ha sucedido un error';
        }
        
        return ('La tabla Contiene '+ id_catastro + 'ha sido actualizada');
    }

}
