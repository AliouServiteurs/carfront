/**
    Nous allons implémenter la fonctionnalité de modification en ajoutant le bouton "Modifier" à chaque
    ligne du tableau. Lorsque le bouton "Modifier" de la ligne est pressé, il ouvre le formulaire modal, où l'utilisateur peut
    modifier la voiture existante et enregistrer enfin les changements
 */
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import Button from "@mui/material/Button";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";


function EditCar(props){

    const[open, setOpen] = useState(false);
    const[car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        price: "",
    });
    

/*
     Les fonctions handleClose et handleClickOpen définissent la valeur de 
    l'état "open", ce qui affecte la visibilité du formulaire modal
*/
    const handleClickOpen = () => {
        setCar({
            brand:props.data.row.brand,
            model:props.data.row.model,
            color:props.data.row.color,
            fuel:props.data.row.fuel,
            year:props.data.row.year,
            price:props.data.row.price,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event =>{
        setCar({...car,[event.target.name]:event.target.value });
    };

    const handleSave = () =>{
        props.updateCar(car, props.data.id);
        handleClose();
    };

    return(
        <div>
            <IconButton onClick={handleClickOpen} >
                <EditIcon color='info'/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier Voiture</DialogTitle>
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
                                variant="standard"
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
                                variant="standard"
                                name="price"
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

export default EditCar;