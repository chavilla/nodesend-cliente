import React, { useState, useContext } from "react";
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";

export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const respuesta = await clienteAxios.get(`api/links/${enlace}`);
  return {
    props: {
      enlace: respuesta.data,
    },
  };
}

export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get("/api/links");

  return {
    paths: enlaces.data.links.map((link) => ({
      params: { enlace: link.url },
    })),
    fallback: false,
  };
}

export default ({ enlace }) => {

  const [tienePass, setTienePass] = useState(enlace.password);
  const [password, setPassword] = useState('');
  

  console.log(enlace);

  const verificarPassword=async e=>{
    e.preventDefault();

    try {
        const data={password}
        const respuesta=await clienteAxios.post(`/api/links/${enlace.link}`, data);
        setTienePass(respuesta.data.password);  
    } catch (error) {
        alert(error.response.data.msg);
    }
  }

  return (
    <Layout>
      {tienePass ? (
        <>
          <p className="mb-5 text-center">
            Este enlace está protegido con contraseña.
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={e=>verificarPassword(e)}
              >
                <div className="mb-5">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gary-700 leading-tight focus:outline-none focus:shadow-outline my-5"
                    placeholder="Nombre de usuario"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                  />
                  <input
                    type="submit"
                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                    value="Validar Password"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              target="_blank"
              href={`${process.env.backendURL}/api/files/${enlace.files}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
