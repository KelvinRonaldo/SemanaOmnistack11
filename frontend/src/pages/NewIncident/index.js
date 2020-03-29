import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

export default function NewIncident(){
    const ongId = sessionStorage.getItem('ongId');
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(event){
        event.preventDefault();

        const data = {
            title, 
            description, 
            value
        }

        try{
            await api.post('/incidents', data, {
                headers:{
                    Authorization: ongId
                }
            });
            history.push("/profile");
        }catch{
            alert('Falha ao cadastrar caso, tente novamente!');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content"> 
                <section>
                    <img src={logoImg} alt="be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#e02041'/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        onChange={e => setDescription(e.target.value)}
                    >
                        {description}
                    </textarea>
                    <input 
                        placeholder="Valor em Reais(R$)"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="button">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}