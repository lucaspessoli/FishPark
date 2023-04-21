import axios from "axios";
import {useState,useEffect} from 'react';
import Navbar from "../navegation/Navbar";

function MainGame(props){

    // useEffect(()=>{
    //     document.title = "Fish Park";
    // }, [])

    return(
    <div>
        <Navbar />
        <h1>Pagina principal</h1>
    </div>
    )
}

export default MainGame