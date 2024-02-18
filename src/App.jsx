import React, { useEffect, useState } from 'react'

const App = () => {


    const [tarea, setTarea] = useState({
        nombre: '',
        id: '',
        completado: false
    });

    const [tareas, setTareas] = useState([]);


    useEffect(() => {

        const posiblesTareas = JSON.parse(localStorage.getItem('tareas'));

        if (posiblesTareas) {
            return;
        } else {
            localStorage.setItem('tareas', JSON.stringify(tareas));
        }




    }, []);

    useEffect(() => {

        const datos = JSON.parse(localStorage.getItem('tareas'));

        setTareas(datos);

    }, []);



    const handleChange = e => {
        setTarea({
            ...tarea,
            nombre: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (tarea.nombre.trim() === '') {
            alert('Ingresa un nombre')
            return;
        }


        const tareas = JSON.parse(localStorage.getItem('tareas'));

        tarea.id = Date.now();

        tareas.push(tarea);

        setTareas(tareas);

        localStorage.setItem('tareas', JSON.stringify(tareas));

        setTarea({
            nombre: '',
            id: '',
            completado: false
        });

    }

    const eliminarTarea = (e, id) => {
        e.stopPropagation();

        const tareas = JSON.parse(localStorage.getItem('tareas'));

        const tareasActualizadas = tareas.filter(element => element.id !== id);

        localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));

        setTareas(tareasActualizadas);
    }

    const completar = id => {
        const tareas = JSON.parse(localStorage.getItem('tareas'));

        const tareasActualizadas = tareas.map(element => {
            if (element.id === id) {
                if (element.completado) {
                    element.completado = false;
                } else {
                    element.completado = true;
                }
            }

            return element;
        });


        localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));



        setTareas(tareasActualizadas);


    }



    return (

        <div className="flex justify-center items-center w-full">
            <div className="w-1/2">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-center text-3xl font-bold mb-4">Lista de Tareas</h1>
                    {/* Contenedor de formulario para agregar tarea */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-bold mb-4">Agregar Nueva Tarea</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="task" className="block text-gray-700">Tarea:</label>
                                <input value={tarea.nombre} onChange={handleChange} type="text" id="task" name="task" className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Agregar Tarea</button>
                            </div>
                        </form>
                    </div>
                    {/* Lista de tareas */}
                    {
                        tareas.length ? (
                            <div className="bg-gray-200 rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Tareas</h2>
                                <ul>
                                    {
                                        tareas.map(element => (
                                            <li onClick={() => completar(element.id)} key={element.id} className={`${element.completado && 'bg-green-600'} flex justify-between items-center p-4 mb-4 rounded-lg shadow-md bg-white hover:bg-gray-300 transition-transform hover:scale-x-105 cursor-pointer`}>
                                                <span className="flex-1">{element.nombre}</span>
                                                <div className='flex gap-2'>
                                                    <button onClick={(e) => eliminarTarea(e, element.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                    {/* Agrega más elementos li para cada tarea */}
                                </ul>
                            </div>
                        ) : <h2 className='text-center'>Aún no hay tareas</h2>
                    }
                </div>
            </div>
        </div>


    )
}

export default App