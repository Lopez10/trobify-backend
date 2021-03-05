import {createPool} from 'mysql2/promise';

export async function connect() {
    const connection = await createPool({
        host:'localhost',
        user:'root',
        password: 'rootroot',
        database: 'Trobify',
        port: 3306,
        connectionLimit: 10
    });
     return connection;
}

