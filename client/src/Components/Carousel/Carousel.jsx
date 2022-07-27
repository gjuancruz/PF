import React from 'react';
import './Carousel.css'
import thor from '../../Assets/Thor.jpg'
import turuleca from '../../Assets/turuleca.jpg'


const Carousel = () =>{

   return(
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide "></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      {/* <img src="https://static.cinemarkhoyts.com.ar/Images/Highlights/472.png" class="d-block w-100" alt="..."/> */}
      <img src={thor} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={turuleca} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://static.cinemarkhoyts.com.ar/Images/Highlights/467.png" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://static.cinemarkhoyts.com.ar/Images/Highlights/431.png" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden"></span>
  </button>
</div>
)

}
export default Carousel