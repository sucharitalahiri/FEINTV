import  { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        if (!input || /[+\-*/]$/.test(input)) {
          setResult('Error');
          return;
        }

        const evalResult = eval(input); // Only acceptable here for controlled input
        if (input === '0/0') {
          setResult('NaN');
        } else if (/\/0$/.test(input)) {
          const left = input.split('/')[0];
          if (parseFloat(left) !== 0) {
            setResult("Infinity");
          } else {
            setResult('NaN');
          }
        } else {
          setResult(evalResult.toString());
        }
      } catch (e) {
        setResult('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '*',
    'C', '0', '=', '/'
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>React Calculator</h1>
      <input
        type="text"
        value={input}
        readOnly
        style={{ width: '200px', height: '30px', fontSize: '20px', marginBottom: '10px', textAlign: 'center' }}
      />
      <div>
        {result && <h2>{result}</h2>}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 60px)',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px'
      }}>
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(btn)}
            style={{
              height: '60px',
              fontSize: '20px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
