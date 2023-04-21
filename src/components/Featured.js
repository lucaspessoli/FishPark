import Navbar from "../navegation/Navbar"
import { useEffect } from "react";

function Featured(){

    useEffect(()=>{
        document.title = "Fish Park";
    }, [])

    return(
        <div>
            <Navbar />
            <h1>Atualizações!</h1>
        </div>
    )
}

export default Featured