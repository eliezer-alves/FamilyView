import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';
// import defaulProfile from '../../assets/eu.jpg';
import defaulProfile from '../../assets/default_profile.png';

const helpers = require('../../helpers/index');



export default function Profile(){
    
    const history = useHistory();
    const userName = localStorage.getItem('userName');
    const userId   = localStorage.getItem('userId');
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setPersons(response.data)
        })
    }, [userId]);

    async function handleDeletePerson(id){
        try{
            await api.delete(`persons/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });
            setPersons(persons.filter(person => person.id_person !== id));
            console.log(persons);
        } catch(err){
            alert('Falha ao deletar registro!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                    <span>Olá, {userName}</span>

                <Link to="persons/new" className="button">Novo Registro</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Seus Registros</h1>
            {

            <ul>
                {persons.map(person => (                   
                    <li key={person.id_person}>
                        <div>                        
                            <img className="img-profile" src={person.photo_person} style={{width: 280,height: 280}} alt="Profile Image!"/>
                        </div>
                        <div className="info-person">
                            <aside>
                                <strong>{ person.name_person }</strong>
                                <p>({ person.nickname })</p>
                            </aside>
                            
                            <aside className="group_line">
                                <div className="group_colum">
                                    <strong>Nascimento</strong>
                                    <p>{ helpers.convert_date(person.birth_date) }</p>
                                </div>
                                <div className="group_colum">
                                    <strong>Falecimento</strong>
                                    <p>{ helpers.convert_date(person.dead_date) }</p>
                                </div>
                            </aside>
                            
                            <aside>
                                <strong>Idade:</strong>
                                &nbsp;{ helpers.calculate_age(person.birth_date) }
                            </aside>
                            
                            <aside>
                                <strong>Família:</strong>
                                &nbsp;{ person.name_family }
                            </aside>

                            <Link onClick={() => localStorage.setItem('personId', person.id_person)} className="viewMore-link" to={"/person/"}>
                                <FiLogIn size={16} color="#E02041" />
                                Visualizar Perfil
                            </Link>

                            <Link style={{marginTop: 20}} className="viewMore-link" to={"/persons/update"}
                                onClick={() => {
                                    localStorage.setItem('personId', person.id_person);
                                    localStorage.setItem('name_person', person.name_person);
                                    localStorage.setItem('nickname', person.nickname);
                                    localStorage.setItem('genre', person.genre);
                                    localStorage.setItem('birth_date', person.birth_date);
                                    localStorage.setItem('death_date', person.death_date);
                                    localStorage.setItem('mother_id', person.mother_id);
                                    localStorage.setItem('father_id', person.father_id);
                                    localStorage.setItem('family_id', person.family_id);
                                    localStorage.setItem('city_person', person.city_person);
                                    localStorage.setItem('uf_person', person.uf_person);
                                    localStorage.setItem('user_id_person', person.user_id_person);
                                    localStorage.setItem('photo_person', person.photo_person);
                                }
                            } >
                                <FiLogIn size={16} color="#E02041" />
                                Alterar Perfil
                            </Link>

                            <button onClick={() => handleDeletePerson(person.id_person)} type="button">
                                <FiTrash2 size={20} color="#a8b8b3" />
                            </button>
                        </div>
                    </li> 
                ))}
            </ul>

            }
        </div>
    );

}