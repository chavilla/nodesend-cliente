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
        <Layout><h1>Desde enlace.js</h1></Layout>
    )
}