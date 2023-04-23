import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const [totalPeixes ,setTotalPeixes] = useState(playerStats.playerTotalFishes);
    const [numFuncionarios, setNumFuncionarios] = useState(playerStats.playerWorkers);

    const [contas, setContas] = useState([]);
    const [exibir, setExibir] = useState(true);
    var conta = contas.sort((a,b) => b.playerStats.playerTotalFishes-a.playerStats.playerTotalFishes);



    //Setar os rendimentos dos trabalhadores a cada minuto
    useEffect(()=>{
        const intervalo = setInterval(() => {
            if(numFuncionarios > 0){
                var peixesPescados = Math.random() * ((numFuncionarios * 160) - (numFuncionarios * 120)) + (numFuncionarios * 120);
                setPeixe(prevPeixe => prevPeixe + peixesPescados);
                setTotalPeixes(prevTotal => prevTotal + peixesPescados);
                console.log(peixesPescados);
                toast.success(`Seus pescadores pescaram: ${FormatarNumero(peixesPescados)} peixes no último minuto!.`)
            }
        }, 60_000);

        return () => clearInterval(intervalo);
    }, [])


    function ExibirRanking(){
        axios.get("http://localhost:5005/userInfos")
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
        setTotalPeixes(prevPeixeTotal => prevPeixeTotal + peixePescado);
    }

    function VenderPeixes(){
        var coinAfterBoost = (peixe * moedaMultiplier)
        setMoeda(prevMoeda =>  prevMoeda + coinAfterBoost);
        setPeixe(0);
    }

    function AprimorarPesca(){
        const proxVaraPreco = ((fishesMultiplier * 290))
        if(moeda >= proxVaraPreco){
            setMoeda(moeda - proxVaraPreco)
            setFishesMultiplier(prevMultiplier => prevMultiplier + (fishesMultiplier * 0.08) );
            toast.success("Upgrade comprado!")
        }else{
            toast.error(`Você não tem moedas suficientes, você precisa de mais ${FormatarNumero(proxVaraPreco - moeda)} moedas!`);
        }
    }

    function AprimorarBanco(){
        const proxBanco = (moedaMultiplier * 310);
        if(moeda >= proxBanco){
            setMoeda(moeda - proxBanco);
            setMoedaMultiplier(prevMoeda => prevMoeda + (moedaMultiplier * 0.04));
            toast.success("Upgrade comprado!")
        }else{
            toast.error(`Você não tem moedas suficientes, você precisa de mais ${FormatarNumero(proxBanco - moeda)} moedas!`);
        }
    }

    function ContratarFuncionar(){
        var valorFuncionario = (numFuncionarios * 1320)
        if(numFuncionarios === 0){
            valorFuncionario = 1320;
            if(moeda >= valorFuncionario){
                setMoeda(prevMoeda => prevMoeda - valorFuncionario);
                setNumFuncionarios(prevFuncionario => prevFuncionario + 1);
                toast.success("Funcionario contratado!");
            }else{
                toast.error(`Você não tem dinheiro suficiente. Você precisa de mais: ${valorFuncionario - moeda}`);
            }
        }else{
            if(moeda >= valorFuncionario){
                setMoeda(prevMoeda => prevMoeda - valorFuncionario);
                setNumFuncionarios(prevFuncionario => prevFuncionario + 1);
                toast.success("Funcionario contratado!");
            }else{
                toast.error(`Você não tem dinheiro suficiente. Você precisa de mais: ${FormatarNumero(valorFuncionario - moeda)}`);
            }
            
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
                "playerRebirth": 0,
                "playerTotalFishes": totalPeixes,
                "playerWorkers": numFuncionarios,
                "mod": playerStats.mod
            }
        }
        axios.put(`http://localhost:5005/userInfos/${conta.id}`, conta)
            .then(()=>{
                toast.success("Progresso salvo com sucesso!");
            })
            .catch(() =>{
                toast.error("Ocorreu um erro ao salvar! Verifique sua conexão com a internet.");
                toast.warn("Não faça alterações na página até a conexão estabilizar.");
            })
    }

    // function formatarNumeroAbreviado(numero) { //Código open-source,
    //     const sufixos = ['', 'K', 'M', 'B', 'T'];
    //     const magnitude = Math.floor(Math.log10(numero));
    //     const indiceSufixo = Math.min(Math.floor(magnitude / 3), sufixos.length - 1);
    //     const divisor = 10 ** (indiceSufixo * 3);
    //     const numeroAbreviado = numero / divisor;
    //     const sufixo = sufixos[indiceSufixo];
    //     if(numero >= 1 && numero <1000){
    //         return numeroAbreviado.toFixed(0) + sufixo;
    //     }
    //     if(numero >= 1000){
    //         return numeroAbreviado.toFixed(1) + sufixo;
    //     }
    //     return 0;
    //   } 
    //ANOTAÇÃO: Estudar o código acima

    function FormatarNumero(number){
        if (number < 1000){
            return number.toFixed(0);
        }else{
        if (number >= 1000 && number < 1_000_000) {
            return (number / 1000).toFixed(1) + "K";
          } else if (number >= 1_000_000 && number < 1_000_000_000) {
            return (number / 1_000_000).toFixed(1) + "M";
          } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
            return (number / 1_000_000_000).toFixed(1) + "B";
          } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
            return (number / 1_000_000_000_000).toFixed(1) + "T";
          } 
        }
    }//Código que retornará a formatação equivalente ao valor. Ex: 1000 irá virar 1k.   


    return(
        <div className="container">
                                                    {/* ZONA DE RANKING */}
            <div className="rankingArea">
                {exibir ? (
                    <div>
                    <h1 align="center" className="tituloCombinando" >RANKING</h1>
                    <hr/>
                        <p><font size="2">(Apenas pescadores com mais de 100 peixes pescados irão ser exibidos aqui!)</font></p>
                        {conta.map((c)=>{
                            if(c.playerStats.playerTotalFishes > 100){
                                return <p>{`Nome: ${c.username} | Peixes Pescados: ${FormatarNumero(c.playerStats.playerTotalFishes)}`}</p>
                            }
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
                                                    {/* ZONA DE PESCA */}
            <div className="playableArea">
            <h1 className="tituloCombinando">PESCA</h1>
            <hr/>
                <div className="peixeArea">
                <img className="baiacura" src="https://pbs.twimg.com/media/Eda4TaMXsAEjiDs.png"/>
                <p>{`Seus peixes na cesta: ${FormatarNumero(peixe)}`}</p>
                </div>
                <div className="moedaArea">
                <img className="moeda" src="https://www.iconpacks.net/icons/1/free-coin-icon-794-thumb.png"/>
                <p>{`Suas moedas: ${FormatarNumero(moeda)}`}</p>
                <hr/>
                </div>
                <button onClick={PescarPeixe} className="button">PESCAR 🐟 </button>
                <button onClick={VenderPeixes} className="button">{`VENDER PEIXES 💰 ${FormatarNumero(peixe * moedaMultiplier)}`}</button><br/>
                <button onClick={AprimorarPesca}className="button" style={{'background-image': "linear-gradient(to bottom right, #b069ff, #b069ff)"}}>
                    {`UPAR PESCA ${FormatarNumero(fishesMultiplier * 290)} $`}
                </button>
                <button onClick={AprimorarBanco} className="button" style={{'background-image': "linear-gradient(to bottom right, #b069ff, #b069ff)"}}>
                    {`UPAR BANCO ${FormatarNumero(moedaMultiplier * 310)} $`}
                </button>
                <hr />
                <div className="buffArea">
                    <h2 className="buffs">ESTATÍSTICAS:</h2>
                    <p>{`Buff de peixes atual: ${fishesMultiplier.toFixed(2)}x`}</p>
                    <p>{`Buff de moedas atual: ${moedaMultiplier.toFixed(2)}x`}</p>
                    <p>{`Total peixes pescados: ${FormatarNumero(totalPeixes)}`}</p>
                    <hr/>
                    <button onClick={SalvarProgresso} className="button" style={{'background-image': "linear-gradient(to bottom right, #57f269, #57f269)"}}>
                        <font size="1">SALVAR PROGRESSO 💾</font>
                    </button>
                </div>
            </div>
                                                    {/* ZONA DE WORKERS */}
            <div className="playableArea">
            <h1 className="tituloCombinando">PESCADORES</h1>
            <hr/>
                <img src="https://cdn-icons-png.flaticon.com/512/150/150676.png" height={55}/>
                <p>{`Número de pescadores: ${numFuncionarios}`}</p>
                <hr />
                <p>Rendimentos:</p>
                <p>{`🐟${FormatarNumero(numFuncionarios * 120)}-${FormatarNumero(numFuncionarios * 160)}/min🐟`}</p>
                <p>{`🐟${FormatarNumero(numFuncionarios * 7200)}-${FormatarNumero(numFuncionarios * 9600)}/hr 🐟`}</p>
                {
                    numFuncionarios ===0 ? (
                        <button onClick={ContratarFuncionar} className="button" style={{'background-image': "linear-gradient(to bottom right, #b069ff, #b069ff)"}}>
                            {`CONTRATAR PESCADOR ${FormatarNumero(1320)}$`}
                        </button>
                    ) : (
                        <button onClick={ContratarFuncionar} className="button" style={{'background-image': "linear-gradient(to bottom right, #b069ff, #b069ff)"}}>
                            {`CONTRATAR PESCADOR ${FormatarNumero(numFuncionarios * 1320)}$`}
                        </button>
                    )
                }
            </div>
            <ToastContainer />
        </div>
    )
}


export default Game