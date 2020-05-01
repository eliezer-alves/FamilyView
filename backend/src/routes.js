const express = require('express');
const routes = express.Router();
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const FamilyController = require('./controllers/FamilyController');
const PersonController = require('./controllers/PersonController');
const ProfileController = require('./controllers/ProfileController');
const multer = require('multer');
const multerConfig = require('./config/multer');

routes.post('/sessions', SessionController.create);
routes.post('/users', UserController.create);

routes.get('/familys/', FamilyController.index);
routes.get('/family/:id_family', FamilyController.family);
routes.post('/familys', FamilyController.create);
routes.delete('/familys/:id_family', FamilyController.delete);

routes.get('/persons', PersonController.index);
routes.get('/person/:id_person', PersonController.person);
routes.get('/person/brothers/:id_person', PersonController.brothers);
routes.get('/persons/mens', PersonController.mens);
routes.get('/persons/womans', PersonController.womans);
routes.post('/persons', multer(multerConfig).single('photo_person'), (request, response) =>{console.log("routes -> ", request.file);}, PersonController.create);
routes.post('/persons/update', multer(multerConfig).single('photo'), PersonController.update);
routes.delete('/persons/:id_person', PersonController.delete);

routes.get('/profile', ProfileController.persons);

routes.post("/upload", multer(multerConfig).single('file'), (request, response) => {
    console.log(request.file);
    return response.json({});
})
//routes.get('/ongs', OngController.index);
/*routes.delete('/ongs/:id', OngController.delete);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);*/

module.exports = routes;