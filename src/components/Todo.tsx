import { useState } from "react";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "@/actions/todoAction";
import { queryClient } from "@/config/ReactQueryProvider";
import { formatDate } from "@/utils/formatDate";

export default function Todo({ todo }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return (
    <div className='bg-white shadow rounded p-4 flex items-center space-x-4 mb-4'>
      <Checkbox
        checked={completed}
        onChange={async (e) => {
          await setCompleted(e.target.checked);
          await updateMutate();
        }}
      />

      <div className='flex-1'>
        {isEditing ? (
          <input
            className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <p
            className={`text-lg ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {title}
          </p>
        )}
        <div className='text-xs text-gray-400 mt-1'>
          <span>Created: {formatDate(todo.created_at)}</span>
          {todo.completed_at && (
            <span className='ml-2'>
              Completed: {formatDate(todo.completed_at)}
            </span>
          )}
        </div>
      </div>

      <div className='flex space-x-2'>
        {isEditing ? (
          <Button
            className='w-10 h-10 flex items-center justify-center'
            onClick={async () => {
              await setIsEditing(false);
              await updateMutate();
            }}
            loading={updatePending}
          >
            <i className='fas fa-check' />
          </Button>
        ) : (
          <Button
            className='w-10 h-10 flex items-center justify-center'
            onClick={() => setIsEditing(true)}
            loading={updatePending}
          >
            <i className='fas fa-pen' />
          </Button>
        )}
        <Button
          className='w-10 h-10 flex items-center justify-center'
          onClick={() => deleteMutate()}
          loading={deletePending}
        >
          <i className='fas fa-trash' />
        </Button>
      </div>
    </div>
  );
}
