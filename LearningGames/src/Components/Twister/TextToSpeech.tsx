import  { useState, useEffect } from "react";

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
    PlaySpinner();
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
    }
    synth.speak(utterance);
   
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
      <button className="button button-play" onClick={handlePlay}>{( isPaused && game) ?  "Tap" : "Play"}</button>
      {/* <button onClick={handlePause}>Pause</button> */}
      <button className="button button-stop" onClick={handleStop}>Stop</button> 
    </div>
  );
};

export default TextToSpeech;
