import  { useState } from 'react';

const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example",
};

const SpellCheck = () => {
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    if (!inputText.trim()) {
      setSuggestion('');
      return;
    }

    const words = inputText.split(/\s+/);
    for (let word of words) {
      const cleaned = word.toLowerCase().replace(/[^a-z]/gi, '');
      if (customDictionary[cleaned]) {
        setSuggestion(`Did you mean: ${customDictionary[cleaned]}?`);
        return;
      }
    }
    setSuggestion('');
  };

  return (
    <div style={{ width: '400px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>Spell Check and Auto-Correction</h1>
      <textarea
        rows="5"
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        value={text}
        onChange={handleChange}
        placeholder="Enter text . . ."
      ></textarea>
      {suggestion && <p style={{ marginTop: '10px' }}>{suggestion}</p>}
    </div>
  );
};

export default SpellCheck;
