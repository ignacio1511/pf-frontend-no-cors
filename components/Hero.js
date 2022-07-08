import { data } from 'jquery';
import React, {useState} from 'react'
import S3 from 'react-aws-s3';
import Head from 'next/head'

export default function Hero() {

  
  const [selectedFile, setSelectedFile] = useState('');


  const config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET,
    s3Url: "https://foodmodelbucket.s3.amazonaws.com",
  }

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }


  const uploadFile = async (file) => {
    const ReactS3Client = new S3(config);
    ReactS3Client
    .uploadFile(file, file.name)
    .then(data => fetch('https://pf-cognitive-backend.herokuapp.com/api/food-create/', {
      method : 'POST',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({image_url:data.location,nombre:"a",informacion_nutricional:"b"}),
  }). then(() => {
      console.log("Nueva imagen añadida")
      console.log({image_url:data.location})})
  )
    .catch(err => console.error(err))
  }

  // fetch('http://127.0.0.1:8000/api/food-list/')
  //   .then(function (response){
  //     return response.json()
  //   })
  //   .then(function(data){console.log('The data',data)})
  // // const json = res.json()
  // console.log(res)

  // const handleSubmit = (e) => {
  //   e.preventDefault();e.preventDefault();
  //   const file = {file};



  return (
    <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.ico"/>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://kit.fontawesome.com/448126ce4f.js" crossOrigin="anonymous"></script>
            <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/united/bootstrap.min.css" />
        </Head>
    <div className="container-fluid mt-10">
      <h1 className='text-center text-3xl'>¿Que comerás hoy?</h1>
      <p className='text-center text-s mt-3'>Toma una foto de tu comida y súbela para ver su información nutricional.</p>


      <div className="h-29 grid grid-cols-1 gap-3 content-center">
          <input className="mt-4" type="file" onChange={handleFileInput}/>
          <br></br>
          <button className="mx-10 -mt-6 mb-4 btn btn-primary bg-orange-700" onClick={() => uploadFile(selectedFile)}> Subir foto</button>
      </div>

      <div className='mt-7 grid grid-cols-1'>
        <h1 className='text-black text-center'>1. Sube una foto</h1>
      </div>

    <div>
    <br></br>
      <section className='bg-orange-500 w-full pb-36 pt-40'>
        
      <img src ={`https://foodmodelbucket.s3.amazonaws.com/${selectedFile.name}`}/>
      {/* <h1>{`https://foodmodelbucket.s3.amazonaws.com/${selectedFile.name}`} </h1> */}
      </section>
    </div>
    </div>

  </>
  )
}

// {foods.map((food)=>(
//   <p>food.nombre</p>
// ))} 