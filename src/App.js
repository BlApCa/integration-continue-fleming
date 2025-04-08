import React, { useState } from 'react';
import RegistrationForm from './components/forms/RegistrationForm';
import Toastr from './components/toastr/Toastr';
import './App.css';

/**
 * The main application component that renders the registration form and a toastr notification
 * upon successful registration.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [successful, setSuccessful] = useState(false);

    const MyScreen = document.getElementById('S')
    const MiniScreen = document.getElementById('MiniScreen')
    // let ActualTime = document.getElementById('ActualTime')
    // let ActualDate = document.getElementById('ActualDate')
    // let currentHours = new Date().getHours()
    // let currentMinutes = new Date().getMinutes()
    // currentMinutes < 10 ? currentMinutes = '0'+currentMinutes : null
    // let currentTime = `${currentHours}:${currentMinutes}`
    // console.log(currentTime)
    // let currentDate = new Date().toLocaleDateString('fr-FR')
    let opened = true;

    const pokedexOpener = (size,transition,opacity) =>
        (MyScreen.style.width = size,MiniScreen.style.transition = transition,MiniScreen.style.opacity = opacity, opened = !opened)

    const test = () =>
        opened ?
            pokedexOpener('30vw','opacity 0.2s 0.4s','1')/**ActualTime.append(currentTime), ActualDate.append(currentDate)**/
            : pokedexOpener('90vw','opacity 0.1s','0')



  return (
    <div className="App">
      <header className="App-header">
        <h1>Formulaire d'enregistrement</h1>
      </header>
        <main>
            <RegistrationForm setSuccessful={setSuccessful}/>
            {successful && <Toastr setSuccessful={setSuccessful}/>}

            <div id="S">
                <div id="L-H" className="handle">
                    <div className="l_filter filter"></div>
                    <div id="L-C" className="circle">
                        <div className="border"></div>
                    </div>
                    <div id="Clicker-Btn" onClick={test} className="mybutton"></div>
                </div>
                <div id="MiniScreen">
                    <div className="ms-filter"></div>
                    {/*<h1 id="ActualTime"></h1>*/}
                    {/*<h3 id="ActualDate"></h3>*/}
                </div>
                <div id="R-H" className="handle">
                    <div className="r_filter filter"></div>
                    <div id="R-C" className="circle">
                        <div className="border"></div>
                    </div>
                </div>

            </div>
        </main>
    </div>
  );
}

export default App;
