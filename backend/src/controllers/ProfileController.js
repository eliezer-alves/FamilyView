const connection = require('../database/connection');
module.exports = {
    async persons(request, response){
        const user_id = request.headers.authorization;
        const persons = await connection('person')            
            .select('*')
            .innerJoin('familys', 'familys.id_family', '=', 'person.family_id')
            .where('user_id_person', user_id);
        
        return response.json(persons);
    }
}