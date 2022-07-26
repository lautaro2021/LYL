import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../config';
import { updateData , getAllVehicles} from '../redux/actions';
import { useVerfication } from '../services/services';
import { setPanel } from '../redux/actions';
import s from './Styles/Panel.module.css';
import Nav from './Nav';
import notFound from '../media/notFound.jpg';
import swal from 'sweetalert';
import ReactPlayer from 'react-player';

function Panel() {
  const dispatch = useAppDispatch();
  const vehicle = useSelector((state:any) => state && state.vehicleDetails);

  useEffect(()=>{
    dispatch(setPanel(true))
  }, [])

  const navigate = useNavigate()
  const types = useSelector((state:any) => state && state.types);
  const [pos, setPos] = useState(0);
  const [video, setVideo] = useState(false);
  const [pres, setPres] = useState(false);
  const [pres2, setPres2] = useState(false);
  const [vehicleData,setVehicleData] = useState<any>({
    title: vehicle?.title,
    video: vehicle?.video,
    photo: vehicle?.photo,
    presentation: vehicle?.presentation,
    price: vehicle?.price,
    status: vehicle?.status,
    kilom: vehicle?.kilom,
    year: vehicle?.year,
    type: vehicle?.type,
    description: vehicle?.description,
    generalInfo: {
      tipoDeCombustible: vehicle?.generalInfo?.tipoDeCombustible,
      transmision: vehicle?.generalInfo?.transmision,
      motorizacion: vehicle?.generalInfo?.motorizacion,
      turbo: vehicle?.generalInfo?.turbo,
    },
    exterior:{
      aperturaDeCajuela: vehicle?.exterior?.aperturaDeCajuela,
      numeroDePuertas: vehicle?.exterior?.numeroDePuertas,
    },
    equipamiento: {
      alarma: vehicle?.equipamiento?.alarma,
      aireAcondicionado: vehicle?.equipamiento?.aireAcondicionado,
      espejosElectricos: vehicle?.equipamiento?.espejosElectricos,
      butacasCalefaccionadas: vehicle?.equipamiento?.butacasCalefaccionadas,
      controlDeVelocidad: vehicle?.equipamiento?.controlDeVelocidad,
    },
    seguridad :{
      ABS: vehicle?.seguridad?.ABS,
      cantidadDeAirbags: vehicle?.seguridad?.cantidadDeAirbags,
      controlEstabilidad: vehicle?.seguridad?.controlEstabilidad,
      controlTraccion: vehicle?.seguridad?.controlTraccion,
    },
    interior: {
      regulacionDeButaca: vehicle?.interior?.regulacionDeButaca,
      regulacionDeVolante: vehicle?.interior?.regulacionDeVolante,
    },
    multimedia: {
      bluetooth: vehicle?.multimedia?.bluetooth,
      GPS: vehicle?.multimedia?.GPS,
      USB: vehicle?.multimedia?.USB,
    },
  })
  console.log(vehicleData)
  
  const presType = vehicleData.presentation[0] && vehicleData.presentation.length && vehicleData.presentation[0].slice(-3)
  
  function handleSubmit(event:any){
    event.preventDefault()
    dispatch(updateData(vehicle?.id, vehicleData))
    swal({
      title: "Felicidades",
      text: "Vehiculo actualizado",
      icon: "success",
    })
    dispatch(getAllVehicles())
    navigate('/vehicles')
  }

  function setGeneralInfo(event:any){
    setVehicleData({
      ...vehicleData,
      generalInfo: {
        ...vehicleData.generalInfo,
        [event.target.name]: event.target.value,
      }
    })
  }

  function setExterior(event:any){
    setVehicleData({
      ...vehicleData,
      exterior: {
        ...vehicleData.exterior,
        [event.target.name]: event.target.value,
      }
    })
  }
  function setEquipamiento(event:any){
    setVehicleData({
      ...vehicleData,
      equipamiento: {
        ...vehicleData.equipamiento,
       [event.target.name]: event.target.value
      }
    })
  }
  function setSeguridad(event:any){
    setVehicleData({
      ...vehicleData,
      seguridad: {
        ...vehicleData.seguridad,
        [event.target.name]: event.target.value
      }
    })
  }
  function setInterior(event:any){
    setVehicleData({
      ...vehicleData,
      interior: {
        ...vehicleData.interior,
        [event.target.name]: event.target.value
      }
    })
  }
  
  function setMultimedia(event:any){
    setVehicleData({
      ...vehicleData,
      multimedia: {
        ...vehicleData.multimedia,
        [event.target.name]: event.target.value
      }
    })
  }

  function handlePosition(event: any){
    setPos(event.target.value)
  }

  function handleChange(event:any){
    setVehicleData({
        ...vehicleData,
        [event.target.name]: event.target.value
    })
  }

  function handleSelectVideo(event:any){
    if(event.target.value.slice(-3) !== 'mp4'){
      swal({
        title: "Error",
        text: "Solo puedes elegir videos",
        icon: "error",
      })
    }else {
      setVehicleData({
        ...vehicleData,
        video: (event.target.value).slice(12, event.target.value.length)
      })
      setVideo(true)
    }
  }

  function handleDeleteVideo(event:any){
    setVehicleData({
      ...vehicleData,
      video: ''
    })
    setVideo(false);
  }

  function handleDeleteImg(event:any){
    let images = vehicleData.photo.filter((p:any) => p !== event.target.value)
    setVehicleData({
      ...vehicleData,
      photo: images
    })
  }

  const uploadImage = async(e:any) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'chropyis');

    const res = await fetch("https://api.cloudinary.com/v1_1/mypc/image/upload", { method: "POST", body: data });
    const file = await res.json();

    if(!file.error && file.secure_url !== 'undefined'){
      if(vehicleData.photo.length <5 ){
        setVehicleData({
          ...vehicleData,
          photo: [...vehicleData.photo, file.secure_url]
        })
      }else{
        swal({
          title: "Error",
          text: "Maximo 5 fotos",
          icon: "error",
        })
      }
      
    }else console.log(file.error);
  }

  const uploadImagePresentation = async(e:any) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'chropyis');

    const res = await fetch("https://api.cloudinary.com/v1_1/mypc/image/upload", { method: "POST", body: data });
    const file = await res.json();

    if(!file.error && file.secure_url !== 'undefined'){
      if(vehicleData.presentation.length < 1){
        setVehicleData({
          ...vehicleData,
          presentation: [file.secure_url]
        })
      }else {
        swal({
          title: "Error",
          text: "Solo puedes elegir una archivo",
          icon: "error",
        })
      }
      
    }else console.log(file.error);
  }

  function handlePres(event:any){
    let valueFile = (event.target.value).slice(-3);
    if(valueFile === 'mp4'){
      setVehicleData({
        ...vehicleData,
        presentation: [(event.target.value).slice(12, event.target.value.length)]
      })
      setPres(true)
    }else {
      uploadImagePresentation(event)
      setPres(true)
    }
  }

  function handleDeletePres(event:any){
    setVehicleData({
      ...vehicleData,
      presentation: []
    })
    setPres(false);
  }

  useEffect(()=>{
    let data = window.localStorage.getItem("userDataLogin");
    let dataParse = data ? JSON.parse(data) : null
    if(dataParse && dataParse.email){
    }else{
        navigate(`/admin/login`)
    }
  },[])

  return (
    <>
    <Nav/>
    <section id={s.panelContainer}>
      <form id = {s.form} onSubmit = {handleSubmit}>
        <div id = {s.firstDiv}>
          <div id = {s.divImages}>
            <div id = {s.imgPrincipal}>
              <img src= {vehicleData.photo[pos] ? vehicleData.photo[pos] : notFound}></img>
            </div>
            <div id = {s.imgCarrousel}>
              {vehicleData.photo && vehicleData.photo.length &&
                vehicleData.photo.map((photo:any, i:any) => {
                  const styledBut = {
                    backgroundImage: `url("${photo}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: photo? 'cover' : 'contain',
                    outlineOffset: photo? '-8px' : '0px',
                    transition: '.2s',
                    cursor: 'pointer',
                  }
                  return (
                    <div id = {s.divButtons}>
                      <button style = {styledBut} value = {i} onClick = {handlePosition} id = {s.button}>
                        <button id = {s.button2} value = {photo} onClick = {handleDeleteImg}>X</button>
                      </button>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div id = {s.divInfo}>
              <input placeholder = "Titulo" name = "title" value = {vehicleData.title} onChange = {handleChange} required type = "text" id = {s.input1}></input>
              <div className = {s.select1}>
                <input placeholder = "Año" name = "year" value = {vehicleData.year} onChange = {handleChange} required type = "number" id = {s.input2}></input>
                <span> - </span>
                <input placeholder = "Kilom" name = "kilom" value = {vehicleData.kilom} onChange = {handleChange} required type = "number" id = {s.input2}></input>
              </div>
              <input placeholder = "Precio" name = "price" value = {vehicleData.price} onChange = {handleChange} required type = "number" id = {s.input1}></input>

              <div className = {s.select2}>
                {/* <label>
                  Subir imagen
                </label> */}
                <input type = "file" name = "photo" onChange = {uploadImage} id = {s.photo}/>
                <input type = "file" name = "video" onChange = {handleSelectVideo} id = {s.videoP}/>
                <input type = "file" name = "presentation" onChange = {handlePres} id = {s.presentation}/>
              </div>
              <textarea placeholder = "Descripcion" name = "description" value = {vehicleData.description} onChange = {handleChange} required id ={s.textarea}></textarea>
          </div>
          {video || pres || pres2 ?
          <div id = {s.divP}>
            { video &&
            <div id = {s.divVideo}>
              <video 
              src = {require(`../media/videos/${vehicleData.video}`)}
              controls
              muted
              id = {s.video}
              />
              <button onClick = {handleDeleteVideo}>X</button>
            </div>
          }
          { pres && 
          <div id = {s.divPres}>
            {
            presType === 'mp4' ?
            <video
            src = {require(`../media/videos/${vehicleData.presentation[0]}`)}
            controls
            muted
            id = {s.videoPres}
            />
            :
            <img src = {vehicleData.presentation[0]} id = {s.imgPres}></img>
            }
            <button onClick = {handleDeletePres}>x</button>
          </div>
          }
          </div>
          : null
          }
        </div>
        <h1 id = {s.h1}>CARACTERISTICAS</h1>
        <div id = {s.caracteristicas}>
          <div className= {s.general}>
            <h2>General</h2>
            <div>
            <label>Tipo de combustible      
              <select name = "tipoDeCombustible" onChange = {setGeneralInfo}>
                <option hidden>Nafta</option>
                <option value = 'Nafta'>Nafta</option>
                <option value = 'Diesel'>Diesel</option>
              </select>
            </label>
            <label>Motorizacion     
              <input type = 'text' name = "motorizacion" value = {vehicleData.generalInfo.motorizacion} onChange = {setGeneralInfo}></input>
            </label>
            <label>Turbo      
              <select name = "turbo" onChange = {setGeneralInfo}>
                <option hidden>Turbo</option>
                <option value = 'Si'>Si</option>
                <option value = 'No'>No</option>
              </select>
            </label>
            <label>Transmision
            <select name = "transmision" onChange = {setGeneralInfo}>
                <option hidden>Transmision</option>
                <option value = 'Automatica'>Automatica</option>
                <option value = 'Manual'>Manual</option>
            </select>
            </label>
            <label>Marca
            <select name = "type" onChange = {handleChange}>
                <option hidden>Marca</option>
                {types && types.map((t:any) =>{
                  return (
                    <option value = {t}>{t}</option>
                  )
                })}
            </select>
            </label>
            </div>
          </div>

          <div className= {s.general}>
            <h2>Exterior</h2>
            <div>
            <label>Apertura de cajuela
            <select name = "aperturaDeCajuela" onChange = {setExterior}>
              <option hidden>-</option>
              <option value = 'Manual'>Manual</option>
              <option value = 'Electrica'>Electrica</option>
              <option value = 'A distancia'>A distancia</option>
            </select>
            </label>
            <label>Numero de puertas
            <select name = "numeroDePuertas" onChange = {setExterior}>
              <option hidden>-</option>
              <option value = '3'>3</option>
              <option value = '5'>5</option>
            </select>
            </label>
            </div>  
          </div>

          <div className= {s.general}>
            <h2>Equipamiento</h2>
            <div>
              <label>Alarma
              <select name = "alarma" onChange = {setEquipamiento}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>Aire Acondicionado
              <select name = "aireAcondicionado" onChange = {setEquipamiento}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>Espejos Electricos
              <select name = "espejosElectricos" onChange = {setEquipamiento}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>Butacas Calefaccionadas
              <select name = "butacasCalefaccionadas" onChange = {setEquipamiento}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>Control cruzero
              <select name = "controlDeVelocidad" onChange = {setEquipamiento}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
            </div>
          </div>

          <div className= {s.general}>
            <h2>Seguridad</h2>
            <div>
              <label>ABS
              <select name = "ABS" onChange = {setSeguridad}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>Cantidad Airbags
              <select name = "cantidadDeAirbags" onChange = {setSeguridad}>
                <option hidden>-</option>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>
                <option value = "6">6</option>
                <option value = "7">7</option>
                <option value = "8">8</option>
                <option value = "9">9</option>
                <option value = "10">10</option>
              </select>
              </label>
              <label>Control de Traccion
              <select name = "controlTraccion" onChange = {setSeguridad}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>Control de Estabilidad
              <select name = "controlEstabilidad" onChange = {setSeguridad}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
            </div>
          </div>

          <div className= {s.general}>
            <h2>Interior</h2>
            <div>
              <label>Regulacion de butaca
              <select name = "regulacionDeButaca" onChange = {setInterior}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>Regulacion de volante
              <select name = "regulacionDeVolante" onChange = {setInterior}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>          
              </select>
              </label>
            </div>
          </div>

          <div className= {s.general}>
            <h2>Multimedia</h2>
            <div>
              <label>Bluetooth
              <select name = "Bluetooth" onChange = {setMultimedia}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>GPS
              <select name = "GPS" onChange = {setMultimedia}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
              <label>USB
              <select name = "USB" onChange = {setMultimedia}>
                <option hidden>-</option>
                <option value = "Si">Si</option>
                <option value = "No">No</option>
              </select>
              </label>
            </div>
          </div>
        </div>
        <button id = {s.buttonPublicar} type = 'submit'>ACTUALIZAR</button>
      </form>
    </section>
    </>
  )
}

export default Panel