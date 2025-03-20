import { useEffect, useRef, useState } from "react";
import "./Twister.css"
import { ErrorBoundary } from "react-error-boundary";
import { Box } from "@mui/material";
import TextToSpeech from "./TextToSpeech";
import TimerSection from "./TimerSection";
import { iconMap } from "./Icons";

//https://medium.com/@aifuture/no-library-required-to-build-a-text-to-speech-component-in-react-e6833a66cea2

function Twister (){
    const limbs = ["Foot" ,"Hand"] as const;
    const colors = ["Red", "Blue", "Green", "Yellow"] as const;
    const sides =["Left","Right"] as const;
   // const gameStates=["Play","Pause","Stop"] as const; 
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStatus, setGameStatus] = useState<boolean>(false);
    const [counter, setCounter] = useState(0); //display counter
    const timer = useRef(null); // we can save timer in useRef and pass it to child
    const [ticking, setTicking] = useState(false);
    const getTimer= (time : number) =>{
        console.log("selected timer: "+time);
        setTime(time);
    }
    const [outputText , setOutputText] = useState("");
    const [limbIcon, setLimbIcon] = useState<string>();
    const [IconColor, setIconColor] = useState<string>("white");
    
    // getUserMedia({
    //     audio: true,
    //     video: true,
    //   });

        //start spinner on (1)touch Play or (2)on Timmer - 5/10/15/20/25/30 sec 
    const Spinner = () : void => {
        console.log("Spinner played");
        //generate random limb/color/side array selector
        const iLimb = Math.floor(Math.random() * limbs.length);
        const iColor = Math.floor(Math.random() * colors.length);
        const iSide = Math.floor(Math.random() * sides.length);
        //set output text
        const OutputText = `${sides[iSide]} ${limbs[iLimb]} on ${colors[iColor]}`;  
        setOutputText(OutputText);
        //set limb icon
        const iconKey = `${sides[iSide]}${limbs[iLimb]}` as keyof typeof iconMap;
        const selectedColor = colors[iColor];
        setLimbIcon(iconMap[iconKey][selectedColor]);
        //set icon color
        if (selectedColor === "Green" ){
            setIconColor("#08ff00");//#08ff00
        }else if (selectedColor === "Yellow" ){
            setIconColor("#ffff00");//#08ff00
        }else if (selectedColor === "Red" ){
            setIconColor("#ff0000");//#08ff00
        }else{
            setIconColor("#5FB5D6");//5FB5D6
        } 
        
        setMoves((prev)=> prev+1);
    }

    const getGameStatus = (staus:boolean) =>{
        setGameStatus(staus);
        if(!staus){
            setMoves(0);
            setCounter(0);
            setOutputText("");//unset output
            setTime(0);//unset timer
            setLimbIcon("");//unset icon
            setIconColor("white");
            setTicking(false);//set timer mode off
        }
    }
    
    useEffect(() => {
         if(gameStatus && time!=0){
            timer.current = setInterval(() => {
                setCounter((prev) => prev + 1);
              //  Spinner(); // Call spinner every 5 seconds
               // setCounter(0);
            }, 1000);
            console.log("timer-ref : "+timer.current);
        }
        // clear on component unmount
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
                console.log("timer-ref : "+timer.current)
            }
        };
      }, [gameStatus]);
      // Trigger Spinner every `time` seconds and reset counter
    useEffect(() => {
        if (counter >= time && time > 0) {
            Spinner(); // Perform spin
            const synth = window.speechSynthesis;
            const u = new SpeechSynthesisUtterance(outputText);
            synth.speak(u);
            setCounter(0); // Reset counter after spin
        }
        if(time === 0){
            getGameStatus(false);
            return () => {
                if (timer.current) {
                    clearInterval(timer.current);
                    console.log("timer-ref : "+timer.current)
                }
            };
            
        }
    }, [counter, time,outputText]);
    useEffect(() => { 
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(outputText);
        synth.speak(u);
    }, [outputText]);

    

        return(
            <>
                <span className="game-heading">Twister</span>
                <div className="game-container" style={{backgroundColor:IconColor}}>
                <ErrorBoundary fallback={<p>Something went wrong</p>}>
                    <div className="limb-color-circle" >
                        <img className="limb-icon" src={limbIcon}  />

                    </div>
                    <Box className="spinner-output"> 
                        <p className="spinner-output-text" >{outputText}</p>
                        <span style={{color:"darkgray"}}>moves:{moves}</span>
                        <div>
                            <TextToSpeech text={outputText} PlaySpinner={Spinner} sendGameSatus={getGameStatus} game={gameStatus} />
                            <span className="counter">{counter}</span>
                            <TimerSection time={time} sendTimer={getTimer} counter={counter} currentTimer={timer.current} sendGameSatus={getGameStatus} game={gameStatus} />
                         </div>
                    </Box>
                </ErrorBoundary>
                   {/* Expected output: Left Foot on Red */}
                </div>
            </>
        )
}export default Twister;