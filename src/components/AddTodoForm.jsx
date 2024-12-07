import React, { useState } from "react"

const AddTodoForm = ({ refetchTrigger }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  // THIS CODE BLOCK IS THE FUNCTION FOR THE CLEAR BUTTON IN ADD TODO FORM
  const handleClearBtn = (e) => {
    e.preventDefault()
    setTitle("")
    setDescription("")
    console.log("clear")
  }

  // THIS CODE BLOCK IS THE FUNCTION FOR THE ADD BUTTON IN THE ADD TODO FORM
  const handleAddTaskBtn = (e) => {
    e.preventDefault()
    const todo = { title, description }
    const url = "http://localhost:4000/tasks"

    // FUNCTION TO SEND POST REQUEST USING ASYNC/AWAIT
    // TRADITIONAL FUNCTION DECLARATION (NAMED FUNCTION)
    //   async function postNewTask(url, todo) {
    //     try {
    //       // SEND THE POST REQUEST
    //       const response = await fetch(url, {
    //         method: "POST", // REQUEST METHOD USED
    //         headers: { "Content-Type": "application/json" }, // CONTENT TYPE TO JSON
    //         body: JSON.stringify(todo), // CONVERT THE DATA OBJECT TO A JSON STRING
    //       })
    //       console.log("New task successfully added on the list!")
    //       setIsSaving(false)
    //     } catch (error) {
    //       setError(error.message)
    //       console.log(setError)
    //     } finally {
    //       setTitle("")
    //       setDescription("")
    //       refetchTrigger((prev) => !prev)
    //       // console.log("final log testing!")
    //     }
    //   }
    //   postNewTask(url, todo)
    // }
    // ANONYMOUS FUNCTION EXPRESSION (ARROW FUNCTION | NO NAMED FUNCTION | IMMEDIATE ASSIGNMENT)
    const postNewTask = async () => {
      try {
        // SEND THE POST REQUEST
        const response = await fetch(url, {
          method: "POST", // REQUEST METHOD USED
          headers: { "Content-Type": "application/json" }, // CONTENT TYPE TO JSON
          body: JSON.stringify(todo), // CONVERT THE DATA OBJECT TO A JSON STRING
        })
        const data = await response.json()
        console.log("New task successfully added on the list!", data)
        // console.log("New task successfully added on the list!")
        setIsSaving(false)
      } catch (error) {
        setError(error.message)
        console.log(setError)
      } finally {
        setTitle("")
        setDescription("")
        refetchTrigger((prev) => !prev)
        // console.log("final log testing!")
      }
    }
    postNewTask(url, todo)
  }

  return (
    <div className="w-[300px] h-[400px] border rounded-xl shadow bg-[#fff]">
      <div className="top-0 flex items-center justify-center p-4 ">
        <p className="mb-2 font-medium text-center">
          What's your task for today?
        </p>
      </div>
      <div className="p-4 pt-0">
        <form className="space-y-4" onSubmit={handleAddTaskBtn}>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Title
              <input
                type="text"
                name="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title here"
                required
                className="w-full h-[50px] px-6 font-normal text-sm bg-transparent border rounded-lg"
              />
            </label>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
              <textarea
                type="text"
                name="description-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description here"
                className="w-full h-[100px] px-6 font-normal text-sm bg-transparent border rounded-lg resize-none pt-4"
              />
            </label>
          </div>
          <div>
            <button className="w-full text-sm text-center text-[#fff] font-normal rounded-md shadow px-3 py-2 bg-[#000] hover:bg-opacity-85">
              Add Task
            </button>
            <button
              onClick={handleClearBtn}
              className="w-full h-6 mt-3 font-normal text-center text-[#000] hover:text-opacity-85"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTodoForm
