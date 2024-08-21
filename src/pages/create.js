"use client";

import Head from "next/head";
import Link from "next/link";
import Footer from "./components/Footer";
import { useState } from "react";
import {addCampaign} from "../services/Web3Service";

export default function Create() {

    const [campaign, setCampaign] = useState({});
    const [message, setMessage] = useState("");

    function onInputChange(e){
        setCampaign(prevState => ({...prevState, [e.target.id]: e.target.value}));
    }

    function btnSaveClick(){
        setMessage("Aguarde...");
        addCampaign(campaign)
            .then(tx => setMessage(JSON.stringify(tx)))
            .catch(err => setMessage(err.message));
    }

    return (
        <>
        <Head>
            <title>Donate Crypto | Crie Sua Campanha</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content="Sua plataforma de doação descentralizada." />
        </Head>
        <main className="container px-4 py-5">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
            <p>Preencha os campos para incluir sua campanha na plataforma.</p>
            <hr className="mb-4" />
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="text" id="title" className="form-control mb-3" value={campaign.title} placeholder="Título da campanha" onChange={onInputChange}/>
                    <label for="title">Título:</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea type="text" id="description" className="form-control mb-3" value={campaign.description} placeholder="Descreva sua campanha" onChange={onInputChange} />
                    <label for="description">Descrição:</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" id="imageUrl" className="form-control mb-3" value={campaign.imageUrl} placeholder="Insira a URL da sua imagem" onChange={onInputChange} />
                    <label for="imageUrl">URL da Imagem:</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" id="videoUrl" className="form-control mb-3" value={campaign.videoUrl} placeholder="Insira a URL do seu vídeo" onChange={onInputChange} />
                    <label for="videoUrl">URL do Vídeo:</label>
                </div>
            </div>
            <div className="col-6 mb-3">
                <button type="button" className="btn btn-primary col-12 p-3" onClick={btnSaveClick}>Criar Campanha</button>
            </div>
            <div className="col-6 mb-3">
                <Link href="/" className="btn btn-secundary col-12 p-3">Voltar</Link>
            </div>
            {
                message ? 
                (
                    <div className="alert alert-success p-3 col-6" role="alert">{message}</div>
                ) : <></>
            }
            
            <Footer />
        </main>        
        </>
    );
}