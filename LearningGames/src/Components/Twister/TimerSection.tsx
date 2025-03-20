import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "./Twister.css";
//import { useEffect } from "react";

function TimerSection({time, sendTimer, counter, currentTimer, sendGameSatus, game }){
    const values = [0, 5, 10,15,20,25,30];
   let selectedTime = time;
    const handleTimerChange=( event: SelectChangeEvent) => {

        sendGameSatus(false);
        selectedTime = Number(event.target.value);
        console.log("selected timer: "+selectedTime);
        if(selectedTime ==0){
            sendGameSatus(false);
        }
        else if(selectedTime >0){
            sendGameSatus(true);
            sendTimer(selectedTime);
        }
    }
    // useEffect(() => {
    //     if(selectedTime > 0){
    //         sendGameSatus(true);
    //         sendTimer(selectedTime);
    //     }
    //     if (!game || (game&& selectedTime === 0) ) {
    //         clearInterval(currentTimer);
    //         console.log("timer-ref : "+currentTimer)
    //         return;
    //     }
    //     //clearInterval(currentTimer);
    //   }, [game,selectedTime]);
    

    return(
        <>
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label"><i data-lucide="timer"></i></InputLabel>
                    <Select
                        labelId="timer-select-label"
                        id="timer-select"
                        value={time}
                        label="Timer"
                        onChange={handleTimerChange}
                    >{values.map( (iValues)=>
                        <MenuItem key={iValues} value={iValues}>{iValues} sec</MenuItem>
                     )}
                    </Select>
                    </FormControl>
            </div>
        </>
    );
}export default TimerSection;