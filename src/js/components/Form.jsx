import React, { useState } from "react"

const Form = () => {

    let [task, setTask] = useState("")
    let [list, setList] = useState([])

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
            <h1>to-dos</h1>
            <div className="paper">



                <input type="text" placeholder="What needs to be done?" className="form-control" onChange={writeTask} value={task} onKeyDown={add} />
                <ul className="list-unstyled">
                    {list.map((item,index)=>(<li key={index}>{item}<span onClick={()=>removeTask(index)}> ✖️</span></li>))}
                    
                </ul>
                <div>
                    <p> items left</p>
                </div>





            </div >




        </div >
    )



}






export default Form;