import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { postShow,autorizado } from "../../Redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";




export default function CreateShow(){
    const dispatch = useDispatch()
    const autorizacion = useSelector( state => state.autorizado);
    const [formSend, setFormSend] = useState(false);
    
    useEffect(() => {
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
                    type="movieId"
                    id="movieId"
                    name="movieId"
                    placeholder="Pelicula..."
                  />
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
                    type="roomId"
                    id="roomId"
                    name="roomId"
                    placeholder="Sala..."
                  />
                </div>

                <div class="mb-3">
                  <button type="submit" class="btn btn-warning mb-3">
                    Crear usuario
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