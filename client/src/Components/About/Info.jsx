import  '../About/Info.css'
import AboutCard from "./AboutCard";
import  Buga  from '../About/AssetsAbout/Buga.jpeg'
import  juan  from '../About/AssetsAbout/juan.jpg'
import  Elias  from '../About/AssetsAbout/Elias.jpg'
import  Ezequiel  from '../About/AssetsAbout/Ezequiel.png'
import Axel from '../About/AssetsAbout/axel.png'



export default function Info(){
    return(
        <div className="infoConteiner">
            <AboutCard
            name={"Gonzalo Bugarin"}
            img={Buga}
            git={"https://github.com/bugaringonzalo"}
            lin={"https://www.linkedin.com/in/gonzalobugarin24/"}
            />
            <AboutCard
            name={"Juan Cruz Galaz"}
            img={juan}
            git={"https://github.com/gjuancruz"}
            lin={"https://www.linkedin.com/in/juan-cruz-galaz-43aa0a23a/"}
            />
            <AboutCard
            name={"Eduardo Daniel Gonzalez"}
            img={""}
            git={"https://github.com/EduDan343"}
            lin={"https://www.linkedin.com/in/eduardo-daniel-gh/"}
            />
            <AboutCard
            name={"Ignacio Brunello"}
            img={""}
            git={"https://github.com/IBrunello"}
            lin={"https://www.linkedin.com/in/ignacio-brunello-184749209/"}
            />
            <AboutCard
            name={"Jose Ezequiel Peralta"}
            img={Ezequiel}
            git={"https://github.com/ezejoper"}
            lin={"https://www.linkedin.com/in/ezequiel-peralta-07ba9721a/"}
            />
            <AboutCard
            name={"Elias Emanuel Andrada"}
            img={Elias}
            git={"https://github.com/EEA94"}
            lin={"https://www.linkedin.com/in/el%C3%ADas-emanuel-andrada/"}
            />
            <AboutCard
            name={"Lautaro Ezequiel Ocampo"}
            img={""}
            git={"https://github.com/LautiOcampo"}
            lin={""}
            />
            <AboutCard
            name={"Luis David Patiño"}
            img={""}
            git={"https://github.com/LuisDavid6"}
            lin={"https://www.linkedin.com/in/luis-david-pati%C3%B1o-09500a215/"}

            />
            <AboutCard
            mencion={"Mencion Especial para:"}
            name={"Axel Castillo"}
            img={Axel}
            ></AboutCard>
            
        </div>
    )
}