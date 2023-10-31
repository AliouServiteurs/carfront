import React,{useEffect, useState} from "react";
import { SERVER_URL } from '../Constants.js'
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar.js';
import EditCar from './EditCar.js';

import Stack from "@mui/material/Stack";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Carlist(){
    const columns = [
            { field: 'brand', headerName: 'Marque', width: 200 },
            { field: 'model', headerName: 'Modèle', width: 200 },
            { field: 'color', headerName: 'Couleur', width: 200 },
            { field: 'year', headerName: 'Année', width: 150 },
            { field: 'price', headerName: 'Prix', width: 150 },
            {
                field:"_links.car.href",
                headerName:"",
                sortable:false,
                filterable:false,
                renderCell:row =><EditCar data={row} updateCar={updateCar}/>,
                
            },
            {/*Ajouter pour rendre le boutton supprimer visible et cliquable*/
                field:"_links.self.href",
                headerName:"",
                sortable:false,
                filterable:false,
                renderCell:row =>(
                    <IconButton  onClick={() => {onDelClick(row.id)}}>
                        <DeleteIcon color="error"/>
                    </IconButton>
                ),           
            },
            
        ];
   
    const[cars, setCars] = useState([]);
    useEffect(() => {
        fetchCars();
        },[]);
        
    const [open, setOpen] = useState(false);


 /*/ defintion de la fontion fetchCars
    C'est nécessaire car nous voulons également appeler fetch après la
    suppression de la voiture pour montrer à l'utilisateur une liste mise à jour des voitures
 */   
    const fetchCars = () =>{
        const token = sessionStorage.getItem("jwt");
        fetch (SERVER_URL + "api/cars", {
            headers: {authorization: token},
        })
            .then(response=>response.json())
            .then(data =>setCars(data._embedded.cars))
            .catch(err => console.error(err)) 
    };

/*
    Implémentez la fonction onDelClick. Nous envoyons la requête DELETE à un lien de voiture,
    et lorsque la requête DELETE réussit, nous rafraîchissons la page de liste
*/
    const onDelClick = url => {
        if(window.confirm("Are you sure to delete ?")){ 
        // ajout du jeton pour autoriser a SUPPRIMER un voiture     
            const token = sessionStorage.getItem("jwt");
            fetch(url, {headers: {authorization: token},method:"DELETE",})
            .then(response => {
               if(response.ok){
                fetchCars();
                setOpen(true);
               } else {
                alert("Quelque chose s'est mal passee !");
               }
            })
            .catch(err => console.error(err));
        }
    };
/*
    la fonction "addCar" dans le fichier "Carlist.js", qui enverra la requête POST à
    l'endpoint backend "api/cars". La requête inclura le nouvel objet de voiture dans le corps (body)
*/  
    const addCar = car =>{
    // ajout du jeton pour autoriser a AJOUTER un voiture     
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL+"api/cars",{
            method:"POST",
            headers:{authorization: token,'Content-Type':'application/json'},
            body:JSON.stringify(car),
        })
        .then(response =>{
            if (response.ok) {
                fetchCars();
            } else {
                alert("Something went wrong !")
            }
        })
        .catch(err => console.error(err))
    };
/*
    La fonction prend deux arguments : l'objet de la voiture mis à jour et l'URL de la
    requête. Après une mise à jour réussie, nous récupérerons les voitures et mettrons à jour la liste
*/
    const updateCar = (car, link) =>{
    // ajout du jeton pour autoriser a AJOUTER un voiture     
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method:"PUT",
            headers:{authorization: token,'Content-Type':'application/json'},
            body:JSON.stringify(car),
        })
        .then(response =>{
            if (response.ok) {
                fetchCars();
            } else {
                alert("Something went wrong !")
            }
        })
        .catch(err => console.error(err))
    };


    return(
       <React.Fragment>
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar} />
            </Stack>
            <div  style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    disableSelectionOnClick ={true}
                    getRowId={row => row._links.self.href}
                />
                
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose ={()=>setOpen(false)}
                    message="Voiture supprimee"
                />  
            </div>
       </React.Fragment>
    );
};
export default Carlist;