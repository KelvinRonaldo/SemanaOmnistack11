import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongName = sessionStorage.getItem('ongName');
    const ongId = sessionStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch{
            alert('Erro ao apagar caso, tente novamente!');
        }
    }

    function handleLogout(){
        sessionStorage.clear();
        history.push("/");
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-Vinda, {ongName}</span>
                
                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pr-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => {handleDeleteIncident(incident.id)}} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}