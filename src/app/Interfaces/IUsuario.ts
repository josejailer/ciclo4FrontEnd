
export interface IUsuario {
    cedula_usuario?: number;
    nombre_usuario?: string;
    email_usuario?: string;
    usuario?: string;
    password?: string;
    ciudad_usuario?: string;
}
export interface ResponseServerAuth {
	user?: IUsuario;
	access_token?: string;
	token_type?: string;
	expires_at?: Date;
}
