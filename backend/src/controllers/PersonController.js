const connection = require('../database/connection');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dgyikv1zx',
    api_key: '264254394659774',
    api_secret: 'V5m7ZRhVnqyk6SjwljnoYW9HtqI'
});

module.exports = {
    async index(request,response){
        const { page = 1 } = request.query;

        const [count] = await connection('person').count();

        const persons = await connection('person')
            .join('familys', 'familys.id_family', '=', 'person.family_id')
            .limit(5)
            .offset((page - 1)*5)
            .select([
                'person.*',
                'familys.name_family'
            ]);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(persons);
    },

    async mens(request,response){
        const { page = 1 } = request.query;

        const [count] = await connection('person').count();

        const mens = await connection('person')
            .join('familys', 'familys.id_family', '=', 'person.family_id')
            .limit(5)
            .offset((page - 1)*5)
            .where("genre", "M")
            .select([
                'person.*',
                'familys.name_family'
            ]);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(mens);
    },

    async womans(request,response){
        const { page = 1 } = request.query;

        const [count] = await connection('person').count();

        const womans = await connection('person')
            .join('familys', 'familys.id_family', '=', 'person.family_id')
            .limit(5)
            .offset((page - 1)*5)
            .where("genre", "F")
            .select([
                'person.*',
                'familys.name_family'
            ]);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(womans);
    },

    async person(request,response){
        const { id_person } = request.params;

        const person = await connection('person')
            .where("id_person", id_person)
            .join('familys', 'familys.id_family', '=', 'person.family_id')
            .select([
                'person.*',
                'familys.*'
            ]);
        //console.log(person[0].name_person);
        return response.json(person);
    },    

    async brothers(request,response){
        const { id_person } = request.params;

        const person = await connection('person')
            .where("id_person", id_person)
            .select([
                'person.father_id',
                'person.mother_id'
            ]);
        let vet1 = person.map(person => (person.father_id));
        let vet2 = person.map(person => (person.mother_id));
        let father_id = vet1[0];
        let mother_id = vet2[0];
        
        if(father_id!==0&&mother_id!==1){
            var brothers = await connection('person')
                .where("person.mother_id", mother_id)
                .andWhere("person.father_id", father_id)
                //.andWhereNot("person.id_person", id_person)
                .select('person.*');
            console.log(brothers[0].name_person);
            return response.json(brothers);
        }
        return response.json({});
    },

    async create(request, response){
        const {name_person, nickname, genre, birth_date, death_date, father_id, mother_id, family_id, city_person, uf_person} = request.body;
        const user_id_person = request.headers.authorization;
        const file = request.file;
        console.log("controller -> ", request);
        photo_person = 'https://res.cloudinary.com/dgyikv1zx/image/upload/v1587932250/upv6vvqrh78xhfeqxf3i.png';
        if(file){
            await cloudinary.uploader.upload(file.path, function(err, result){
                if(err)
                    throw err;
                /*response.send({
                    success: true,
                    message: "File uploaded!"
                })*/
                photo_person = result.url;
            });
        }

        const [id_person] = await connection('person').insert({
            name_person,
            nickname,
            genre,
            birth_date,
            death_date,
            father_id,
            mother_id,
            family_id,
            city_person,
            uf_person,
            photo_person,
            user_id_person
        });

        return response.json({ id_person });
    },

    async update(request, response){
        const file = request.file;
        const { id_person } =  request.body;
        console.log("id: ", id_person);
        console.log(file);
        console.log(file.path);

        await cloudinary.uploader.upload(file.path, function(err, result){
            if(err)
                throw err;
            response.send({
                success: true,
                message: "File uploaded!"
            })
            console.log("result: ", result);
        });
    },

    async delete(request, response){
        const { id_person } = request.params;
        //console.log('id: ', id_person);
        const user_id = request.headers.authorization;

        const person = await connection('person')
            .where('id_person', id_person)
            .select('user_id_person')
            .first();

        if(person.user_id_person != user_id){
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('person').where('id_person', id_person).delete();

        return response.status(204).send();
    }
}