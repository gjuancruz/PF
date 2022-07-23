import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { postShow,autorizado, getBillboard } from "../../Redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";




export default function CreateShow(){
    const dispatch = useDispatch()
    const autorizacion = useSelector( state => state.autorizado);
    const movies=useSelector(state=>state.cartelera)
    const [formSend, setFormSend] = useState(false);
    
    function handleMovieChange(e,values){
      const {value} = e.target
      values.movieId=value
    }
    function handleRoomChange(e,values){
      const {value} = e.target
      values.roomId=value
    }
    useEffect(() => {
        dispatch(getBillboard())
        dispatch(autorizado());
      },[])

    return (
        <>
          {
            (autorizacion === true) ? 
            <Formik
            initialValues={{
              schedule: "",
              movieId: "",
              roomId: "",
            }}
            validate={(val) => {
              let errors = {};
              if (!val.schedule) {
                errors.schedule = "Por favor ingresa un horario inicial *";
              } 
  
              if (!val.movieId) {
                errors.movieId = "Por favor seleccione una pelicula *";
              }
  
              if (!val.roomId) {
                errors.roomId = "Por favor seleccione una sala *";
              }  
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              dispatch(postShow(values));
            //   console.log(values);
              setFormSend(true);
              resetForm();
              setTimeout(() => setFormSend(false), 5000);
            }}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="container my-5">
              {/* {console.log(values)} */}
              <div class="form-group">
                <div class="mb-3">
                  <label class="form-label" htmlFor="schedule">
                    Horario inicial: 
                    <ErrorMessage
                      name="schedule"
                      component={() => (
                        <small style={{ color: "red" }}>
                          {errors.schedule}
                        </small>
                      )}
                    />
                  </label>
                  <Field
                    class="form-control"
                    type="text"
                    id="schedule"
                    name="schedule"
                    placeholder="Horario Inicial..."
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="movieId">
                    Pelicula: 
                    <ErrorMessage
                      name="movieId"
                      component={() => (
                        <small style={{ color: "red" }}>
                          {errors.movieId}
                        </small>
                      )}
                    />
                  </label>
                  <Field
                    class="form-control"
                    as="select"
                    id="movieId"
                    name="movieId"
                    onChange={(e)=>{handleMovieChange(e,values)}}
                  >
                    {!values.movieId.length?(
                      <option key="seleccionar">Seleccionar pelicula</option>
                    ):(<option key="seleccionar" disabled>
                      Seleccionar pelicula
                    </option>)
                    }
                    {console.log(movies)}
                    {movies?.map(e=>(
                      <option key={e.id} value={e.id}>{e.Title}</option>
                    ))
                    }
                    </Field>
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="roomId">
                    Sala: 
                    <ErrorMessage
                      name="roomId"
                      component={() => (
                        <small style={{ color: "red" }}>
                          {errors.roomId}
                        </small>
                      )}
                    />
                  </label>
                  <Field
                    class="form-control"
                    as="select"
                    id="roomId"
                    name="roomId"
                    onChange={(e)=>{handleRoomChange(e,values)}}
                  >{!values.roomId.length?(
                    <option key="seleccionar2">Seleccionar Sala</option>
                  ):(
                    <option key="seleccionar2" disabled>Seleccionar Sala</option>
                  )
                  }<option key="1" value="1">Sala 1</option>
                  <option key="2" value="2">Sala 2</option>
                  <option key="3" value="3">Sala 3</option>
                  <option key="4" value="4">Sala 4</option>
                  <option key="5" value="5">Sala 5</option>
                  </Field>
                </div>

                <div class="mb-3">
                  <button type="submit" class="btn btn-warning mb-3">
                    Crear funciones
                  </button>
                  {formSend && (
                    <small style={{ color: "green" }}>
                      Funciones generadas exitosamente
                    </small>
                  )}
                </div>
              </div>
            </Form>
            )}
          </Formik>
          : <h1>error no autorizado</h1>
          }
</>
    )
}