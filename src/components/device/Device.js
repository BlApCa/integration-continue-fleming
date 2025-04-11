import React, { useRef, useState } from "react";
import {LeftHandle} from "./left_handle/LeftHandle";
import {MiniScreen} from "./mini_screen/MiniScreen";
import {RightHandle} from "./right_handle/RightHandle";
import RegistrationForm from "../forms/RegistrationForm";
import Toastr from "../toastr/Toastr";

export const Device = () => {
    const [successful, setSuccessful] = useState(false);
    const screenRef = useRef(null);
    const miniScreenRef = useRef(null);
    const [opened, setOpened] = useState(false);

    const pokedexOpener = (size, transition, opacity) => {
        if (screenRef.current && miniScreenRef.current) {
            screenRef.current.style.width = size;
            miniScreenRef.current.style.transition = transition;
            miniScreenRef.current.style.opacity = opacity;
        }
    };
    const toggleDevice = () => {
        console.log('click',opened)
        if (!opened) {
            pokedexOpener('90vw', 'opacity 0.1s', '0');
        } else {
            pokedexOpener('30vw', 'opacity 0.2s 0.4s', '1');
        }
        setOpened(!opened);
    };
    return (
        <div id="S" ref={screenRef}>
            <LeftHandle onClick={toggleDevice}/>
            <MiniScreen ref={miniScreenRef}/>
            <main>
                <header className="App-header">
                    <h1>Formulaire d'enregistrement</h1>
                </header>
                <RegistrationForm setSuccessful={setSuccessful}/>
                {successful && <Toastr setSuccessful={setSuccessful}/>}
            </main>
            <RightHandle/>
        </div>
    )
}