import React, { useEffect, useState } from "react"

const EditTodoForm = ({
  openEditModal,
  setOpenEditModal,
  onClose,
  currentTask,
  refetchTrigger,
  id,
  title,
  description,
}) => {
  const [task, setTask] = useState({})
  const url = "https://todo-app-theta-umber-91.vercel.app/api/json-server/tasks"

  useEffect(() => {
    setTask({ id, title, description })
  }, [currentTask])

  const updateTask = async (e) => {
    const { id, title, description } = task

    e.preventDefault()

    try {
      await fetch(url + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description }),
      })

      setOpenEditModal(false)
      refetchTrigger((prev) => !prev)
    } catch (error) {
      console.log(error.message)
    }
  }

  if (!openEditModal) return null

  return (
    <div className="relative">
      <div
        className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-[#000] bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="w-[400px] h-[400px] bg-[#fff] border rounded-xl shadow"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="px-6 py-2.5 pt-4">
            <div>
              <h2 className="text-base font-medium">Edit Todo</h2>
              <p className="mb-6 text-sm font-light text-[#71717A]">
                Update the task title and description
              </p>
            </div>
            <form onSubmit={updateTask}>
              <div>
                <label className="block mb-6 text-sm font-normal">
                  Title
                  <input
                    type="text"
                    name="title-input"
                    value={task.title}
                    onChange={(e) =>
                      setTask({ ...task, title: e.target.value })
                    }
                    placeholder="Enter task title here"
                    required
                    className="w-full h-[50px] px-6 font-normal text-sm bg-transparent border rounded-md mt-1"
                  />
                </label>
              </div>
              <div>
                <label className="block mb-6 text-sm font-normal">
                  Description
                  <textarea
                    type="text"
                    name="description-input"
                    value={task.description}
                    onChange={(e) =>
                      setTask({ ...task, description: e.target.value })
                    }
                    placeholder="Enter task description here"
                    className="w-full h-[100px] px-6 font-normal text-sm bg-transparent border rounded-md resize-none pt-4 mt-1"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="text-xs text-center text-[#000000] font-normal rounded-md px-3 py-2 bg-[#fff] hover:bg-[#000] hover:bg-opacity-5"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button className="text-xs text-center text-[#fff] font-normal rounded-md shadow px-3 py-2 bg-[#000] hover:bg-opacity-85">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTodoForm
