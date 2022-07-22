import React from "react";

export default function Candy() {
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Boton popup
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                ¡Disfruta de tu funcion con estas promos!
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row align-items-start">
                <div class="col-12">
                  <h3>Combo familiar</h3>
                  <img
                    src="https://archivos-cms.cinecolombia.com/images/_aliases/poster_carousel/4/3/5/3/13534-15-esl-CO/PARA%20DOS.png"
                    width={"180px"}
                  />
                  <select name="select">
                    <option value="value1">Value 1</option>
                    <option value="value2">Value 2</option>
                    <option value="value3">Value 3</option>
                  </select>
                </div>
                {/* <div class="col">One of three columns</div>
                <div class="col">One of three columns</div> */}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
