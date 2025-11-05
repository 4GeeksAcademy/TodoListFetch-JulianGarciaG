import React, { useState, useEffect } from "react"

const Form = () => {

    let [task, setTask] = useState("")
    let [list, setList] = useState([])
    const API_URL = 'https://playground.4geeks.com/todo/'

    const createUser = () => {

        fetch(API_URL + "users/Julian", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then((data) => console.log(data))
            .catch(error => { console.log('Hubo un problema al crear el usuario: \n', error) })

    }

    const showTask = () => {


        fetch(API_URL + "users/Julian")
            .then((response) => {

                if (response.status === 404) {
                    createUser()
                }


                console.log(response)
                return response.json()
            })

            .then((data => {
                console.log(data)
                console.log(data.todos);
                setList(data.todos)

            }))
            .catch(error => { console.log('Hubo un problema al obtener las tareas: \n', error) })

    }


    const createTask = async (text) => {
        try {

            const response = await fetch(API_URL + "todos/Julian", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: text,
                    is_done: false
                })
            })
            //verificar si la respuesta fue exitosa (codigo 200 - 299)
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo crear la tarea.`);
            }
            const data = await response.json()
            console.log("tarea creada con exito:", data);
            showTask()


        } catch (error) {
            console.error('hubo un problema al crear la tarea:', error)
        }

    }


    const inputText = (event) => {
        if (event.key === "Enter") {
            createTask(task)
            setTask("")
        }
    }



    useEffect(() => {
        showTask()
    }, [])

    const deleteTask = async (id) => {
        try {
            const response = await fetch(API_URL + "todos/" + id, {
                method: "DELETE",
            });

            if (response.ok) {

                showTask();


            }
            console.log(response.status);
            
            

        } catch (error) {
            console.error("Error de red:", error);
        }
    };


    return (
        <div className="container">
            <h1 className="header">todos</h1>
            <div className="paper">



                <input type="text" placeholder="What needs to be done?" className="form-control" onChange={(e) => setTask(e.target.value)} value={task} onKeyDown={inputText} />
                <ul className="list-unstyled">
                    {list.map((item) => (<li key={item.id}>{item.label}<span className="delete" role="button" onClick={() => deleteTask(item.id)}> X</span></li>))}
                </ul>
                <div className="ms-0 container-fluid">
                    <p> {list.length} items left</p>
                </div>





            </div >




        </div >
    )



}






export default Form;