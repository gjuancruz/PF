import React from "react";
import '../Comment/Comment.css'


const Comment= () =>{
return(
    <div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Ingrese su Nombre</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>
<div class="mb-4">
            <label for="exampleFormControlTextarea1" class="form-label">Escribe un comentario</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<button className="comentar">Comentar</button>
<div className="writecomment">

<div class="card p-3">

<div class="d-flex justify-content-between align-items-center"/>

<div class="user d-flex flex-row align-items-center"/>


<span><small class="font-weight-bold text-primary">Juan Galaz: </small> <small class="font-weight-bold">Me gusto la pelicula!</small></span>

</div>

</div>
<div class="card p-3">

<div class="d-flex justify-content-between align-items-center"/>

<div class="user d-flex flex-row align-items-center"/>


<span><small class="font-weight-bold text-primary">Axel Castillo </small> <small class="font-weight-bold">spoiler: Excelente PF! felicitaciones </small></span>

</div>

<div class="card p-3">

<div class="d-flex justify-content-between align-items-center"/>

<div class="user d-flex flex-row align-items-center"/>


<span><small class="font-weight-bold text-primary">Lautaro Ocampo</small> <small class="font-weight-bold">Muy buena</small></span>

</div>


    </div>

    
)
}

export default Comment