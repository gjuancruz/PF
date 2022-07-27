import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, getUsers } from "../../Redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function CreateCandy() {
  const [formSend, setFormSend] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      class="modal fade"
      id="staticBackdroppp"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              AGREGAR NUEVO PRODUCTO
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
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
                  {console.log(values)}
                  <div class="form-group">
                    <div class="mb-3">
                      <label class="form-label" htmlFor="username">
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
                        class="form-control"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Usuario..."
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label" htmlFor="password">
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
                        class="form-control"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña..."
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label" htmlFor="email">
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
                        class="form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email..."
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">
                        Rol:
                        <ErrorMessage
                          name="role"
                          component={() => (
                            <small style={{ color: "red" }}>{errors.role
                            }</small>
                          )}
                        />
                      </label>
                      <Field class="form-select" name="role" as="select">
                        <option key="seleccionar" disabled>
                          Seleccionar
                        </option>
                        <option key="admin">admin</option>
                        <option key="user">user</option>
                      </Field>
                    </div>

                    <div class="mb-3">
                      <button type="submit" class="btn btn-warning mb-3">
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
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
