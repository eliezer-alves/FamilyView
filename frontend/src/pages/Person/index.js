import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import defaulProfile from '../../assets/default_profile.png';

const helpers = require('../../helpers/index');

export default function Person(){
    const history = useHistory();
    const userId   = localStorage.getItem('userId');
    const personId   = localStorage.getItem('personId');
    //localStorage.setItem('personId', null);
    
    const [person, setPerson] = useState([]);
    const [father, setFather] = useState([]);
    const [mother, setMother] = useState([]);
    const [brothers, setBrothers] = useState([]);

    useEffect(() => {
        api.get('person/'+personId, {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setPerson(response.data)
        })
    }, [personId]);

    
    let vet1 = person.map(person => (person.father_id));
    let vet2 = person.map(person => (person.mother_id));
    let fatherId = vet1[0];
    let motherId = vet2[0];

    useEffect(() => {
        api.get('person/'+fatherId, {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setFather(response.data)
        })
    }, [fatherId]);

    useEffect(() => {
        api.get('person/'+motherId, {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setMother(response.data)
        })
    }, [motherId]);

    useEffect(() => {
        api.get('person/brothers/'+personId, {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setBrothers(response.data)
        })
    }, [personId]);

    var father_name = father.map( father => ( father.name_person ));
    var mother_name = mother.map( mother => ( mother.name_person ));
    
    return(
        <div className="person-container">
            
            { person.map( person => (
            <div className="content">
                <div className="subcontent_1">
                    <section className="info-family">
                        <img src={logoImg} alt="Be The Hero"/>
                        <h1>Família { person.name_family }</h1>
                        <p>{person.about}</p>
                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                            Voltar para Home
                        </Link>
                    </section>
                    
                    <section className="profile-person">
                        <div>                        
                            <img src={person.photo_person} alt="Be The Hero"/>
                        </div>
                        <div className="data-person">
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
                                <p><strong color="black">Idade:</strong>&nbsp;{ helpers.calculate_age(person.birth_date) }</p>
                            </aside>
                            
                            <aside>                            
                                <p>
                                    <strong color="black">Pai:</strong>
                                    &nbsp;
                                    <Link onClick={() => localStorage.setItem('personId', person.father_id)} className="viewPerson-link" to={"/person/"}>
                                        { father_name }
                                    </Link>
                                                                
                                </p>
                            </aside>
                            
                            <aside>                            
                                <p>
                                    <strong color="black">Mãe:</strong>
                                    &nbsp;
                                    <Link onClick={() => localStorage.setItem('personId', person.mother_id)} className="viewPerson-link" to={"/person/"}>
                                        { mother_name }
                                    </Link>
                                </p>
                            </aside>
                            
                            <aside>
                                <p>
                                    <strong>Cidade:</strong>
                                    &nbsp;{ person.city_person } - { person.uf_person }
                                </p>
                            </aside>
                        </div>
                    </section>
                </div>
                <div className="subcontent_2">
                    <h2>Membros da Família</h2>
                    <section className="meet-section">
                    { father.map( father => (   
                        <Link onClick={() => localStorage.setItem('personId', father.id_person)} className="viewPerson-link" to={"/person/"}>
                            <div className="profile-person-2">
                                <img src={father.photo_person} alt="Be The Hero"/>
                                <p>{father.name_person}</p>
                            </div>
                        </Link>
                    ))}
                    { mother.map( mother => (   
                        <Link onClick={() => localStorage.setItem('personId', mother.id_person)} className="viewPerson-link" to={"/person/"}>
                            <div className="profile-person-2">
                                <img src={mother.photo_person} alt="Be The Hero"/>
                                <p>{mother.name_person}</p>
                            </div>
                        </Link>
                    ))}
                    </section>
                    <section className="meet-section">
                        { brothers.map( brother => (                        
                        <Link onClick={() => localStorage.setItem('personId', brother.id_person)} className="viewPerson-link" to={"/person/"}>
                            <div className="profile-person-2">
                                <img src={brother.photo_person} alt="Be The Hero"/>
                                <p>{ brother.name_person }</p>
                            </div>
                        </Link>
                        )) }
                    </section>
                </div>                
            </div>                        
            )) }
        </div>
    );
}