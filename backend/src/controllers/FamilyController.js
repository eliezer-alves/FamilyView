const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const { page = 1 } = request.query;

        const [count] = await connection('familys').count();

        const familys = await connection('familys')
            .limit(5)
            .offset((page - 1)*5)
            .select('*');
        response.header('X-Total-Count', count['count(*)']);
        return response.json(familys);
    },

    async family(request,response){
        const { id_family } = request.params;

        const family = await connection('familys')
            .where("id_family", id_family)
            .select('familys.*');
        return response.json(family);
    },

    async create(request, response){
        const {name_family, about} = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('familys').insert({
            name_family,
            about,
            user_id,
        });

        return response.json({ id_family });
    },

    async delete(request, response){
        const { id_family } = request.params;
        const user_id = request.headers.authorization;

        const family = await connection('familys')
            .where('id', id_family)
            .select('user_id')
            .first();

        if(family.f_user_id != user_id){
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('familys').where('id_family', id).delete();

        return response.status(204).send();
    }
};