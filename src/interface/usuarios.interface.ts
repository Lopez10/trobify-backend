export interface UsuariosInterface {
	id_usuario?: number;
	nombre: string;
	apellidos: string;
	id_rol: number;
	vendedor?: boolean;
	mail: string;
	contrasena: string;
	telefono: number;
}
