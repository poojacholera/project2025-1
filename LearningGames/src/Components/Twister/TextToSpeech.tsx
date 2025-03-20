import  { useState, useEffect } from "react";5FB5D6

const TextToSpeech = ( {text,PlaySpinner, sendGameSatus, game}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    //PlaySpinner();
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    sendGameSatus(true);
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
    }
    synth.speak(utterance);
    PlaySpinner();
    setIsPaused(false);
  };

  // const handlePause = () => {
  //   const synth = window.speechSynthesis;

  //   synth.pause();

  //   setIsPaused(true);
  // };

  const handleStop = () => {
    sendGameSatus(false);
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button onClick={handlePlay}>{( isPaused) ?  "Tap" : "Play"}</button>
      {/* <button onClick={handlePause}>Pause</button> */}
      <button onClick={handleStop}>Stop</button> 
    </div>
  );
};

export default TextToSpeech;
