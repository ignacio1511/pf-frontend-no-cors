import Hero from "../components/Hero"
import React, {useState} from 'react'
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'


const Home = ({foods})=> {
    const router = useRouter();
    const reload = () =>{router.reload()}

    const [nombree, setnombree] = useState('Todavia no ha ingresado su foto');
    const [inf_nut, setinf_nut] = useState('');
    return (
      <>
        <Navbar></Navbar>
        <div className="container -mx-50">
            <div className="container">
                <Hero />
                <div className="container-fluid mt-0">
                    <div className="h-20 grid grid-cols-1 gap-3 content-center">
                        <button className="mx-10 mt-10 mb-2 btn btn-primary bg-orange-700" onClick={() =>{setnombree(foods[0].nombre);setinf_nut(foods[0].informacion_nutricional)}}> Obtener Información Nutricional</button>
                    </div>
                    <br></br>
                    <h1 className='text-black text-center'>2. Obten su Información Nutricional</h1>
                    <br></br>
                    <section className='bg-orange-200 w-full pb-40 pt-40'>
                        {console.log(foods)}
                        <h1>{nombree} {inf_nut}</h1>
                    </section>
                    {/* <p>{foods[1].nombre}</p> */}
                    {/* {foods.map((foods) => (
                        <p>{foods.nombre}{foods.informacion_nutricional}</p>
                    ))} */}
                </div>
                
            </div>
        </div>
        </>
    );
}
export async function getStaticProps() {
    const res = await fetch("https://pf-cognitive-backend.herokuapp.com/api/food-list/");
    const foods = await res.json();
    
    return {
      props: {
        foods
      },
    };
  }

export default Home;