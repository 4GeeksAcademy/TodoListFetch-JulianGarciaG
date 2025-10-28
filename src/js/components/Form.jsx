import React, { useState, useEffect } from "react"

const Form = () => {

    let [task, setTask] = useState("")
    let [list, setList] = useState([])


     const createUser = () => {
        const API_URL = 'https://playground.4geeks.com/todo/'

        fetch(API_URL + "users/alexis", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())  //convierte la respuesta a un formato JSON
            .then((data) => console.log(data))  // toma los datos para mostrar en la consola
            .catch(error => { console.log('Hubo un problema al obtener las tareas: \n', error) }) //imprimir el error en la consola para depurar

    }

     const showTask = () => {
        const API_URL = 'https://playground.4geeks.com/todo/'

        fetch(API_URL + "users/alexis")

            .then((response) => {

                if (response.status === 404) {
                    createUser()
                }


                // console.log(response)
                return response.json()
            }) 

            .then((data) => setList(data.todos))  // toma los datos para mostrar en la consola
            .catch(error => { console.log('Hubo un problema al obtener las tareas: \n', error) }) //imprimir el error en la consola para depurar

    }


    const createTask = () => {
         
        const API_URL = 'https://playground.4geeks.com/todo/'
            fetch(API_URL + "users/alexis") {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    label: text,
                    is_done: false
                })
            })
              //verificar si la respuesta fue exitosa (codigo 200 - 299)
            if (!response.ok){
                throw new Error (`Error ${response.status}: No se pudo crear la tarea.`);
            }

            const data= await response.json()
            console.log("tarea creada con exito:", data);
            await traerLista()


     useEffect(() => {
        // crearUsuario()
        showTask()
    }, [])


    const writeTask = (event) => {
        setTask(event.target.value)

    }

    const add = (event) => {

        if (event.key === "Enter") {
            setList([...list, task])
            setTask("")
        }

    }

    const removeTask = (position) =>{
        setList (list.filter((item, index)=> index!== position))
    }

    return (
        <div className="container">
            <h1 className="header">todos</h1>
            <div className="paper">



                <input type="text" placeholder="What needs to be done?" className="form-control" onChange={writeTask} value={task} onKeyDown={add} />
                <ul className="list-unstyled">
                    {list.map((item)=>(<li key={item.id}>{item.label}<span className="delete" onClick={()=>removeTask(item.id)}> X</span></li>))}
                </ul>
                <div className="ms-0 container-fluid">
                    <p> {list.length} items left</p>
                </div>





            </div >




        </div >
    )



}






export default Form;