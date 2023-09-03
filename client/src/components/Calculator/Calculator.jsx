import React, { useEffect, useState } from 'react';
import './Calculator.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCalculation } from '../../store/History/calculationSlice';

const Calculator = () => {
  const { isLoggedIn,authToken } = useSelector(state => state.auth);
  const [result, setResult] = useState("0");
  const [expression, setExpression] = useState("0");

  const dispatch = useDispatch();
  const handleClick = (value) => {
    if (expression === "0") {
      setExpression(value);
    } else {
      const prev = expression;
      setExpression(prev + value);
    } console.log(result, expression, value)
  };

  const handleClear = () => {
    setResult("0");
    setExpression("0");
  };

  useEffect(() => {
    const calculateResult = () => {
      try {
        // eslint-disable-next-line
        const res = eval(expression);
        setResult(res.toString());
      } catch (error) {
        setResult('Error');
      }
    };
    calculateResult();
  }, [expression])


  return (
    <div className="calculator">

      <div className="display">{expression}</div>
      <div className="display">Result: {result}</div>
      <div className="buttons">
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button className="clear-btn" onClick={handleClear}>
          C
        </button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('/')}>/</button>
        {
          isLoggedIn ? <button onClick={() => { dispatch(addCalculation({calculation:{expression,result}, authToken})) }} className="equals-btn" >Save</button> : <></>
        }

      </div>
    </div>
  );
};

export default Calculator;
