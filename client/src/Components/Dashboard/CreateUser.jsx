import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, getUsers } from "../../Redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function CreateUser() {
  const [formSend, setFormSend] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className="modal fade"
      id="staticBackdropp"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark ">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              AGREGAR NUEVO USUARIO
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                username: "",
                password: "",
                email: "",
                role: ""
              }}
              validate={(val) => {
                let errors = {};
                if (!val.username) {
                  errors.username = "Por favor ingresa un usuario *";
                }

                if (!val.password) {
                  errors.password = "Por favor ingresa la contraseña *";
                }

                if (!val.email) {
                  errors.email = "Por favor ingresa un email *";
                }

                if (val.role.length < 1) {
                  errors.role
                   = "Por favor ingresa el rol *";
                }

                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
                dispatch(createUser(values));
                console.log(values);
                setFormSend(true);
                resetForm();
                setTimeout(() => setFormSend(false), 5000);
              }}
            >
              {({ errors, values, setFieldValue }) => (
                <Form className="container my-5">
                  {/* {console.log(values)} */}
                  <div className="form-group">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Usuario: 
                        <ErrorMessage
                          name="username"
                          component={() => (
                            <small style={{ color: "red" }}>
                              {errors.username}
                            </small>
                          )}
                        />
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Usuario..."
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        Contraseña: 
                        <ErrorMessage
                          name="password"
                          component={() => (
                            <small style={{ color: "red" }}>
                              {errors.password}
                            </small>
                          )}
                        />
                      </label>
                      <Field
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña..."
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email: 
                        <ErrorMessage
                          name="email"
                          component={() => (
                            <small style={{ color: "red" }}>
                              {errors.email}
                            </small>
                          )}
                        />
                      </label>
                      <Field
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email..."
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Rol:
                        <ErrorMessage
                          name="role"
                          component={() => (
                            <small style={{ color: "red" }}>{errors.role
                            }</small>
                          )}
                        />
                      </label>
                      <Field className="form-select" name="role" as="select">
                        <option key="seleccionar" disabled>
                          Seleccionar
                        </option>
                        <option key="admin">admin</option>
                        <option key="user">user</option>
                      </Field>
                    </div>

                    <div className="mb-3">
                      <button type="submit" className="btn btn-warning mb-3">
                        Crear usuario
                      </button>
                      {formSend && (
                        <small style={{ color: "green" }}>
                          Usuario agregado exitosamente
                        </small>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={()=>dispatch(getUsers())}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
