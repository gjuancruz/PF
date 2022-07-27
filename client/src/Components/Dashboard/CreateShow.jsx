import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postShow,
  autorizado,
  getBillboard,
  getAllShows,
} from "../../Redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function CreateShow() {
  const dispatch = useDispatch();
  const autorizacion = useSelector((state) => state.autorizado);
  const movies = useSelector((state) => state.cartelera);
  const [formSend, setFormSend] = useState(false);

  function handleMovieChange(e, values) {
    const { value } = e.target;
    values.movieId = value;
  }
  function handleRoomChange(e, values) {
    const { value } = e.target;
    values.roomId = value;
  }
  function handleDayChange(e, values) {
    const { value } = e.target;
    values.day = value;
  }
  function handleTypeChange(e, values) {
    const { value } = e.target;
    values.type = value;
  }
  useEffect(() => {
    dispatch(getBillboard());
    dispatch(autorizado());
  }, []);

  return (
    <>
      {autorizacion === true ? (
        <div
          class="modal fade"
          id="form"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content bg-dark text-white">
              <div class="modal-header">
                <h5 class="modal-title " id="staticBackdropLabel">
                  Crear Funciones
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body border-3">
                <Formik
                  initialValues={{
                    schedule: "",
                    movieId: "",
                    roomId: "",
                    day: "",
                    type: "",
                  }}
                  validate={(val) => {
                    let errors = {};
                    if (!val.schedule) {
                      errors.schedule =
                        "Por favor ingresa un horario inicial *";
                    }

                    if (!val.movieId) {
                      errors.movieId = "Por favor seleccione una pelicula *";
                    }

                    if (!val.roomId) {
                      errors.roomId = "Por favor seleccione una sala *";
                    }
                    if (!val.day) {
                      errors.day = "Por favor seleccione un dia *";
                    }
                    if (!val.type) {
                      errors.type = "Por favor seleccione un tipo *";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { resetForm }) => {
                    dispatch(postShow(values));
                    //   console.log(values);
                    setFormSend(true);
                    resetForm();
                    dispatch(getAllShows())
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
                          <label class="form-label" htmlFor="day">
                            Dia:
                            <ErrorMessage
                              name="day"
                              component={() => (
                                <small style={{ color: "red" }}>
                                  {errors.day}
                                </small>
                              )}
                            />
                          </label>
                          <Field
                            class="form-control"
                            as="select"
                            id="day"
                            name="day"
                            onChange={(e) => {
                              handleDayChange(e, values);
                            }}
                          >
                            {!values.day.length ? (
                              <option key="seleccionar2">
                                Seleccionar Dia
                              </option>
                            ) : (
                              <option key="seleccionar2" disabled>
                                Seleccionar Dia
                              </option>
                            )}
                            <option key="1" value="Lunes">
                              Lunes
                            </option>
                            <option key="2" value="Martes">
                              Martes
                            </option>
                            <option key="3" value="Miércoles">
                              Miércoles
                            </option>
                            <option key="4" value="Jueves">
                              Jueves
                            </option>
                            <option key="5" value="Viernes">
                              Viernes
                            </option>
                            <option key="6" value="Sabado">
                              Sabado
                            </option>
                            <option key="7" value="Domingo">
                              Domingo
                            </option>
                          </Field>
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
                            onChange={(e) => {
                              handleMovieChange(e, values);
                            }}
                          >
                            {!values.movieId.length ? (
                              <option key="seleccionar">
                                Seleccionar pelicula
                              </option>
                            ) : (
                              <option key="seleccionar" disabled>
                                Seleccionar pelicula
                              </option>
                            )}
                            {/* {console.log(movies)} */}
                            {movies?.map((e) => (
                              <option key={e.id} value={e.id}>
                                {e.Title}
                              </option>
                            ))}
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
                            onChange={(e) => {
                              handleRoomChange(e, values);
                            }}
                          >
                            {!values.roomId.length ? (
                              <option key="seleccionar2">
                                Seleccionar Sala
                              </option>
                            ) : (
                              <option key="seleccionar2" disabled>
                                Seleccionar Sala
                              </option>
                            )}
                            <option key="1" value="1">
                              Sala 1
                            </option>
                            <option key="2" value="2">
                              Sala 2
                            </option>
                            <option key="3" value="3">
                              Sala 3
                            </option>
                            <option key="4" value="4">
                              Sala 4
                            </option>
                            <option key="5" value="5">
                              Sala 5
                            </option>
                          </Field>
                        </div>

                        <div class="mb-3">
                          <label class="form-label" htmlFor="type">
                            Tipo:
                            <ErrorMessage
                              name="type"
                              component={() => (
                                <small style={{ color: "red" }}>
                                  {errors.type}
                                </small>
                              )}
                            />
                          </label>
                          <Field
                            class="form-control"
                            as="select"
                            id="type"
                            name="type"
                            onChange={(e) => {
                              handleTypeChange(e, values);
                            }}
                          >
                            {!values.type.length ? (
                              <option key="seleccionar2">
                                Seleccionar Tipo
                              </option>
                            ) : (
                              <option key="seleccionar2" disabled>
                                Seleccionar Tipo
                              </option>
                            )}
                            <option key="1" value="2D">
                              2D
                            </option>
                            <option key="2" value="3D">
                              3D
                            </option>
                          </Field>
                        </div>

                        <div class="mb-3">
                          <button type="submit" class="btn btn-warning mb-3">
                            Agregar nueva funcion
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
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  // onClick={dispatch(getAllShows())}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>error no autorizado</h1>
      )}
    </>
  );
}
