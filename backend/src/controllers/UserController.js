const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request,response){
            const usuarios = await connection('usuarios').select('*');
            
            return response.json(usuarios);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;        
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('users').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const user = request.headers.authorization;

        if(user != 'admin'){
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('usuarios').where('id', id).delete();

        return response.status(204).send();
    }
}