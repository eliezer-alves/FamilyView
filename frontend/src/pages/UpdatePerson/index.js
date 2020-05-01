import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewPerson(){
    const history = useHistory();
    const userId   = localStorage.getItem('userId');
    const personId = localStorage.getItem('personId');
    const act_name_person = localStorage.getItem('name_person');
    const act_nickname = localStorage.getItem('nickname');
    const act_genre = localStorage.getItem('genre');
    const act_birth_date = localStorage.getItem('birth_date');
    const act_death_date = localStorage.getItem('death_date');
    const act_father_id = localStorage.getItem('father_id');
    const act_mother_id = localStorage.getItem('mother_id');
    const act_family_id = localStorage.getItem('family_id');
    const act_city_person = localStorage.getItem('city_person');
    const act_uf_person = localStorage.getItem('uf_person');
    const act_photo_person = localStorage.getItem('photo_person');
    
    //localStorage.clear();
    //localStorage.setItem('userId', userId);

    const [familys, setFamilys] = useState([]);
    const [mens, setMens] = useState([]);
    const [womans, setWomans] = useState([]);

    
    useEffect(() => {
        api.get('familys', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setFamilys(response.data)
        })
    }, [userId]);

    useEffect(() => {
        api.get('persons/mens', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setMens(response.data)
        })
    }, [userId]);

    useEffect(() => {
        api.get('persons/womans', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setWomans(response.data)
        })
    }, [userId]);

    const [name_person, setName] = useState(act_name_person);
    const [nickname, setNickname] = useState(act_nickname);
    const [genre, setGenre] = useState(act_genre);
    const [birth_date, setBirth_date] = useState(act_birth_date);
    const [death_date, setDeath_date] = useState(act_death_date);
    const [father_id, setFather_id] = useState(act_father_id);
    const [mother_id, setMother_id] = useState(act_mother_id);
    const [family_id, setFamily_id] = useState(act_family_id);
    const [city_person, setCity] = useState(act_city_person);
    const [uf_person, setUf] = useState(act_uf_person);
    const [photo_person, setPhotoPerson] = useState('');

    async function handleNewPerson(e){
        e.preventDefault();
        const data = ({
            name_person,
            nickname,
            genre,
            photo_person,
            birth_date,
            death_date,
            father_id,
            mother_id,
            family_id,
            city_person,
            uf_person,
        });

        try{
            const response = await api.post('persons', data, {
                headers: {
                    Authorization: userId,
                }
            });
            
            history.push('/profile');
        } catch(err){
            alert('Falha no cadastro!');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar Nova Pessoa</h1>
                    <p>Inclua o maior número de informações possível para que essa pessoa não se perca na história!</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewPerson}>
                    <div className="input-group-2">
                        <div className="element-1">
                            <input type="text" placeholder="Nome Completo"
                                value={name_person}
                                onChange={ e => setName(e.target.value)}
                            />

                            <input type="text" placeholder="Mais conhecido como..."
                                value={nickname}
                                onChange={ e => setNickname(e.target.value)}                    
                            />

                            <select value={ genre } onChange={ e => setGenre(e.target.value) }>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                        </div>
                        <div className="element-2">
                            <label htmlFor="input-file">Foto</label>
                            <input id="input-file" className="input-file" type="file"
                                value={photo_person}
                                onChange={ e => setPhotoPerson(e.target.value)}                    
                            ></input>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="bith_date">Nascimento:</label>
                        <label htmlFor="bith_date">Falecimento:</label>
                    </div>
                    <div className="input-group">
                        <input
                            id="birth_date"
                            type="date"
                            value={birth_date}
                            onChange={ e => setBirth_date(e.target.value) }
                        />
                        <input
                            type="date"
                            value={death_date}
                            onChange={ e => setDeath_date(e.target.value) }                        
                        />
                    </div>
                    <br/>                    
                    <label style={{marginTop: '15px'}} htmlFor="family">Família:</label>
                    <select id="family" onChange={ e => setFamily_id(e.target.value) }>
                        { familys.map(family => ( <option value={family.id_family}>{ family.name_family }</option> )) }
                    </select>

                    <div className="input-group">
                        <label htmlFor="father">Pai:</label>
                        <label htmlFor="mother">Mãe:</label>
                    </div>
                    <div className="input-group">
                        <select id="father" onChange={ e => setFather_id(e.target.value) }>
                            <option value=""></option>
                            { mens.map(men => ( <option value={men.id_person}>{men.name_person}</option> )) }
                        </select>
                        <select id="mother" onChange={ e => setMother_id(e.target.value) }>
                            <option value=""></option>
                            { womans.map(woman => ( <option value={woman.id_person}>{woman.name_person}</option> )) }
                        </select>
                    </div>

                    <div className="input-group">
                        <input
                            type="text" placeholder="Cidade"
                            value={city_person}
                            onChange={ e => setCity(e.target.value) }
                        />
                        <input
                            type="text" placeholder="UF"
                            style={{ width: 80 }}
                            value={uf_person}
                            onChange={ e => setUf(e.target.value) }                        
                        />
                    </div>
                    
                    <button className="button" type="submit">Alterar</button>
                </form>
            </div>
        </div>
    );
}