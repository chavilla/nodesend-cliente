import React, {useState, useContext} from 'react';
import appContext from "../context/app/appContext";

const Formulario = () => {

    const { agregarPassword, agregarDescargas }=useContext(appContext);

    const [tienePass,setTienePass]=useState(false);

    const [descargas, setDescargas]=useState('');

    const establecerDescargas=descargas=>{
        setDescargas(descargas);
        agregarDescargas(descargas);
    }

    return ( 
        <div className='w-full mt-20'>
            <div>
            <label className='text-lg text-gray-800'>Eliminar tras:</label>
            <select className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
            onChange={e=>establecerDescargas(parseInt(e.target.value))}
            value={descargas}
            >
                <option value=''>--Seleccionar--</option>
                <option value='1'>1 descarga</option>
                <option value='5'>5 descargas</option>
                <option value='10'>10 descargas</option>
                <option value='20'>20 descargas</option>
            </select>
            </div>
            <div className='mt-5'>
                <div className='flex justify-between'>
                    <label className='text-lg text-gray-800 mr-2'>Proteger con contraseña</label>
                    <input type='checkbox' onChange={()=>setTienePass(!tienePass)} />
                </div>
                { tienePass ? (
                    <input type='password' className='h-10 w-full mt-2 bg-white border border-gray-400 text-black px-3 px-5 pr-8 rounded leading-none focus:outline-none focus:border-gray-500' onChange={e=>agregarPassword(e.target.value)}/>
                ) : null }
            </div>
        </div>
     );
}
 
export default Formulario;