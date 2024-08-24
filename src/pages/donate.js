"use client";

import Head from "next/head";
import Link from "next/link";
import Footer from "./components/Footer";
import { useState } from "react";
import {addCampaign} from "../services/Web3Service";

export default function Donate() {

    const [campaign, setCampaign] = useState({});
    const [donation, setDonation] = useState(0);
    const [message, setMessage] = useState("");

    function onChangeId(e){
        campaign.id = e.target.value;
    }


    function btnSearchClick(){
        setMessage("Buscando.... Aguarde...");
        addCampaign(campaign.id)
            .then(result => {
                setMessage("");
                result.id = campaign.id;
                setCampaign(result);
            })
            .catch(err => setMessage(err.message));
    }

    return (
            <>
            <Head>
                <title>Donate Crypto | Fazer Doação</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content="Sua plataforma de doação descentralizada." />
            </Head>
            <main className="container px-4 py-5">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
                {
                    !campaign.id ?
                    (
                        <>
                            <p className="mb-5">
                                Qual o ID da campanha que procura?
                            </p>
                            <div className="col-3">
                                <div className="input-group mb-3">
                                    <input type="number" id="campaignId" className="form-control" onChangeId={onChangeId} value={campaign.id} />
                                    <input type="button" value="Buscar" className="btn btn-primary" onClick={btnSearchClick} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Verifique se esta é a campanha certa antes de finalizar sua doação</p>
                            <hr />
                            <div className="row flex-lg-row-reverse align-items-center g-5">
                                <div className="col-7">
                                    {
                                        campaign.videoUrl ?
                                        (
                                            <iframe width="100%" height="480" src={campaign.videoUrl}></iframe>
                                        ) : (
                                            <img src={campaign.imageUrl} className="d-block mx-lg-auto img-fluid" width="640" height="480" />
                                        )
                                    }
                                </div>
                                <div className="col-5 mb-5" style={{height:480, scrollbars:}}>
                                    <h2>{campaign.title}</h2>
                                    <p><strong>Autor:</strong>{campaign.author}</p>
                                    <p className="mb-3">{campaign.description}</p>
                                    {
                                        campaign.videoUrl ?
                                        (
                                            <p>Assista o vídeo ao lado para entender a campanha.</p>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <p className="mb-3 fst-italic mt-5">E aí, o que achou do projeto? Já foram arrecadados {campaign.balance / (10**18)} BNB.</p>
                                    <div className="mb-3">
                                        <div className="input-group">
                                        <input type="number" id="donation" className="form-control" onChangeId={onChangeValue} value={donation} />
                                        <span className="input-group-text">BNB</span>
                                        <input type="button" value="Doar" className="btn btn-primary w-25" onClick={btnDonateClick} />                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </p>
                    )
                }

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