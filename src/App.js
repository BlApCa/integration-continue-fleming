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
    let ActualTime = document.getElementById('ActualTime')
    let ActualDate = document.getElementById('ActualDate')
    let currentHours = new Date().getHours()
    let currentMinutes = new Date().getMinutes()
    currentMinutes < 10 ? currentMinutes = '0'+currentMinutes : null
    let currentTime = `${currentHours}:${currentMinutes}`
    console.log(currentTime)
    let currentDate = new Date().toLocaleDateString('fr-FR')
    let opened = true;

    const pokedexOpener = (size,transition,opacity) =>
        (MyScreen.style.width = size,MiniScreen.style.transition = transition,MiniScreen.style.opacity = opacity, opened = !opened)

    const test = () =>
        opened ?
            (pokedexOpener('30vw','opacity 0.2s 0.4s','1'),ActualTime.append(currentTime), ActualDate.append(currentDate))
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
                <div id="Content">
                    <div className="header">
                        <h1>PokeShop</h1>
                        <input className="srchbar" type='search' placeholder='search'/>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <div className="cardHeader">
                                <div className="cardPkmnId">n°1</div>
                                <h3 className="cardPkmnName">Bulbizarre</h3>
                                <div className="cardPkmnFav">♥</div>
                            </div>
                            <div className="cardContent">
                                <img className="cardPkmnImg"
                                     src="https://freepngimg.com/save/16235-pokemon-picture/1037x985" alt=""></img>
                                <div className="cardPkmnListTypes">
                                    <div className="cardPkmnType"></div>
                                </div>
                            </div>
                            <div className="cardFooter">
                                <div className="buyingCounter">
                                    <div className="cardBtn">-</div>
                                    <input className="inputBuyCount" type="number"/>
                                    <div className="cardBtn">+</div>
                                </div>
                                <div className="cardBtn">buy</div>
                            </div>
                        </div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>

                    </div>
                </div>
                <div id="L-H" className="handle">
                    <div className="l_filter filter"></div>
                    <div id="L-C" className="circle">
                        <div className="border"></div>
                    </div>
                    <div id="Clicker-Btn" onClick='test()' className="mybutton"></div>
                </div>
                <div id="MiniScreen">
                    <div className="ms-filter"></div>
                    <h1 id="ActualTime"></h1>
                    <h3 id="ActualDate"></h3>
                </div>
                <div id="R-H" className="handle">
                    <div className="r_filter filter"></div>
                    <div id="R-C" className="circle">
                        <div className="border"></div>
                    </div>
                    <div id="Cart-Btn" className="mybutton">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="77" height="77"
                             viewBox="0 0 77 77">
                            <g id="iconCart" transform="translate(-1761 -617)">
                                <circle id="Ellipse_13" data-name="Ellipse 13" cx="38.5" cy="38.5" r="38.5"
                                        transform="translate(1761 617)" fill="#5400ff"/>
                                <g id="Subtraction_3" data-name="Subtraction 3" transform="translate(1780 627.701)"
                                   fill="#fff" stroke-linecap="round">
                                    <path
                                        d="M 35.5710334777832 44.09680557250977 L 4.428572654724121 44.09680557250977 L 0.5828027725219727 19.09670639038086 L 14.50030326843262 19.09670639038086 L 14.50030326843262 26.00010681152344 L 14.50030326843262 26.50010681152344 L 15.00030326843262 26.50010681152344 L 25.00020408630371 26.50010681152344 L 25.50020408630371 26.50010681152344 L 25.50020408630371 26.00010681152344 L 25.50020408630371 19.09670639038086 L 39.41680526733398 19.09670639038086 L 35.5710334777832 44.09680557250977 Z"
                                        stroke="none"/>
                                    <path
                                        d="M 35.14207458496094 43.59680557250977 L 38.83401489257812 19.59670639038086 L 26.00020408630371 19.59670639038086 L 26.00020408630371 27.00010681152344 L 14.00030326843262 27.00010681152344 L 14.00030326843262 19.59670639038086 L 1.165592074394226 19.59670639038086 L 4.857531547546387 43.59680557250977 L 35.14207458496094 43.59680557250977 M 36.00000381469727 44.59680557250977 L 3.999603509902954 44.59680557250977 L 3.543090770108392e-06 18.59670639038086 L 15.00030326843262 18.59670639038086 L 15.00030326843262 26.00010681152344 L 25.00020408630371 26.00010681152344 L 25.00020408630371 18.59670639038086 L 39.99960327148438 18.59670639038086 L 36.00000381469727 44.59680557250977 Z"
                                        stroke="none" fill="#707070"/>
                                </g>
                                <g id="Rectangle_9" data-name="Rectangle 9" transform="translate(1797 632.701)"
                                   fill="#fff" stroke="#707070" stroke-width="1">
                                    <rect width="6" height="19" stroke="none"/>
                                    <rect x="0.5" y="0.5" width="5" height="18" fill="none"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div id="Poke-Btn" className="mybutton">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="76" height="76"
                             viewBox="0 0 76 76">
                            <g id="iconShop" transform="translate(-865 -13)">
                                <circle id="Ellipse_2" data-name="Ellipse 2" cx="38" cy="38" r="38"
                                        transform="translate(865 13)" fill="#5400ff"/>
                                <path id="Union_2" data-name="Union 2"
                                      d="M21.363,26H5V18H21.363a22,22,0,0,1,43.275,0H81v8H64.638a22,22,0,0,1-43.274,0Z"
                                      transform="translate(860 29)" fill="#fff"/>
                                <circle id="Ellipse_4" data-name="Ellipse 4" cx="14" cy="14" r="14"
                                        transform="translate(889 37)" fill="#5400ff"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;
