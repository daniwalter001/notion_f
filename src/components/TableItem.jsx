import React, { useState } from "react";
import {} from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { requestHasFailed, toAvatar } from "../helper/functions";
import { MdDragIndicator } from "react-icons/md";

import moment from "moment";
import toast from "react-hot-toast";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../repository/api";

const TableItem = React.forwardRef(
  ({ removeItem, itemData, ...props }, ref) => {
    const [data, setData] = useState(itemData);

    let handleRemoveItem = async (id) => {
      if (typeof removeItem == "function") {
        await removeItem(id);
      }
    };

    const [updateTask, { isLoading: isUpdatingTask }] = useUpdateTaskMutation();
    const [removeTask, { isLoading: isRemovingTask }] = useDeleteTaskMutation();

    let handleUpdateTask = async (data_) => {
      if (isUpdatingTask) return false;

      let res = await updateTask({ token: data_?.token, data: data_ });
      if (!requestHasFailed(res)) {
        // toast.success(res.data?.message);
        setData(data_);
      } else {
        toast.error(res.data?.message ?? "Erreur lors de l'ajout");
      }
    };

    //
    let handleRemoveTask = async (token) => {
      if (isRemovingTask) return false;
      let res = await removeTask(token);
      if (!requestHasFailed(res)) {
        toast.success(res.data?.message);
      } else {
        toast.error(res.data?.message ?? "Erreur lors de la suppression");
      }
    };

    return (
      <tr
        className={`border-b ${data?.done ? "bg-gray-200" : ""} transition-all`}
        ref={ref}
        {...props}
      >
        <td className="px-0 py-0 ">
          <div className="flex items-center w-fit">
            <MdDragIndicator size={20} className="mx-2 cursor-pointer" />
            <input
              id="selectRow"
              type="checkbox"
              checked={itemData?.done}
              onChange={(e) => {
                handleUpdateTask({
                  ...data,
                  done: e.target.checked,
                });
              }}
              className="w-4 h-4 text-blue-600 flex bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
            />
          </div>
        </td>
        <th className="font-medium text-gray-900 whitespace-nowrap cursor-pointer hover:bg-gray-50 ">
          <input
            placeholder="Task name"
            className="bg-transparent px-2 py-0 outline-none border-0 w-full cursor-pointer "
            value={data?.task_name ?? "Write project proposal"}
            onChange={(e) => {
              // setData({
              //   ...data,
              //   task_name: e.target.value,
              // });

              handleUpdateTask({
                ...data,
                task_name: e.target.value,
              });
            }}
          />
        </th>

        <td className="px-2 py-0 cursor-pointer hover:bg-gray-50 w-fit">
          <div className="flex items-center">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              <span className="text-black font-bold">
                {toAvatar(data?.assignee)}
              </span>
            </div>
            {/* <span className="ml-2 bg-transparent px-2 py-0 outline-none border-0 w-fit cursor-pointer ">
              {data?.assignee ?? "Alan Coles"}
            </span> */}
            <input
              placeholder="Assignee"
              className="bg-transparent px-2 py-0 outline-none border-0 w-full cursor-pointer "
              value={data?.assignee ?? "Write project proposal"}
              onChange={(e) => {
                // setData({
                //   ...data,
                //   assignee: e.target.value,
                // });
                handleUpdateTask({
                  ...data,
                  assignee: e.target.value,
                });
              }}
            />
          </div>
        </td>
        <td className="px-2 py-0 cursor-pointer hover:bg-gray-50 w-fit">
          <input
            type="date"
            value={data?.due.substring(0, 10).replace(/\//g, "-")}
            onChange={(e) => {
              // setData({
              //   ...data,
              //   due: e.target.value.replace(/-/g, "/"),
              // });
              handleUpdateTask({
                ...data,
                due: e.target.value.replace(/-/g, "/"),
              });
            }}
            className="text-gray-900 block w-full py-2.5 bg-transparent outline-none "
            placeholder="Select a due date"
          />
          {data?.due && (
            <span className="block w-full font-semibold  ">
              {moment(data?.due).format("LL")}
            </span>
          )}
        </td>
        <td className="px-2 py-0">
          <div className="flex flex-row items-center justify-center ">
            <span
              className="cursor-pointer hover:bg-gray-50 inline-block p-4"
              onClick={() => {
                handleRemoveTask(itemData?.token);
              }}
            >
              <FiTrash size={15} />
            </span>
            <span className="cursor-pointer hover:bg-gray-50 inline-block p-4">
              <FiEdit size={15} />
            </span>
          </div>
        </td>
      </tr>
    );
  }
);

export default TableItem;
