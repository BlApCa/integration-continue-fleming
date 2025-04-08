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
                    </div>
                </div>
                <div id="L-H" className="handle">
                    <div className="l_filter filter"></div>
                    <div id="L-C" className="circle">
                        <div className="border"></div>
                    </div>
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
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;
