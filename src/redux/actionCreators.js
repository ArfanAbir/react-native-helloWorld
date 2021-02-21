import * as actionTypes from './actionTypes';
import {navigate } from '../NavigationRoot';


export const addPlace = place => (dispatch,getState) => {
let token = getState().token;
    fetch(`https://my-places-6666a-default-rtdb.firebaseio.com/places.json?auth=${token}`,{
        method:"POST",
        body:JSON.stringify(place)
    })
            .catch(error => console.log(error))
            .then(response => response.json())
            .then(data => console.log(data))
    }


    export const setPlaces  = places =>{
        return{
            type: actionTypes.SET_PLACES,
            payload: places
        }
    }


export const loadPlaces = () => (dispatch, getState) =>{
    let token = getState().token;
    fetch(`https://my-places-6666a-default-rtdb.firebaseio.com/places.json?auth=${token}`)
    .catch(err =>{
        alert("Something Went Wrong! Sorry!");
        console.log(err);
    })
    .then(response => response.json())
    .then(data=> {
        const places = [];

        for(let key in data){
            places.push({
                ...data[key],
                key: key
            })
        }

        dispatch(setPlaces(places))
    }) 
}


export const deletePlace = key =>{
    return{
        type: actionTypes.DELETE_PLACE,
        payload: key,
    }
}


export const authUser = (token) =>{
    return{
        type: actionTypes.AUTHENTICATE_USER,
        payload: token,
    }
}

export const tryAuth = (email, password,mode) => dispatch =>{
    let url ="";
    const API_KEY = "AIzaSyCNS4dVF9fGtlDK6GwgjgoIhqs2ONKqcwQ";
    if(mode ==="signup"){
        url= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY; 
    } else if(mode ==="login"){
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY;
    }
    fetch(url,{

        method:"POST",
        body: JSON.stringify({
            email:email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .catch(err =>{
            console.log(err);
            alert("Authentication Failed!");
        })
        .then(response => response.json())
        .then(data =>{
            if(data.error){
                alert(data.error.message);
            } else{
                dispatch(authUser(data.idToken));
                navigate("Places");
               
            }
            console.log(data);
        })
   
}