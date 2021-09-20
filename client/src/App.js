import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import pages and layouts here
import { Landing } from './pages';

//import app css here

function App(){

    return(
        <>
        <Switch>
          <Route exact path="/"><Landing /></Route>
        </Switch>
      </>
    );
  
  };
  
  export default App;
  