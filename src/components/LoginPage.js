import axios from "axios";
import {useState,useEffect} from 'react';
import Navbar from "../navegation/Navbar";
import Game from "./Game";

import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GameMain(){

    const [logado, setLogado] = useState(false);
    const [user, setUser] = useState();
    const [senha, setSenha] = useState();
    const [player, setPlayer] = useState([]);



    useEffect(() => {
        console.log(player);
      }, [player]);

    const notify = () => toast("Erro! Conta não encontrada.");


    function EfetuarLogin(){

        axios.get("http://localhost:5005/userInfos")
            .then((response)=>{
                var contas = response.data;
                var encontrado = false
                contas.map((conta)=>{
                    if(conta.username === user && conta.password === senha){
                        setLogado(true);
                        setPlayer(conta);
                        encontrado = true
                    }
                })
                if(encontrado){
                    toast.success("Logado com sucesso!")
                }else{
                    toast.error("Conta não encontrada no sistema.")
                }
            })
    }
    

    return(
        <div>
            <Navbar />
            <main>
                <div>
                    {logado === true ? (
                        <Game player = {player}/>
                    ) : (
                        <div className="divCentralizada">
                        <span className="form">
                            <p className="form-title">Entre na sua conta!</p>
                                <div className="input-container">
                                <input placeholder="Insira o seu usuário" type="text" onChange={(e => setUser(e.target.value))}/>
                            </div>
                            <div className="input-container">
                                <input placeholder="Insira sua senha" type="password" onChange={(e => setSenha(e.target.value))}/>
                                </div>
                                <button className="submit" onClick={EfetuarLogin}> ENTRAR </button>
                        </span>
                        </div>
                    )}
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}

export default GameMain