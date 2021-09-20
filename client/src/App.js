import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import pages and layouts here
import { Header } from './layout';
import { Landing } from './pages';

//import app css here

function App(){

    return(
        <>
        <Header />
        <Switch>
          <Route exact path="/"><Landing /></Route>
        </Switch>
      </>
    );
  
  };
  
  export default App;
  