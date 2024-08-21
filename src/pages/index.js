"Use Client";

import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Footer from "./components/Footer";
import { doLogin } from "../services/Web3Service";

export default function Home() {

  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");

  function btnLoginClick(){
    doLogin()
      .then(wallet => setWallet(wallet))
      .catch(err => setError(err.message));
  }

  return (
    <>
    <Head>
      <title>Donate Crypto</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content="Sua plataforma de doação descentralizada." />
    </Head>
    <main className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items py-5 g-5">
        {
          !wallet ?(
            <div className="col-10 col-sm-8 col-lg-6">
              <img src="https://images.unsplash.com/photo-1723743809921-07781a7c6535?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
            </div>
          ) : (
            <div className="col-10 col-sm-8 col-lg-6">
              <p className="mb-3">Seja bem vindo!</p>
              <p className="mb-3">Você está conectado com sua conta {wallet}.</p>
              <p className="mb-3">O que pretende fazer?</p>
              <div>
                <p><Link href="/donate" className="btn btn-primary col-6 p-3">Quero fazer uma doação</Link></p>
                <p><Link href="/create" className="btn btn-secondary col-6 p-3">Quero criar uma campanha</Link></p>
              </div>
            </div>

          )
        }
        
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
          <p className="lead">Sua plataforma de doação descentralizada.</p>
          <p className="lead mb-3">Conecte a sua Metamask e faça a sua boa ação de hoje. Depois é só escolher para quem doar.</p>
          {
            !wallet ? (
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={btnLoginClick}>
                  <img src="/metamask.png" className="me-3" width="64" />
                  Conectar com a Metamask
                </button>
                {error}
              </div>
            ) : (
              <></>
            )
          }
          
        </div>
      </div>
      <Footer />
    </main>
    </>
  );
}
