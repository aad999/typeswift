import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const NUMB_OF_WORDS = 20;
const SECONDS = 60;

const App = () => {
  const [words, setWords] = useState([]);
  const [countDownReal, setCountDownReal] = useState(SECONDS);
  const [countDown, setCountDown] = useState(SECONDS);
  const [status, setStatus] = useState('not-started');
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [wrongWords, setWrongWords] = useState([]);
  const textInput = useRef(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get('http://localhost:4000/get_words');
        setWords(response.data.slice(0, NUMB_OF_WORDS));
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    fetchWords();
  }, []);

  useEffect(() => {
    if (status === 'started') {
      const timer = setInterval(() => {
        setCountDown(prevCountDown => prevCountDown - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [status]);

  useEffect(() => {
    if (countDown === 0) {
      setStatus('finished');
    }
  }, [countDown]);

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus();
    }
  }, [status]);

  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);
  
    if (status === 'started') {
      if (value === words[currWordIndex]) {
        setCurrWordIndex(prevIndex => prevIndex + 1);
        setCurrCharIndex(0);
        setInputValue('');
  
        // Check if it's the last word
        if (currWordIndex === words.length - 1) {
          setStatus('finished');
          setCountDownReal(countDown);
          setCountDown(0);
        }
      } else if (words[currWordIndex].startsWith(value)) {
        setCurrCharIndex(value.length);
      } else {
        if(wrongWords.includes(words[currWordIndex]) === false){
          setWrongWords(prevWrongWords => [...prevWrongWords, words[currWordIndex]]);
        }
        setCurrCharIndex(0);
      }
    }
  };
  

  const handleStartGame = () => {
    setStatus('started');
    setCountDown(SECONDS);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setInputValue('');
    setWrongWords([]);
  };

  const calculateTypingSpeed = () => {
    const wordsTyped = currWordIndex;
    const timeInSeconds = SECONDS - countDownReal;
    const typingSpeed = Math.round((wordsTyped / timeInSeconds) * 60);
    return typingSpeed;
  };

  const calculateAccuracy = () => {
    const totalWordsTyped = currWordIndex;
    const wrongWordsTyped = wrongWords.length;
    const accuracy = Math.round(((totalWordsTyped - wrongWordsTyped) / totalWordsTyped) * 100);
    return accuracy;
  };

  return (
    <div className="App">
      <div className="section">
        <h1>Type Racer Game</h1>
        {status === 'not-started' && (
          <button onClick={handleStartGame}>Start Game</button>
        )}
        {status === 'started' && (
          <div>
            <p>Time remaining: {countDown} seconds</p>
            <p>Type the following words:</p>
            <p>
              {words.map((word, index) => (
                <span
                  key={index}
                  style={{
                    color:
                      index < currWordIndex
                        ? 'green'
                        : index === currWordIndex
                        ? word.startsWith(inputValue)
                          ? 'black'
                          : 'red'
                        : 'black',
                  }}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
              disabled={status !== 'started'}
              ref={textInput}
            />
            <p>Words typed: {currWordIndex}</p>
            <p>Characters typed: {currCharIndex}</p>
          </div>
        )}
        {status === 'finished' && (
          <div>
            <p>Game finished!</p>
            <p>Typing speed: {calculateTypingSpeed()} words per minute</p>
            <p>Accuracy: {calculateAccuracy()}%</p>
            <p>Wrong words typed: {wrongWords.length}</p>
            <p>Wrong words: {wrongWords.join(', ')}</p>
            <button onClick={handleStartGame}>Start Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
