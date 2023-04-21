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
    const [exp, setExp] = useState(playerStats.playerEXP);
    const [level, setLevel] = useState(playerStats.playerLevel);
    const [play, setPlay] = useState(false);

    const [contas, setContas] = useState([]);
    const [exibir, setExibir] = useState(true);
    var conta = contas.sort((a,b) => b.playerStats.playerLevel-a.playerStats.playerLevel); //Contas em ordem decrescente em relação as moedas

    var niveis = [
        {
            Level : 1,
            exp : 100
        },
        {
            Level : 2,
            exp : 100
        },
        {
            Level : 3,
            exp : 100
        },
        {
            Level : 4,
            exp : 100
        },
    ]

    // for(var i=0; i<niveis.length;i++){
    //     var count = 0;
    //     niveis[i].level = 25;
    //     niveis.push(
    //         {
    //             Level: 1,
    //             exp: 4
    //         }
    //     );
    //     console.log(niveis);
    // }

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
    //   "playerLevel": 1,
    //   "playerEXP": 1,
    //   "playerCoins": 62.15000000000084,
    //   "playerFishes": 0,
    //   "playerRebirth": 0,
    //   "playerCoinsMultiplier": 1,
    //   "playerFishesMultiplier": 2.649999999999999
    // }


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
        var peixePescadoEXP = (peixePescado / 50);
        setExp(prevExp => prevExp + peixePescadoEXP);
        setLevel(prevLevel => prevLevel + (prevLevel/100));
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
                "playerLevel": level,
                "playerEXP": exp,
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

    function Upar(){

    }

    return(
        <div className="container">
            <div className="rankingArea">
                {exibir ? (
                    <div>
                        <h1 align="center" className="tituloCombinando" >RANKING</h1>
                    {conta.map((c)=>{
                        return <p>{`Nome: ${c.username} Level: ${(c.playerStats.playerLevel).toFixed(0)}`}</p>

                    })}
                    <button onClick={ExibirRanking} className="button">Atualizar</button>
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
                <hr/>
                </div>
                <button onClick={PescarPeixe} className="button">PESCAR 🐟 </button>
                <button onClick={VenderPeixes} className="button">VENDER PEIXES 💰</button><br/>
                <button onClick={AprimorarVara} className="button"> <font size="4">{`UPAR VARA DE PESCA ${(fishesMultiplier * 60).toFixed(0)}`}</font> </button><br></br>
                <hr />
                <div className="buffArea">
                    <h2 className="buffs">BUFFS:</h2>
                    <p>{`Buff de peixes atual: ${fishesMultiplier.toFixed(2)}x`}</p>
                    <p>{`Nível atual: ${level}`}<br/> {`Progresso: `}</p><br/>
                    <hr/>
                    <button onClick={SalvarProgresso} className="button" style={{'background-image': "linear-gradient(to bottom right, #57f269, #57f269)"}} ><font size="1">SALVAR PROGRESSO 💾</font></button>
                </div>
            </div>
        </div>
    )
}

// background-image: linear-gradient(to bottom right, #00c6ff, #0072ff);


export default Game