import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Dropzone from 'react-dropzone';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

import { DropContainer, UploadMessage, Preview } from './styles';

export default function NewPerson(){
    const history = useHistory();
    const userId   = localStorage.getItem('userId');

    const [name_person, setName] = useState();
    const [nickname, setNickname] = useState('');
    const [genre, setGenre] = useState('M');
    //const [photo_person, setPhotoPerson] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const [death_date, setDeath_date] = useState('');
    const [father_id, setFather_id] = useState('0');
    const [mother_id, setMother_id] = useState('1');
    const [family_id, setFamily_id] = useState('0');
    const [city_person, setCity] = useState('');
    const [uf_person, setUf] = useState('');
    var photo_person = null;

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

    async function handleNewPerson(e){
        e.preventDefault();
        console.log(photo_person)
        const formData = new FormData();
        formData.append("name_person", name_person);
        formData.append("nickname", nickname);
        formData.append("genre", genre);
        formData.append("birth_date", birth_date);
        formData.append("death_date", death_date);
        formData.append("father_id", father_id);
        formData.append("mother_id", mother_id);
        formData.append("family_id", family_id);
        formData.append("city_person", city_person);
        formData.append("uf_person", uf_person);
        formData.append("file", photo_person);
        /*const data = ({
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
        });*/
        console.log(photo_person);
        try{
            const response = await api.post('persons', formData, {
                headers: {
                    Authorization: userId,
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                },
            });
            
            history.push('/profile');
        } catch(err){
            alert('Falha no cadastro!');
        }
    };

    function renderDragMessage(isDragActive, isDragReject){
        if(!isDragActive){
            return <UploadMessage>Imagem de perfil</UploadMessage>
        }
        if(isDragReject){
            return <UploadMessage type="error">Arquivo insuportado</UploadMessage>
        }

        return <UploadMessage type="success">Solte aqui</UploadMessage>
    };

    let onChangeHandler=e=>{
        photo_person = e.target.files[0];
        console.log(photo_person);    
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

                            <input className="input-file"
                            name="photo_person" type="file"
                            multiple accept="image/*"
                            onChange={onChangeHandler} />

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
                            { mens.map(men => ( <option value={men.id_person}>{men.name_person}</option> )) }
                        </select>
                        <select id="mother" onChange={ e => setMother_id(e.target.value) }>
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
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}