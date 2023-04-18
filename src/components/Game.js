import { useEffect, useState } from "react";
import axios from "axios";
// import numeral from 'numeral';


function Game(props){

    const player = props.player;
    const playerStats = props.player.playerStats
    const [peixe, setPeixe] = useState(playerStats.playerFishes);
    const [moeda, setMoeda] = useState(playerStats.playerCoins);
    const [fishesMultiplier, setFishesMultiplier] = useState(playerStats.playerFishesMultiplier);
    const [moedaMultiplier, setMoedaMultiplier] = useState(playerStats.playerCoinsMultiplier);
    const [contas, setContas] = useState([]);
    const [exibir, setExibir] = useState(true);
    var conta = contas.sort((a,b) => b.playerStats.playerCoins-a.playerStats.playerCoins); //Contas em ordem decrescente em relação as moedas



    // useEffect(() =>{
    //     setInterval(()=>{
    //         setMoeda(prevMoeda => prevMoeda + 1);
    //         setTimeout(1000);
    //     }, 1000);
    // }, )
    // "id": 1,
    // "username": "Lucas",
    // "password": "adm",
    // "playerStats": {
    //   "playerFishes": 0,
    //   "playerCoins": 0,f
    //   "playerRebirth": 0,
    //   "playerFishesMultiplier": 1,
    //   "playerCoinsMultiplier": 1


    function ExibirRanking(){
        axios.get("http://localhost:5000/userInfos")
            .then((response)=>{
                var data = response.data;
                setContas(data);
                setExibir(true);
                console.log(data[1]);
    })
    }

    function PescarPeixe(){
        var peixePescado = (1 * fishesMultiplier);
        setPeixe(prevPeixe => prevPeixe + peixePescado);
        console.log(peixe);

    }

    function VenderPeixes(){
        var coinAfterBoost = (peixe * playerStats.playerCoinsMultiplier)
        setMoeda(prevMoeda =>  prevMoeda + coinAfterBoost);
        setPeixe(0);
    }

    function AprimorarVara(){
        const proxVaraPreco = (fishesMultiplier * 60)
        if(moeda >= proxVaraPreco){
            setMoeda(moeda - proxVaraPreco)
            setFishesMultiplier(prevMultiplier => prevMultiplier + 0.15 );
        }else{
            console.log("Você não tem dinheiro suficiente!");
        }
    }

    function SalvarProgresso(){
        var conta = {
            "id": props.player.id,
            "username": props.player.username,
            "password": props.player.password,
            "playerStats": {
                "playerCoins": moeda,
                "playerFishes": peixe,
                "playerRebirth": 0,
                "playerCoinsMultiplier": moedaMultiplier,
                "playerFishesMultiplier": fishesMultiplier,
                "playerRebirth": 0
            }
        }
        axios.put(`http://localhost:5000/userInfos/${conta.id}`, conta)
            .then((response)=>{
                console.log("Sucesso!" + response)
            })
            .catch((err) => (console.log(err)))
    }

    return(
        <div className="container">
            <div className="rankingArea">
                {exibir ? (
                    <div>
                        <h1 align="center">RANKING</h1>
                    {conta.map((c)=>{
                        return <p>{`Nome: ${c.username}, Coins: ${c.playerStats.playerCoins.toFixed(2)}`}</p>

                    })}
                    <button onClick={ExibirRanking}>Atualizar</button>
                    </div>
                ): (
                    <div>
                    <p> false!</p>
                    <button onClick={ExibirRanking}>Exibe</button>
                    </div>
                )}
            </div>
            <div className="playableArea">
                <div className="peixeArea">
                <img className="baiacura" src="https://pbs.twimg.com/media/Eda4TaMXsAEjiDs.png"/>
                <p>{`Seus peixes na cesta: ${peixe.toFixed(0)}`}</p>
                </div>
                <div className="moedaArea">
                <img className="moeda" src="https://www.iconpacks.net/icons/1/free-coin-icon-794-thumb.png"/>
                <p>{`Suas moedas: ${moeda.toFixed(0)}`}</p>
                </div>
                <button onClick={PescarPeixe}>PESCAR</button> <br></br>
                <button onClick={VenderPeixes}>VENDER PEIXES</button>
                <button onClick={AprimorarVara}>{`UPAR VARA DE PESCA ${(fishesMultiplier * 60).toFixed(0)}`}</button><br></br>
                <button onClick={SalvarProgresso}>SALVAR PROGRESSO</button>

                <div className="buffArea">
                    <h2 className="buffs">BUFFS:</h2>
                    <p>{`Buff de peixes atual: ${fishesMultiplier.toFixed(2)}x`}</p>
                </div>
            </div>
        </div>
    )
}

export default Game