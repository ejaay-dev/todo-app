import React, { useEffect, useState } from "react"

const TodoLists = ({ taskList, clickDelete, clickEdit }) => {
  return (
    <div className="overflow-y-auto h-80">
      <div className="space-y-1.5">
        {taskList.map((task) => (
          <div
            className="relative pt-3 pb-3 pl-5 pr-5 overflow-hidden border rounded-lg"
            key={task.id}
          >
            <div className="absolute w-1.5 top-0 bottom-0 left-0 bg-[#000]"></div>
            <div className="flex items-center gap-2">
              <div>
                <p className="font-medium text-sm text-[#1A2C32]">
                  {task.title}
                </p>
                <p className="font-light text-xs text-[#1A2C32]">
                  {task.description}
                </p>
              </div>
              <div className="ml-auto">
                <button
                  className="rounded-md shadow px-3 py-2 text-xs text-center text-[#fff] font-normal mr-1 bg-[#000] hover:bg-opacity-85 "
                  onClick={(e) => clickEdit(task.id)}
                >
                  Edit
                </button>
                <button
                  className="rounded-md shadow px-3 py-2 text-xs text-center text-[#fff] font-normal bg-[#000] hover:bg-opacity-85 "
                  onClick={(e) => clickDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoLists
