import { useEffect, useState } from "react";
import {} from "react-icons/fa";
import { FiLoader, FiPlus } from "react-icons/fi";
import { GoTasklist, GoCheckbox, GoPlus } from "react-icons/go";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TableItem from "../components/TableItem";

import {
  useAddMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useGetTaskQuery,
} from "../repository/api";
import { requestHasFailed } from "../helper/functions";
import toast from "react-hot-toast";

const Notion = () => {
  const [items, setItems] = useState([]);
  const { isLoading, data: tasksFetched } = useGetAllTasksQuery();

  const [addTask, { isLoading: isAddingTask }] = useAddMutation();

  let handleAddTask = async (data) => {
    if (isAddingTask) return false;

    let res = await addTask(data);
    if (!requestHasFailed(res)) {
      toast.success(res.data?.message);
    } else {
      toast.error(res.data?.message ?? "Erreur lors de l'ajout");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!requestHasFailed(tasksFetched)) {
        setItems(tasksFetched?.data);
      }
    }
  }, [tasksFetched, isLoading]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  let onDragEnd = (result) => {
    //
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  const removeItem = async (id) => {
    try {
      const tmp = items.filter((el) => el?.token !== id);
      setItems(tmp);
      return true;
    } catch (error) {
      console.error({ error });
    }
    return false;
  };

  return (
    <div className="p-24 border-2 flex flex-col h-full flex-auto overflow-auto transition-all">
      <div className="text-xl mb-5 flex flex-row items-center ">
        <GoCheckbox size={25} />
        <span className="inline-block font-semibold ml-2">Tasks</span>
      </div>
      <div className="text-sm font-medium text-center border-b ">
        <ul className="flex flex-wrap -mb-px items-end">
          {/*  all tasks and board */}
          <li className="me-2">
            <div className=" cursor-pointer px-1 pb-2 border-b-2 border-transparent text-black hover:font-bold hover:border-black flex flex-row items-center">
              <GoTasklist size={20} />
              <span className="ml-2">All Tasks</span>
            </div>
          </li>
          <li className="me-2">
            <div className=" cursor-pointer px-1 pb-2 border-b-2 border-transparent text-black hover:font-bold hover:border-black flex flex-row items-center">
              <GoTasklist size={20} />
              <span className="ml-2">Boards</span>
            </div>
          </li>
          {/*  new button */}
          <div className="flex items-center flex-auto justify-end">
            <li
              className="me-2 border-2 cursor-pointer px-2 py-1 text-white font-semibold bg-blue-500 hover:bg-blue-600 flex-row items-center border-none inline-flex mb-1 rounded-sm  "
              onClick={() => {
                // setItems([
                //   ...items,
                //   {
                //     done: false,
                //     task_name: "",
                //     assignee: "",
                //     order: items.length
                //       ? items[items.length - 1]?.order
                //         ? parseInt(items[items.length - 1]?.order) + 1
                //         : items.length + 1
                //       : 1,
                //     due: new Date().toISOString(),
                //     token: btoa(Date.now().toString()),
                //   },
                // ]);

                handleAddTask({
                  task_name: "",
                  assignee: "",
                  due: new Date().toISOString(),
                  token: btoa(Date.now().toString()),
                });
              }}
            >
              <GoPlus size={20} />
              <span className="ml-1">New</span>
            </li>
          </div>
        </ul>
      </div>

      <div className="relative border-[1px] mt-5 text-[10px] ">
        <table className="w-full text-xs text-left rtl:text-right  text-black ">
          <thead className="text-xs text-gray-700 uppercase table-fixed">
            <tr>
              <th className="px-2 py-2 cursor-pointer hover:bg-gray-50">
                <FiLoader size={20} />
              </th>
              <th className="px-2 py-2 cursor-pointer hover:bg-gray-50">
                Task name
              </th>
              <th className="px-2 py-2 cursor-pointer hover:bg-gray-50">
                Assignee
              </th>
              <th className="px-2 py-2 cursor-pointer hover:bg-gray-50">Due</th>
              <th className="px-2 py-2 cursor-pointer hover:bg-gray-50">
                <FiPlus size={20} />
              </th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items_table">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {items.map((item, index) => (
                    <Draggable
                      key={item.order}
                      draggableId={item.order.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <TableItem
                          ref={provided.innerRef}
                          itemData={item}
                          removeItem={removeItem}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  );
};

export default Notion;
