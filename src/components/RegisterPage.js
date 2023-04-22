import Navbar from "../navegation/Navbar"
import { useState, useEffect } from "react"
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RegisterPage(){

    const [user, setUser] = useState();
    const [senha, setSenha] = useState();


    function EfetuarRegistro(){
        try{
            var canRegister = false
            var listaCanRegister = []
            axios.get("http://localhost:5005/userInfos")
                .then((response)=>{
                    var data = response.data;
                    var ultimaConta = (data[data.length - 1]);
                    var conta = {
                        "id": ultimaConta.id + 1,
                        "username": user,
                        "password": senha,
                        "playerStats": {
                            "playerLevel": 1,
                            "playerCoins": 0,
                            "playerFishes": 0,
                            "playerRebirth": 0,
                            "playerCoinsMultiplier": 1.00,
                            "playerFishesMultiplier": 1.00,
                            "playerWorkers": 0,
                        }
                    }

                    if(user === "" || user === " " || senha === "" || senha === " "){
                        toast.error("Senha/usuario devem ser preenchidos!");
                    }else{
                        data.map((contab)=>{
                            if(contab.username === user && listaCanRegister.length === 0){
                                listaCanRegister.push(1);
                                toast.error("Já possui uma conta com esse usuario!");
                            }
                        })
                        if(listaCanRegister.length === 0){
                            axios.post("http://localhost:5005/userInfos", conta)
                            .then(()=>{
                                toast.success("Conta criada com sucesso!");
                            })
                            .catch(()=>{
                                toast.error("Um erro inesperado aconteceu. Aguarde até o servidor voltar ao ar.")
                            })
                        }
                    }
                })
        }catch{
            toast.error("Um erro inesperado ocorreu!");
        }

    }


    return(
        <div>
            <Navbar />
            <main>
                <div className="divCentralizada">
                <span className="form">
                    <p className="form-title">Crie a sua conta!</p>
                        <div className="input-container">
                        <input placeholder="Insira o seu usuário" type="text" onChange={(e => setUser(e.target.value))}/>
                    </div>
                    <div className="input-container">
                        <input placeholder="Insira sua senha" type="password" onChange={(e => setSenha(e.target.value))}/>
                        </div>
                        <button className="submit" onClick={EfetuarRegistro}> REGISTRAR </button>
                </span>
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}

export default RegisterPage