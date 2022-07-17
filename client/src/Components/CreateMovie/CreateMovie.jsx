import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { postMovie } from "../../Redux/actions"
import { Formik, Form, Field, ErrorMessage } from "formik";
// import demo from "../../assets/demo.png";
 import styles from'./CreateMovie.module.css'

export default function CreateMovie() {
    const dispatch = useDispatch()

    const clasificaciones = ['+13','+16','+18','ATP']
    const generos = ['Acción', 'Aventuras', 'Ciencia Ficción', 'Comedia','Documental','Drama','Fantasia','Musical','Suspenso','Terror']
    const [formSend, setFormSend] = useState(false);

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false);
    
    const uploadImage = async (e) => {
      const files = e.target.files;
      const data = new FormData();
      
      data.append('file', files[0]);
      data.append('upload_preset', 'magqqp6o');
      console.log(data)
      setLoading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload", { method: "POST", body: data })
      const file = await res.json();
      
      console.log(file)
      
          setImage(file.secure_url);
          setLoading(false)
          
      };

    // useEffect(()=>{

    // },[image])

    function handleSelectGenres(e,values){
      const {value} = e.target;
      if(!values.Genre.includes(value) && values.Genre.length<4){
          e.preventDefault();
          values.Genre = [...values.Genre, value]
      }
      else{
          alert("No puedes ingresar mas de cuatro géneros y tampoco repetirlos.")
      }
  }

  function handleDelete(e,values){
    e.preventDefault();
    const {name}= e.target
    return values.Genre = values.Genre.filter(g=>g!==name)
  }

  

const checkToken = window.localStorage.getItem(('sw-token'));


    return (
          
          (<Formik 
            initialValues={{
                Title:"",
                Plot:"",
                Language:"",
                Director:"",
                Genre:[],
                Actors:"",
                Release:"",
                Rated:"",
                Type:"",
                Runtime:undefined,
                Poster:"",
                Trailer:"",
            }}

            validate={(val) => {
                let errors = {};
                if(!val.Title) {errors.Title = "Por favor ingresa un titulo *"}
                else if(!/^[a-zA-Z ]*$/.test(val.Title)) {errors.Title = "Solo se aceptan letras y espacios *"}

                if(!val.Plot) {errors.Plot = "Por favor ingresa la trama *"}
                else if(!/^[A-Za-z0-9\s]+$/.test(val.Plot)) {errors.Plot = "Solo se aceptan letras, numeros y espacios *"}

                if(!val.Language) {errors.Language = "Por favor ingresa un idioma *"}

                if(!val.Director) {errors.Director = "Por favor ingresa el Director *"}

                if(val.Genre.length<1) {errors.Genre = "Por favor ingresa el/los géneros/s *"}

                if(!val.Actors) {errors.Actors = "Por favor ingresa los actores *"}

                if(!val.Release) {errors.Release = "Por favor ingresa una fecha de estreno *"}

                if(!val.Rated) {errors.Rated = "Por favor ingresa una clasificacion *"}

                if(!val.Type) {errors.Type = "Por favor ingresa un tipo *"}
            
                if(!val.Runtime) {errors.Runtime = "Por favor ingresa tiempo de duración de la pelicula*"}
                else if(isNaN(Number(val.Runtime))) errors.Runtime = "Alguno de los valores no es un número *";

                if(!val.Poster) {errors.Poster = "Por favor ingresa una imagen *"}

                if(!val.Trailer) {errors.Trailer = "Por favor ingresa un trailer *"}
                else if(!/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(val.Trailer)) {errors.Trailer = "Solo se aceptan links de youtube *"}
                

                return errors;
            }}

            onSubmit ={(values, {resetForm})=>{
              values.Genre = values.Genre.join(',')
              values.Poster = image
                dispatch(postMovie(values));
                console.log(values)
                setFormSend(true);
                setImage("")
                resetForm();
                setTimeout(()=>setFormSend(false),5000)
            }}
        >

          {( {errors, values, setFieldValue} ) => (
            <Form className="container my-5">
              {/* {console.log(values)} */}
              <div class="form-group">
                <div class="mb-3">
                  <label class="form-label" htmlFor="Title">
                    Titulo: <ErrorMessage name="Title" component={() => (<small style={{color:"red"}}>{errors.Title}</small>)}/>
                  </label>
                  <Field class="form-control" type="text" id="Title" name="Title" placeholder="Titulo..."/>
                </div>

                <div class="mb-2">
                  <label class="form-label" htmlFor="Plot">
                    Trama: <ErrorMessage name="Plot" component={() => (<small style={{color:"red"}}>{errors.Plot}</small>)}/>
                  </label>
                  <Field class="form-control" type="text" id="Plot" name="Plot" placeholder="Trama..."/>
                </div>

                <div className="row">
                    <div class="col mb-2">
                        <label class="form-label" htmlFor="Language">
                        Idioma: <ErrorMessage name="Language" component={() => (<small style={{color:"red"}}>{errors.Language}</small>)}/>
                        </label>
                        <Field class="form-control" type="text" id="Language" name="Language" placeholder="Idioma..."/>
                    </div>

                    <div class="col mb-2">
                        <label class="form-label" htmlFor="Director">
                        Director: <ErrorMessage name="Director" component={() => (<small style={{color:"red"}}>{errors.Director}</small>)}/>
                        </label>
                        <Field class="form-control" type="text" id="Director" name="Director" placeholder="Director..."/>
                    </div>

                    <div class="col mb-2">
                        <label class="form-label" >
                        Género/s: <ErrorMessage name="Genre" component={() => (<small style={{color:"red"}}>{errors.Genre}</small>)}/>
                        </label>
                        <Field class="form-select" name="Genre" as="select" onChange={(e)=>handleSelectGenres(e,values)}>
                        {
                      !values.Genre.length ?
                      <option key="seleccionar">Seleccionar</option> :
                      <option key="seleccionar" disabled >Seleccionar</option>
                    }
                    { generos?.map(e => 
                      (<option key={e} value={e}>{e}</option>)
                      )}
                        </Field>
                    </div>
                </div>
                
                <div className={styles.containerElem}>
                {values.Genre.map(gen=>
                    (<div className={styles.containerDlt} key={gen}>
                      <span>{gen}</span>
                        <button className={styles.deleteBtn} name={gen} onClick={(e)=>setFieldValue('Genre',handleDelete(e,values))}>x</button>
                    </div>))
                }
                </div>
                
                <div class="mb-2">
                  <label class="form-label" htmlFor="Actors">
                    Actores: <ErrorMessage name="Actors" component={() => (<small style={{color:"red"}}>{errors.Actors}</small>)}/>
                  </label>
                  <Field class="form-control" type="text" id="Actors" name="Actors" placeholder="Actores..."/>
                </div>

                <div className="row">
                    <div class="col mb-2">
                        <label class="form-label" htmlFor="Release">
                        Fecha de Estreno: <ErrorMessage name="Release" component={() => (<small style={{color:"red"}}>{errors.Release}</small>)}/>
                        </label>
                        <Field class="form-control" type="date" id="Release" name="Release" onBlur/>
                    </div>

                    <div class="col mb-2">
                        <label class="form-label" >
                        Clasificación: <ErrorMessage name="Rated" component={() => (<small style={{color:"red"}}>{errors.Rated}</small>)}/>
                        </label>
                        <Field class="form-select" name="Rated" as="select">
                        {
                      !values.Rated.length ?
                      <option key="select">Seleccionar</option> :
                      <option key="select" disabled >Seleccionar</option>
                    }
                    {clasificaciones?.map(e => <option key={e} value={e}>{e}</option>)}
                        </Field>
                    </div>

                    <div class="col mb-2">
                        <label class="form-label" htmlFor="Type">
                        Tipos de salas: <ErrorMessage name="Type" component={() => (<small style={{color:"red"}}>{errors.Type}</small>)}/>
                        </label>
                        <Field class="form-control" type="text" id="Type" name="Type" placeholder="Tipo de salas..."/>
                    </div>
                </div>

                <div className="row">
                    <div class="col mb-2">
                        <label class="form-label" htmlFor="Runtime">
                        Duración: <ErrorMessage name="Runtime" component={() => (<small style={{color:"red"}}>{errors.Runtime}</small>)}/>
                        </label>
                        <Field class="form-control form-control-sm" type="text" id="Runtime" name="Runtime" placeholder="Duración..."/>
                    </div>

                    <div class="col mb-2">
                            <label class="form-label" htmlFor="Poster">
                            Cargar Poster: 
                            <ErrorMessage name="file" component={() => (<small style={{color:"red"}}>{errors.Poster}</small>)}/>
                            </label>
                            <Field class="form-control form-control-sm" id="Poster" type="file" name="file" onChange={(e)=>uploadImage(e)}/>
                            {((values.Poster = image)) }
                            {
                              // !values.Poster? 
                            
                              // (<div className={styles.contImage}><img src='https://images.vectorhq.com/images/previews/046/film-reel-psd-445226.png' className={styles.image}/></div>):
                              <div className={styles.contImage}><img src={image} className={styles.image} width="120px"/></div>
                            }
                            
                    </div>
                        
                    <div class="col mb-2">
                        <label class="form-label" htmlFor="Trailer">
                        Trailer: <ErrorMessage name="Trailer" component={() => (<small style={{color:"red"}}>{errors.Trailer}</small>)}/>
                        </label>
                        <Field class="form-control form-control-sm" type="text" id="Trailer" name="Trailer" placeholder="Trailer..."/>
                    </div>
                </div>
                
                <div class="mb-2 d-flex justify-content-center">
                    <button type="submit" class="btn btn-warning mb-3">Crear Película</button>
                    {formSend && (<small style={{color:"green"}}>Pelicula agregada exitosamente</small>)}
                </div>

              </div>
            </Form>
          )}
        </Formik>)
    );
};
