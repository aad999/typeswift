import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Page = (props) => {
  const [SECONDS, setSECONDS] = useState(60);
  const [MINUTES, setMINUTES] = useState(1);
  const [NUMB_OF_WORDS, setNUMB_OF_WORDS] = useState(20);
  const [NUMB_OF_QUOTES, setNUMB_OF_QUOTES] = useState(10);
  const [words, setWords] = useState([]);
  const [countDownReal, setCountDownReal] = useState(SECONDS);
  const [countDown, setCountDown] = useState(SECONDS);
  const [status, setStatus] = useState('not-started');
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [wrongWords, setWrongWords] = useState([]);
  const [wordCount, setWordCount] = useState([]); // for hard
  const textInput = useRef(null);
  const df = props.difficulty;
  if(df === "easy" && NUMB_OF_WORDS < 50){
    setNUMB_OF_WORDS(50);
  }
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get('https://typeswift-backend.onrender.com/' + (df === "easy" ? "get_couples" : (df === "medium" ? "get_words" : "get_quotes")));
        if (df === "hard") {
          const quotes = [];
          (response.data).forEach((quote) => {
            quotes.push(quote.quote);
          })
          console.log(quotes);
          setWords(quotes.slice(0, NUMB_OF_QUOTES));
          const words_in_sentence = (str) => {
            return ((str.split(" ")).length);
          }
          quotes.forEach((quote) => {
            if(wordCount.length === 0){
              wordCount.push(words_in_sentence(quote));
            }
            else{
              const prev = wordCount[wordCount.length - 1];
              wordCount.push(prev + words_in_sentence(quote));
            }
          })
        }
        else {
          setWords(response.data.slice(0, NUMB_OF_WORDS));
        }
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
        if (wrongWords.includes(words[currWordIndex]) === false) {
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

  const calculateTypingSpeed = (real) => {
    if(df === "hard"){
      const wordsTyped = wordCount[currWordIndex];
      const timeInSeconds = (real ? SECONDS - countDownReal : SECONDS - countDown);
      if (timeInSeconds <= 0) {
        const typingSpeed = Math.round((wordsTyped / SECONDS) * 60);
        return typingSpeed;
      }
      const typingSpeed = Math.round((wordsTyped / timeInSeconds) * 60);
      return typingSpeed;
    }
    const wordsTyped = currWordIndex;
    const timeInSeconds = (real ? SECONDS - countDownReal : SECONDS - countDown);
    if (timeInSeconds <= 0) {
      const typingSpeed = Math.round((wordsTyped / SECONDS) * 60);
      return typingSpeed;
    }
    const typingSpeed = Math.round((wordsTyped / timeInSeconds) * 60);
    return typingSpeed;
  };

  const calculateAccuracy = () => {
    const totalWordsTyped = currWordIndex;
    const wrongWordsTyped = wrongWords.length;
    const accuracy = Math.round(((totalWordsTyped - wrongWordsTyped) / totalWordsTyped) * 100);
    return accuracy;
  };

  const updateDuration = (e) => {
    const val = Math.max(1, Math.min(5, e.target.value));
    setMINUTES(val);
    setSECONDS(val * 60);
  }

  return (
    <div className={"w-full h-screen flex flex-col space-y-5 justify-center items-center md:p-20 sm:p-10 p-5 " + (df === "easy" ? "bg-green-300" : (df === "medium" ? "bg-amber-300" : "bg-red-300"))}>
      <h1 class={"font-extrabold text-3xl w-full max-w-3xl text-center bg-amber-300 p-5 -mb-4 rounded-lg rounded-b-none text-white drop-shadow-xl " + (df === "easy" ? "bg-green-300" : (df === "medium" ? "bg-amber-300" : "bg-red-300"))}>{status === "finished" ? "Game Over ;)" : "--- Type Swift ---"}</h1>
      <div className="drop-shadow-xl rounded-lg rounded-t-none w-full max-w-3xl h-full min-h-fit flex flex-col justify-center items-center bg-gradient-to-bl from-rose-100 to-teal-100">
        {status === 'not-started' && (
          <div className="w-72 h-32 grid grid-cols-2 justify-center items-center gap-5">
            <label for="duration" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none tranistion-all duration-1000 w-32 h-14">Duration (in mins): </label>
            <input type="number" value={MINUTES} onChange={ updateDuration } className="w-32 h-14 text-center focus:outline-none rounded-lg" name="duration" id="duration"></input>
            <button onClick={handleStartGame} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none tranistion-all duration-1000 h-14 w-32">Start Game</button>
            <a href="/home" className="h-14 w-32">
              <button className="text-white bg-amber-700 hover:bg-amber-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none tranistion-all duration-1000 h-14 w-32">Home</button>
            </a>
          </div>
        )}
        {status === 'started' && (
          <div class="w-full flex flex-col justify-center items-center text-center space-y-5 p-10">
            <div class="w-full flex items-center justify-center space-x-5">
              <p><span class="font-extrabold italic">COUNTDOWN</span>: <span>{countDown} sec</span></p>
              <p><span class="font-extrabold italic">TYPING SPEED</span>: <span>{calculateTypingSpeed(false)} wpm</span></p>
              <p><span class="font-extrabold italic">ACCURACY</span>: <span>{calculateAccuracy()} %</span></p>
            </div>
            <p class="outline-4 p-10 rounded-lg text-xl font-extrabold">
              {words.map((word, index) => (
                <span
                  key={index}
                  class={(df === "hard" && index != currWordIndex) ? "hidden" : ""}
                  style={{
                    color:
                      index < currWordIndex
                        ? 'green'
                        : index === currWordIndex
                          ? word.startsWith(inputValue)
                            ? 'black'
                            : 'red'
                          : 'gray',
                  }}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
            <div class="p-10 py-0">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
                disabled={status !== 'started'}
                ref={textInput}
                class="w-full bg-transparent outline outline-4 rounded-lg h-full p-10 text-center focus:outline-4"
              />
            </div>
          </div>
        )}
        {status === 'finished' && (
          <div class="flex flex-col space-y-10">
            <div class="w-full flex flex-col items-center justify-center space-y-5">
              <p><span class="font-extrabold italic">COUNTDOWN</span>: <span>{countDown} sec</span></p>
              <p><span class="font-extrabold italic">TYPING SPEED</span>: <span>{calculateTypingSpeed(true)} wpm</span></p>
              <p><span class="font-extrabold italic">ACCURACY</span>: <span>{calculateAccuracy()} %</span></p>
              <p><span class="font-extrabold italic">WRONG WORDS TYPED</span>: <span>{wrongWords.length}</span></p>
            </div>
            <div className="w-full flex items-center justify-center space-x-5">
              <button onClick={handleStartGame} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none tranistion-all duration-1000 w-32">Start Game</button>
              <a href="/home">
                <button className="text-white bg-amber-700 hover:bg-amber-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none tranistion-all duration-1000 w-32">Home</button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
