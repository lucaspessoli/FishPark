import axios from "axios";
import {useState,useEffect} from 'react';
import Navbar from "../navegation/Navbar";
import Game from "./Game";

function GameMain(){

    const [logado, setLogado] = useState(false);
    const [user, setUser] = useState();
    const [senha, setSenha] = useState();
    const [player, setPlayer] = useState([]);

    useEffect(() => {
        console.log(player);
      }, [player]);


    function EfetuarLogin(){

        axios.get("http://localhost:5000/userInfos")
            .then((response)=>{
                var contas = response.data;
                console.log(contas);
                contas.map((conta)=>{
                    if(conta.username === user && conta.password === senha){
                        setLogado(true);
                        console.log("Sucesso! Você logou.")
                        setPlayer(conta);
                        console.log(player);
                    }
                })
                if(logado === false){
                    console.log("Conta não encontrada no sistema")
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
                        <div>
                            <h2>ENTRE NA SUA CONTA</h2>
                            <h3>USUARIO:</h3>
                            <input type="text" name="user" onChange={e => setUser(e.target.value)}></input>
                            <h3>SENHA:</h3>
                            <input type="password" name="password" onChange={e => setSenha(e.target.value)}></input>
                            <br></br>
                            <button onClick={EfetuarLogin}>LOGAR</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default GameMain