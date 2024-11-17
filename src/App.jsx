import ProjectsSidebar from "./components/ProjectSidebar.jsx"
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx'
import { useState } from "react"
import SelectedProject from "./components/SelectedProject.jsx"
function App() {
  //undefined-- neither add projet / nor selected
  //null --   click add project new project

  const [projectsState, setProjectsState] = useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  })

  function handleAddTask(text){
    setProjectsState((prevState)=>{
        const taskId = Math.random();
        const newTask = {
          text:text,
          projecId: prevState.selectedProjectId, // to know task belongs to which projet
          id:taskId
        }
    

      return{
        ...prevState,
        tasks:[newTask , ...prevState.tasks]
      }
     })
  }
  function handleDeleteTask(id){
             setProjectsState((prevState)=> {
              return{
                ...prevState,
                tasks:prevState.tasks.filter((task )=>task.id!==id)
              }
             
  })
}

 function handleCancelAddProject(){
  setProjectsState(prevState =>{
    return {
      ...prevState,//make sure to not loose oldState
      selectedProjectId: undefined
    }
  })
 }

 function handleSelectProject(id){
  setProjectsState(prevState =>{
    return {
      ...prevState,
      selectedProjectId: id
    }
  })
 }

  function handleStartAddProject(){
  
    
    setProjectsState(prevState =>{
      return {
        ...prevState,//make sure to not loose oldState
        selectedProjectId:null
      }
    })
  }

  function handleAddProject( projectData){
     setProjectsState(prevState=>{
      const newProject = {
          ...projectData, 
          id:  Math.random() 
      }

      return{
        ...prevState,
        selectedProjectId:undefined ,// achive create new project state
        projects: [...prevState.projects, newProject]
      }
     })
  }

  function handleDeleteProject(){
  
    setProjectsState(prevState =>{
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId

        )
      }
    })
  }


const selectedProject = projectsState.projects.find( project => project.id === projectsState.selectedProjectId)
 

 let content = <SelectedProject project={selectedProject} 
 onDelete = {handleDeleteProject}
 onAddTask = { handleAddTask}
 onDeleteTask = {handleDeleteTask}
 tasks={projectsState.tasks}
 />

 if(projectsState.selectedProjectId === null){
 
  
  content =  < NewProject   onAdd={handleAddProject} onCancel = {handleCancelAddProject}/>
 }else if (projectsState.selectedProjectId === undefined){
  content = <NoProjectSelected  onStartAddProject={handleStartAddProject}/>

 }


  return (
    <main className= "h-screen my-8 flex gap-8">
  <ProjectsSidebar   
  onStartAddProject = {handleStartAddProject} 
  projects={projectsState.projects}
  onSelectProject = {handleSelectProject}
  selectedProjectId={projectsState.selectedProjectId}
  />
      {content}
  {/* <NoProjectSelected onStartAddProject = {handleStartAddProject}/> */}
    </main>
  );
}

export default App;
