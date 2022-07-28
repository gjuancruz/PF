import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, getUsers } from "../../Redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from'./CreateCandy.module.css'


export default function CreateCandy() {
  const [formSend, setFormSend] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div
      className="modal fade"
      id="staticBackdroppp"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark ">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              AGREGAR NUEVO PRODUCTO
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
                if (!val.name) {
                  errors.name = "Por favor ingresa un nombre *";
                }

                if (!val.quantity) {
                  errors.quantity = "Por favor ingresa la cantidad *";
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
<<<<<<< HEAD
                  <div class="form-group">
                    <div class="mb-3">
                      <label class="form-label" htmlFor="name">
                        Nombre: 
=======
                  <div className="form-group">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Usuario: 
>>>>>>> a95b2408651889def146a92b85ecaac002bbe4ac
                        <ErrorMessage
                          name="name"
                          component={() => (
                            <small style={{ color: "red" }}>
                              {errors.name}
                            </small>
                          )}
                        />
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        id="Nombre"
                        name="Nombre"
                        placeholder="Usuario..."
                      />
                    </div>

<<<<<<< HEAD
                    <div class="mb-3">
                      <label class="form-label" htmlFor="price">
                        Precio: 
=======
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        Contraseña: 
>>>>>>> a95b2408651889def146a92b85ecaac002bbe4ac
                        <ErrorMessage
                          name="price"
                          component={() => (
                            <small style={{ color: "red" }}>
                              {errors.price}
                            </small>
                          )}
                        />
                      </label>
                      <Field
<<<<<<< HEAD
                        class="form-control"
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Precio..."
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label" htmlFor="quantity">
                        Cantidad: 
=======
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
>>>>>>> a95b2408651889def146a92b85ecaac002bbe4ac
                        <ErrorMessage
                          name="quantity"
                          component={() => (
                            <small style={{ color: "red" }}>
                              {errors.quantity}
                            </small>
                          )}
                        />
                      </label>
                      <Field
<<<<<<< HEAD
                        class="form-control"
                        type="text"
                        id="quantity"
                        name="quantity"
                        placeholder="Cantidad..."
                      />
                    </div>

                    <div class="mb-3">
                    <label class="form-label" htmlFor="Picture">
                      Cargar Imagen:
                      <ErrorMessage
                        name="file"
                        component={() => (
                          <small style={{ color: "red" }}>{errors.Picture}</small>
                        )}
                      />
                    </label>
                    <Field
                      class="form-control form-control-sm"
                      id="Picture"
                      type="file"
                      name="file"
                      onChange={(e) => uploadImage(e)}
                    />
                    {/* {loading && (values.Poster = image)} */}
                    {(values.Picture = image)}
                        <div className={styles.contImage}><img src={image} className={styles.image} width="120px"/></div>
=======
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
>>>>>>> a95b2408651889def146a92b85ecaac002bbe4ac
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
