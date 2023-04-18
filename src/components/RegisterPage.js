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
                <div>
                    <h2>CRIE SUA CONTA!</h2>
                    <h3>USUARIO: <p>(Também será seu nome in-game)</p></h3>
                    <input type="text" name="user" onChange={e => setUser(e.target.value)}></input>
                    <h3>SENHA:</h3>
                    <input type="password" name="password" onChange={e => setSenha(e.target.value)}></input>
                    <br></br>
                    <button onClick={EfetuarRegistro}>REGISTRAR</button>
                </div>
            </main>
        </div>
    )
}

export default RegisterPage