import React, { useReducer, useContext } from "react";
import "./RCalc.css";

function RCalc() {
  return (
    <div className="App">
      <Calcu>
        <CalcuScreen />
        <CalcuButtons />
      </Calcu>
    </div>
  );
}
/*
isNumeric function in Javascript
*/
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function reducer(state, action) {
  const { button } = action;

  if (isNumeric(button)) {
    return {
      ...state,
      screen:
        state.screen === "0" || state.operador === "="
          ? button
          : state.screen + button,
      operador: state.operador === "=" ? "" : state.operador
    };
  } else if (button === "+") {
    return {
      ...state,
      operador: "+",
      lastnum: (state.lastnum === ""
        ? parseFloat(state.screen)
        : parseFloat(state.lastnum) + parseFloat(state.screen)
      ).toString(),
      screen: "0"
    };
  } else if (button === "-") {
    return {
      ...state,
      operador: "-",
      lastnum: (state.lastnum === ""
        ? parseFloat(state.screen)
        : parseFloat(state.lastnum) - parseFloat(state.screen)
      ).toString(),
      screen: "0"
    };
  } else if (button === "X") {
    return {
      ...state,
      operador: "X",
      lastnum: (state.lastnum === ""
        ? parseFloat(state.screen)
        : parseFloat(state.lastnum) * parseFloat(state.screen)
      ).toString(),
      screen: "0"
    };
  } else if (button === "/") {
    return {
      ...state,
      operador: "/",
      lastnum: (state.lastnum === ""
        ? parseFloat(state.screen)
        : parseFloat(state.lastnum) / parseFloat(state.screen)
      ).toString(),
      screen: "0"
    };
  } else if (button === "C") {
    return { ...initialState };
  } else if (button === ".") {
    if (state.screen !== "0") {
      return { ...state, screen: state.screen + "." };
    } else {
      return { ...state };
    }
  } else if (button === "DEL") {
    if (state.screen.length > 1) {
      return {
        ...state,
        screen: state.screen.substring(0, state.screen.length - 1)
      };
    } else {
      return { ...state, screen: "0" };
    }
  } else if (button === "%") {
    var res = parseFloat(state.screen) / 100;
    return { ...state, screen: res.toString() };
  } else if (button === "=") {
    console.log("reduce: =");
    console.log("state.operador: " + state.operador);
    var result = state.screen;
    switch (state.operador) {
      case "+":
        result = parseFloat(state.lastnum) + parseFloat(state.screen);
        break;
      case "-":
        result = parseFloat(state.lastnum) - parseFloat(state.screen);
        break;
      case "X":
        result = parseFloat(state.lastnum) * parseFloat(state.screen);
        break;
      case "/":
        result = parseFloat(state.lastnum) / parseFloat(state.screen);
        break;
    }
    return { ...state, screen: result.toString(), operador: "=", lastnum: "" };
  } else {
    console.log("ERROR REDUCER");
    return { ...initialState };
  }
}

const initialState = {
  screen: "0",
  operador: "",
  lastnum: ""
};

const ParentContext = React.createContext();

function Calcu(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ParentContext.Provider value={{ state, dispatch }}>
      <div className="calcu">{children}</div>
    </ParentContext.Provider>
  );
}

function CalcuButtons(props) {
  return (
    <div className="buttons">
      <div className="buttons-row">
        <CalcuButton>C</CalcuButton>
        <CalcuButton>DEL</CalcuButton>
        <CalcuButton>%</CalcuButton>
        <CalcuButton>/</CalcuButton>
      </div>
      <div className="buttons-row">
        <CalcuButton>7</CalcuButton>
        <CalcuButton>8</CalcuButton>
        <CalcuButton>9</CalcuButton>
        <CalcuButton>X</CalcuButton>
      </div>
      <div className="buttons-row">
        <CalcuButton>4</CalcuButton>
        <CalcuButton>5</CalcuButton>
        <CalcuButton>6</CalcuButton>
        <CalcuButton>-</CalcuButton>
      </div>
      <div className="buttons-row">
        <CalcuButton>1</CalcuButton>
        <CalcuButton>2</CalcuButton>
        <CalcuButton>3</CalcuButton>
        <CalcuButton>+</CalcuButton>
      </div>
      <div className="buttons-row">
        <CalcuButton>0</CalcuButton>
        <CalcuButton />
        <CalcuButton>.</CalcuButton>
        <CalcuButton>=</CalcuButton>
      </div>
    </div>
  );
}

function CalcuButton(props) {
  const { dispatch } = useContext(ParentContext);
  const { children } = props;
  const buttonClassName =
    "button noselect" + (children == null ? " " : " hover");

  return (
    <div
      className={buttonClassName}
      onClick={() => dispatch({ button: children })}
    >
      {children}
    </div>
  );
}

function CalcuScreen(props) {
  const { state } = useContext(ParentContext);
  return (
    <div className="calcu-screen">
      <div className="calcu-screen-operador">{state.operador}</div>
      <div>{state.screen}</div>
    </div>
  );
}

export default RCalc;
