import { useEffect, useState } from "react"
import TodoLists from "./TodoLists"
import AddTodoForm from "./AddTodoForm"
import DeleteTodoModal from "./DeleteTodoModal"
import EditTodoForm from "./EditTodoForm"

const TodoWrapper = () => {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [refetchTodo, setRefetchTodo] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: "",
    description: "",
  })
  const url = "https://json-server-deployment-iota.vercel.app/tasks"
  // const url = "http://localhost:4000/tasks"

  // THIS CODE BLOCK IS THE FUNCTION FOR FETCHING THE TASKS FROM THE API
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url)
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [refetchTodo])

  // THIS CODE BLOCK IS THE FUNCTION WHEN THE EDIT BUTTON OF THE TODO ITEM WAS CLICKED
  const clickEdit = (id) => {
    const todo = tasks.find((task) => task.id === id)
    setEditModalIsOpen(true)
    setCurrentTask(todo)
    console.log(todo)
  }

  // THIS CODE BLOCK IS THE FUNCTION WHEN THE DELETE BUTTON OF THE TODO ITEM WAS CLICKED
  const clickDelete = (id) => {
    const todo = tasks.find((task) => task.id === id)
    setDeleteModalIsOpen(true)
    setCurrentTask(todo)
    console.log(todo)
  }

  return (
    <div className="todo-wrapper">
      {/* RENDER THE EDIT TODO FORM COMPONENT IN TODO WRAPPER */}
      <EditTodoForm
        openEditModal={editModalIsOpen}
        setOpenEditModal={setEditModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        currentTask={currentTask}
        refetchTrigger={setRefetchTodo}
        {...currentTask}
      />
      {/* RENDER THE DELETE TODO MODAL COMPONENT IN TODO WRAPPER */}
      <DeleteTodoModal
        openDeleteModal={deleteModalIsOpen}
        setOpenDeleteModal={setDeleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        currentTask={currentTask}
        refetchTrigger={setRefetchTodo}
      />

      <div className="flex items-center justify-center w-screen h-screen gap-6">
        {/* RENDER THE ADD TODO FORM COMPONENT IN TODO WRAPPER */}
        <AddTodoForm refetchTrigger={setRefetchTodo} />

        {/* THIS IS THE CONTAINER FOR THE TODO LISTS */}
        <div className="relative w-[400px] h-[400px] border rounded-xl  md:w-[600px] bg-[#fff] shadow">
          <div className="sticky top-0 flex items-center justify-between p-4">
            <div className="font-medium">Today's Todo</div>
          </div>
          <div className="p-4 pt-0 mb-3">
            {tasks && (
              <TodoLists
                taskList={tasks}
                clickDelete={clickDelete}
                clickEdit={clickEdit}
              />
            )}
          </div>

          {/* THIS CODE BLOCK IS FOR THE ERROR MESSAGE */}
          {error && (
            <div className="text-sm font-medium text-center text-red-500">
              Error: {error}
            </div>
          )}
          {/* THIS CODE BLOCK IS FOR LOADING MESSAGE */}
          {isLoading && (
            <div className="text-sm font-medium text-center text-sky-500">
              Please wait a while, fetching all the tasks.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoWrapper
