import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';

export async function getServerSideProps({params}){

    const { enlace }=params;
    const respuesta=await clienteAxios.get(`api/links/${enlace}`);
    return{
        props:{
            enlace: respuesta.data
        }
    }
}

export async function getServerSidePaths(){
    const enlaces=await clienteAxios.get('/api/links');

    return{
        paths:enlaces.data.links.map(link=>({
            params: { enlace:link.url }
        })),
        fallback:false
    }
}

export default ({enlace})=>{

    console.log(enlace);
    return(
        <Layout>
            <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo</h1>
            <div className='flex items-center justify-center mt-10'>
                <a target='_blank' href={`${process.env.backendURL}/api/files/${enlace.file}`} className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'>Aquí</a>
            </div>
        </Layout>
    )
}