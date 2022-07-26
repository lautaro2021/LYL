import * as actions from '../actions';
import * as types from '../../types';
import audi from '../../media/Marcas/audi.jpg';
import bmw from '../../media/Marcas/bmw.jpg';
import ford from '../../media/Marcas/ford.jpg';
import mb from '../../media/Marcas/mb.jpg';
// import peugeot from '../../media/Marcas/peugeot.jpg';
import volkswagen from '../../media/Marcas/volkswagen.jpg';
import jeep from '../../media/Marcas/Jeep.webp';


const initialState:any = {
    vehicles: [],
    allVehicles: [],
    vehicleDetails: {},
    actualPage: 1,
    actualType : [],
    types: ['bmw', 'audi', 'peugeot', 'citroen', 'mercedesbenz','jeep','ford', 'fiat', 'toyota', 'volkswagen', 'renault', 'chevrolet', 'honda', 'hyundai','kia','alfaromeo','nissan','chrysler','volvo','suzuki', 'ducati', 'rouser', 'yamaha'],
    fotos: [
        {text: "audi", photo: audi}, 
        {text: "bmw", photo: bmw}, 
        {text: "ford", photo: ford},
        {text: "mercedesbenz", photo: mb}, 
        {text: "jeep", photo: jeep},
        {text: "volkswagen", photo: volkswagen}],
    panel: false,
    
}


export default function rootReducer(state = initialState, action:any){
    switch (action.type) {
        case actions.GET_ALL_VEHICLES:
            return{
                ...state,
                vehicles: action.payload,
                allVehicles: action.payload
            }
        case actions.GET_VEHICLES_BY_NAME:
            let vehiclesFiltered = [...state.allVehicles].filter(v => v.title.toLowerCase().includes(action.payload.toLowerCase()))
            return{
                ...state,
                vehicles: vehiclesFiltered,
            }
        case actions.GET_DETAILS:
            return {
                ...state,
                vehicleDetails: action.payload
            }
        case actions.DELETE_VEHICLE:
            let filtered:Array<types.Vehicle>= [];
            if(action.payload){
                filtered = state.vehicles.filter((v:types.Vehicle) => v.id !== action.payload.id)
            }
            return{
                ...state,
                vehicles: filtered,
            }
        case actions.CHANGE_PAGE:
            return {
                ...state,
                actualPage: action.payload
            }
        case actions.SET_TYPE:
            return{
                ...state,
                actualType: [action.payload]
            }
        case actions.REFRESH_TYPE:
            return {
                ...state,
                actualType: action.payload
            }
        case actions.SET_PANEL:
            return {
                ...state,
                panel: action.payload
            }
        default:
            return state
    }
}