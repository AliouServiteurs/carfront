import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";


function AddCar(props){
    const[open, setOpen] = useState(false);
    const[car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        fuel: "",
        price: "",
    });

/*
     Les fonctions handleClose et handleClickOpen définissent la valeur de 
    l'état "open", ce qui affecte la visibilité du formulaire modal
*/
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event =>{
        setCar({...car,[event.target.name]:event.target.value });
    };

    const handleSave = () =>{
        props.addCar(car);
        handleClose();
    };

    return(
        <div>
            <Button variant="contained" onClick={handleClickOpen} >Nouvelle Voiture</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nouvelle Voiture</DialogTitle>
                <DialogContent>
                   <Stack>
                   <TextField
                        label="Brand"
                        name="brand"
                        variant="standard"
                        autoFocus
                        value={car.brand}
                        onChange={handleChange}
                    /><br/>
                    <TextField
                        label="Model"
                        name="model"
                        variant="standard"
                        value={car.model}
                        onChange={handleChange}
                    /><br/>
                    <TextField
                        label="Color"
                        name="color"
                        value={car.color}
                        onChange={handleChange}
                    /><br/>
                    <TextField
                        label="Year"
                        name="year"
                        variant="standard"
                        value={car.year}
                        onChange={handleChange}
                    /><br/>
                    <TextField
                        label="price"
                        name="price"
                        variant="standard"
                        value={car.price}
                        onChange={handleChange}
                    /><br/>
                   </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddCar;