import React from "react"

const DeleteTodoModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  onClose,
  currentTask,
  refetchTrigger,
}) => {
  if (!openDeleteModal) return null

  const handleDeleteTaskBtn = async (id) => {
    try {
      // const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      const response = await fetch(
        `https://json-server-deployment-iota.vercel.app/tasks/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to delete task with ID: ${id}`)
      }
      console.log("Task deleted successfully", id)
      refetchTrigger((prev) => !prev)
      setOpenDeleteModal(false)
    } catch (error) {
      console.log("Error:", error.message)
    }
  }

  return (
    <div className="relative">
      <div
        className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen gap-6 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="w-[400px] h-[400px] bg-[#fff] border rounded-xl shadow"
          onClick={(e) => e.stopPropagation()} // PREVENT OVERLAY CLOSE WHEN CLICKING INSIDE THE MODAL
        >
          <div className="px-6 py-2.5 pt-4">
            <div>
              <h2 className="text-base font-medium">Delete Todo</h2>
              <p className="mb-6 text-sm font-light text-[#71717A]">
                This can't be undone
              </p>
            </div>
            <form>
              <div>
                <label className="block mb-6 text-sm font-normal">
                  Title
                  <input
                    type="text"
                    name="title-input"
                    value={currentTask.title}
                    disabled
                    className="w-full h-[50px] px-6 font-normal text-sm bg-transparent border rounded-md mt-1 bg-gray-50 text-neutral-400"
                  />
                </label>
              </div>
              <div>
                <label className="block mb-6 text-sm font-normal">
                  Description
                  <textarea
                    type="text"
                    name="description-input"
                    value={currentTask.description}
                    disabled
                    className="w-full h-[100px] px-6 font-normal text-sm bg-transparent border rounded-md resize-none pt-4 mt-1 bg-gray-50 text-neutral-400"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="text-xs text-center text-[#000] font-normal rounded-md px-3 py-2 hover:bg-[#000] hover:bg-opacity-5"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="text-xs text-center text-[#fff] font-normal rounded-md shadow px-3 py-2 bg-[#000] hover:bg-opacity-85"
                  onClick={(e) => {
                    e.preventDefault()
                    handleDeleteTaskBtn(currentTask.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteTodoModal
