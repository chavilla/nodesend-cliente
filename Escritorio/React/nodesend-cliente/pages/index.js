import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import authContext from '../context/autenticacion/authContext';

const Home = () => {

  const { usuarioAutenticado }=useContext(authContext);

  useEffect(()=>{
    usuarioAutenticado();
  },[])

 

  return ( 
    <Layout>
        <h1>Index</h1>
    </Layout>
   );
}
 
export default Home;