import { Outlet } from "react-router";
import Header from "./Header";
import { Backdrop, Box, Button } from "@mui/material";
import { useState } from "react";
import tree from "./assets/vibrant-tree.png";
import CloseIcon from '@mui/icons-material/Close';
import "./App.css"

function GamesHome() {
    const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
    return (
        <>
            <h1>This is games home page</h1>
            <div className="card">
               <Header />
               <Outlet />
            </div>
            <Box
                  sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 300,
                  }}
                >
            <Button onClick={handleOpen}>Play Comparison</Button>
            <Backdrop
                 sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                 open={open}
                className="game-1"
            >
               <Box>
               <CloseIcon className="game-1-closehandle" onClick={handleClose} />
                </Box>
                {/* <CircularProgress color="inherit" value={100} /> */}
                <br/>
            <Box>
              <img src={tree} alt="1-tree" className="comapre-left"/>
              <img src={tree} alt="1-tree" className="comapre-right"/>
            </Box>
            </Backdrop>
            </Box>
            <div>
              <p className="game-heading-link">Let's play Twister</p>
            </div>

        </>
    )
}export default GamesHome;