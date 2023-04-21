import Navbar from "../navegation/Navbar"
import { useState, useEffect } from "react"
import axios from "axios";

function RegisterPage(){

    const [user, setUser] = useState();
    const [senha, setSenha] = useState();


    function EfetuarRegistro(){
        try{
            axios.get("http://localhost:5000/userInfos")
                .then((response)=>{
                    var data = response.data;
                    console.log(data);
                    var ultimaConta = (data[data.length - 1]);
                    console.log(ultimaConta);
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
                            "playerRebirth": 0
                        }
                    }
                    axios.post("http://localhost:5000/userInfos", conta)
                        .then((response)=>{
                            console.log("Conta criada com sucesso!")
                        })
                })
        }catch{
            console.log("erro!");
        }
        // axios.put("http://localhost:5000/userInfos")
        //     .then((response)=>{
        //         console.log("Informações enviadas com sucesso")
        //     })
        //     .catch((err) => console.log(err))
    }


    return(
        <div>
            <Navbar />
            <main>
                <div className="divCentralizada">
                <form className="form">
                    <p className="form-title">Crie a sua conta!</p>
                        <div className="input-container">
                        <input placeholder="Insira o seu usuário" type="text" onChange={(e => setUser(e.target.value))}/>
                    </div>
                    <div className="input-container">
                        <input placeholder="Insira sua senha" type="password" onChange={(e => setSenha(e.target.value))}/>
                        </div>
                        <button className="submit" onClick={EfetuarRegistro}> REGISTRAR </button>
                </form>
                </div>
            </main>
        </div>
    )
}

export default RegisterPage