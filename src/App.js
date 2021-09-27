import { isEmpty,result,size, sortBy} from 'lodash'
import React,{useState,useEffect} from 'react'
//import shortid from 'shortid'
import {addDocument,deleteDocument,getCollection, updateDocument,}from './actions'


function App() {
const [task, setTask] = useState("")
const [tasks, setTasks] = useState([])
const [editMode, setEditMode] = useState(false)
//id en memoria para editar
const [id, setId] = useState("")
const [error, setError] = useState(null)

useEffect(() => {
  (async()=>{
    const result= await getCollection("tasks")
    if(result.statusResponse){
      setTasks(result.data)
    }
  })()
  }, [])

const validForm=()=>{
  let isValid=true
  setError(null)
  if(isEmpty(task)){
    setError("Debes ingresar una tarea")
    isValid=false
  }
  return isValid
}

const addTask=async(e)=>{
  e.preventDefault()
  if(!validForm()){
  return
  }
const result= await addDocument("tasks",{name:task})
if(!result.statusResponse){
  setError(result.error)
  return
}

/*const newTask={
  id:shortid.generate(),
  name:task
}*/
//metodo
setTasks([...tasks,{id:result.data.id,name:task}])
setTask("")
}

//Delete task

const deleteTask= async(id)=>{

  const result = await deleteDocument("tasks",id)
  if(!result.statusResponse){
    setError=result.error
    return
  }
  //filtrame las tareas donde el id de la tarea sea diferente al id.parametro
  const filterTasks=tasks.filter(task=>task.id !== id)
  setTasks(filterTasks)
}

//Edit Task
const editTask=(theTask)=>{
  //theTask viene del parmetro task en .map en <li></li>
  //theTask.name se obtiene de: tasks.map((task)=>({task.name... de <li></li>
  setTask(theTask.name)//lo que se pone en el input al editar
  setEditMode(true)
  setId(theTask.id)//guardo el id en memoria
}
//saveTask
const saveTask=async(e)=>{
  e.preventDefault()
  if(!validForm()){
    return
    }
 
const result= await updateDocument("tasks",id,{name:task})
if(!result.statusResponse)
{
  setError=result.error
  return
}
//metodo
//si item.id que estoy editando es el mismo al que tengo
//contruye un nuevo item con el mismo id y el nuevo nombre
//sino retorne el item completo
const editedTasks=tasks.map(item=>item.id===id 
    ?{id,name:task}
    :item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
}

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {
           size(tasks) ===0 ? (<li className="list-group-item">No hay tareas progrmadas</li>)
           :(
          <ul className="list-group">
           { 
           tasks.map((task)=>( 
              <li className="list-group-item" key={task.id}>
                <span className="lead">{task.name}</span>
                <button 
                        className="btn-danger btn-sm float-right mx-2"
                        onClick={()=>deleteTask(task.id)}>
                        Eliminar</button>
                <button className="btn-warning btn-sm float-right"
                onClick={()=>editTask(task)}>
                        Editar</button>
              </li>
           )) 
             }
          </ul>
           )
           
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
              {editMode?"Agregar tarea":"Editar Tarea"}
          </h4>
          <form onSubmit={editMode? saveTask:addTask}>
            <input type="text" 
              className="form-control mb-2" 
              placeholder="ingresa la tarea"
              onChange={(text)=>setTask(text.target.value)} 
              value={task}
            />
            {
              error && <span className="text-danger">{error}</span>
            }
            <button 
            className={editMode?"btn btn-warning btn-block":"btn btn-dark btn-block"} 
            type="submit">
                {editMode? "Guardar":"Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
