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
    var conta = contas.sort((a,b) => b.playerStats.playerLevel-a.playerStats.playerLevel);



    //Setar os rendimentos dos trabalhadores a cada minuto
    useEffect(()=>{
        const intervalo = setInterval(() => {
            setMoeda(prevMoeda => prevMoeda + (numFuncionarios * 720));
            toast.success(`Seus funcionários renderam: ${numFuncionarios * 720}$ no ultimo minuto.`)
        }, 60000);

        return () => clearInterval(intervalo);
    })

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
        const proxVaraPreco = (fishesMultiplier * 60)
        if(moeda >= proxVaraPreco){
            setMoeda(moeda - proxVaraPreco)
            setFishesMultiplier(prevMultiplier => prevMultiplier + 0.15 );
            toast.success("Upgrade comprado!")
        }else{
            toast.error(`Você não tem moedas suficientes, você precisa de mais ${formatarNumeroAbreviado(proxVaraPreco - moeda)} moedas!`);
        }
    }

    function AprimorarBanco(){
        const proxBanco = (moedaMultiplier * 80);
        if(moeda >= proxBanco){
            setMoeda(moeda - proxBanco);
            setMoedaMultiplier(prevMoeda => prevMoeda + 0.20);
            toast.success("Upgrade comprado!")
        }else{
            toast.error(`Você não tem moedas suficientes, você precisa de mais ${formatarNumeroAbreviado(proxBanco - moeda)} moedas!`);
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
                toast.error(`Você não tem dinheiro suficiente. Você precisa de mais: ${formatarNumeroAbreviado(valorFuncionario - moeda)}`);
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
                "playerWorkers": numFuncionarios
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

    function formatarNumeroAbreviado(number){
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
            <div className="rankingArea">
                {exibir ? (
                    <div>
                        <h1 align="center" className="tituloCombinando" >RANKING</h1>
                        <hr/>


                        <p><font size="2">(Apenas pescadores com mais de 100 peixes pescados irão ser exibidos aqui!)</font></p>
                    {conta.map((c)=>{
                        if(c.playerStats.playerTotalFishes > 100){
                            return <p>{`Nome: ${c.username} | Peixes Pescados: ${formatarNumeroAbreviado(c.playerStats.playerTotalFishes)}`}</p>
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
            <div className="playableArea">
            <h1 className="tituloCombinando">PESCA</h1>
            <hr/>

                <div className="peixeArea">
                <img className="baiacura" src="https://pbs.twimg.com/media/Eda4TaMXsAEjiDs.png"/>
                <p>{`Seus peixes na cesta: ${formatarNumeroAbreviado(peixe)}`}</p>
                </div>
                <div className="moedaArea">
                <img className="moeda" src="https://www.iconpacks.net/icons/1/free-coin-icon-794-thumb.png"/>
                <p>{`Suas moedas: ${formatarNumeroAbreviado(moeda)}`}</p>
                <hr/>
                </div>
                <button onClick={PescarPeixe} className="button">PESCAR 🐟 </button>
                <button onClick={VenderPeixes} className="button">{`VENDER PEIXES 💰 ${formatarNumeroAbreviado(peixe * moedaMultiplier)}`}</button><br/>
                <button onClick={AprimorarPesca} className="button" style={{'background-image': "linear-gradient(to bottom right, #b069ff, #b069ff)"}}>
                      {`UPAR PESCA ${formatarNumeroAbreviado(fishesMultiplier * 60)} $`}
                </button>
                <button onClick={AprimorarBanco} className="button" style={{'background-image': "linear-gradient(to bottom right, #b069ff, #b069ff)"}}>
                      {`UPAR BANCO ${formatarNumeroAbreviado(moedaMultiplier * 80)} $`}
                </button>
                <hr />
                <div className="buffArea">
                    <h2 className="buffs">ESTATÍSTICAS:</h2>
                    <p>{`Buff de peixes atual: ${fishesMultiplier.toFixed(2)}x`}</p>
                    <p>{`Buff de moedas atual: ${moedaMultiplier.toFixed(2)}x`}</p>
                    <p>{`Total peixes pescados: ${formatarNumeroAbreviado(totalPeixes)}`}</p>
                    <hr/>
                    <button onClick={SalvarProgresso} className="button" style={{'background-image': "linear-gradient(to bottom right, #57f269, #57f269)"}}>
                        <font size="1">SALVAR PROGRESSO 💾</font>
                    </button>
                </div>
            </div>
            <div className="playableArea">
                <h1 className="tituloCombinando">TRABALHADORES</h1>
                <hr/>


                <p>{`Número de funcionários: ${numFuncionarios}`}</p>
                <button onClick={ContratarFuncionar} className="button" style={{'background-image': "linear-gradient(to bottom right, #b069ff, #b069ff)"}}>
                    {`CONTRATAR FUNCIONÁRIO ${formatarNumeroAbreviado(numFuncionarios * 1320)} $`}
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}


export default Game