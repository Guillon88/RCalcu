import React from "react";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}


function Calcu() {

  const [screen, setScreen] = useState("0")
  const [operador, setOperador] = useState("")
  const [lastnum, setLastnum] = useState("0")
  return (
    <div className="calcu">
      <div className="calcu-screen-operador">{operador}</div>
      <div className="calcu-screen">{screen}</div>
      <div className="buttons">
      <div className="buttons-row">
          <ButtonC setScreen={setScreen} setOperador={setOperador} />
          <ButtonDel screen={screen} setScreen={setScreen} />
          <ButtonOp operador="%" screen={screen} setOperador={setOperador} setLastnum={setLastnum} setScreen={setScreen} />
          <ButtonOp operador="/" screen={screen} setOperador={setOperador} setLastnum={setLastnum} setScreen={setScreen} />
        </div>
        <div className="buttons-row">
          <ButtonNumber number="7" screen={screen} setScreen={setScreen} />
          <ButtonNumber number="8" screen={screen} setScreen={setScreen} />
          <ButtonNumber number="9" screen={screen} setScreen={setScreen} />
          <ButtonOp operador="*" screen={screen} setOperador={setOperador} setLastnum={setLastnum} setScreen={setScreen} />
        </div>
        <div className="buttons-row">
          <ButtonNumber number="4" screen={screen} setScreen={setScreen} />
          <ButtonNumber number="5" screen={screen} setScreen={setScreen} />
          <ButtonNumber number="6" screen={screen} setScreen={setScreen} />
          <ButtonOp operador="-" screen={screen} setOperador={setOperador} setLastnum={setLastnum} setScreen={setScreen} />
        </div>
        <div className="buttons-row">
          <ButtonNumber number="1" screen={screen} setScreen={setScreen} />
          <ButtonNumber number="2" screen={screen} setScreen={setScreen} />
          <ButtonNumber number="3" screen={screen} setScreen={setScreen} />
          <ButtonOp operador="+" screen={screen} setOperador={setOperador} setLastnum={setLastnum} setScreen={setScreen} />
        </div>
        <div className="buttons-row">
          <ButtonNumber number="0" screen={screen} setScreen={setScreen} />
          <div className="button-space"></div>
          <ButtonNumber number="." screen={screen} setScreen={setScreen} />
          <ButtonEq lastnum ={lastnum} operador={operador} screen={screen} setOperador={setOperador} setLastnum={setLastnum} setScreen={setScreen} />
        </div>
      </div>
    </div>
  )
}


function ButtonDel(props) {
  const screen = props.screen;
  const setScreen = props.setScreen;

  return ( 
    <div className="button" onClick={() => {
      if(screen.length>1){
        setScreen(screen.substring(0,screen.length-1));
      }
      else {
        setScreen(0);
      }
    }}>
      DEL
    </div>
  );
}

function ButtonC(props) {
  
  const setScreen = props.setScreen;
  
  

  return (
    <div className="button" onClick={() => {
      setScreen("0");

    }}>
      C
    </div>

  );
}

function ButtonEq(props) {
  const setOperador = props.setOperador;
  const setLastnum = props.setLastnum;
  const screen = props.screen;
  const setScreen = props.setScreen;
  const lastnum = props.lastnum;
  const operador = props.operador;

  var toeval = ""
  

  return(
    <div className="button" onClick={() => {
      if (operador == ""){
        setOperador("=");
        /* Si el operador esta vacio no hacemos nada */
      } else if (operador == "=") {
        /*si el operador es = no hacemos nada */ 
        setOperador("=");
      } else if (operador == "%" ){
        /* En este caso hacemos porcentaje segun esta formula
           toeval=screen*(lastnum/100) */
        toeval = screen + "*(" + lastnum + "/100)"

        setScreen(eval(toeval));
        
        setOperador("=");
       
      } else {
        console.log('eval: ' + eval(lastnum + operador + screen ));
        console.log('lastnum: ', lastnum, ' operador: ' + operador +  ' screen:' + screen);
        toeval = lastnum + operador + screen;
        console.log('toeval: ' + toeval);
        setScreen(eval(lastnum + operador + screen ));
        
        setOperador("=");
        console.log('lastnum: ', lastnum, ' operador: ' + operador +  ' screen:' + screen);

      }
      
    }}>
        =
    </div>
  );
}

function ButtonOp(props) {
  const operador = props.operador;
  const setOperador = props.setOperador;
  const setLastnum = props.setLastnum;
  const screen = props.screen;
  const setScreen = props.setScreen;
  

  return(
    <div className="button" onClick={() => {
      setOperador(operador);
      setLastnum(screen);
      setScreen("0")
    }}>
        {operador}
    </div>
  );
}

function ButtonNumber(props) {
  const screen = props.screen;
  const setScreen = props.setScreen;
  const number = props.number;
  return (
    <div className="button" onClick={() => {
      if(screen == "0"){
        setScreen(number);
      } else {
        setScreen(screen + number);
      }
      
    }}>
      {number}
    </div>

  );


}

export default App;
