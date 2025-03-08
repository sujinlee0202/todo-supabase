import { IconButton } from "@material-tailwind/react";
import Checkbox from "./ui/Checkbox";
import { useState } from "react";
import Button from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "@/actions/todoAction";
import { queryClient } from "@/config/ReactQueryProvider";

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
    <div className='w-full flex items-center gap-1'>
      <Checkbox
        checked={completed}
        onChange={async (e) => {
          await setCompleted(e.target.checked);
          await updateMutate();
        }}
      />

      {isEditing ? (
        <input
          className='flex-1 border-b-black border-b pb-1'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
      )}

      {isEditing ? (
        <>
          <Button
            className='w-10 h-10 flex items-center justify-center'
            children={<i className='fas fa-check' />}
            onClick={async () => {
              await setIsEditing(false);
              await updateMutate();
            }}
            loading={updatePending}
          />
        </>
      ) : (
        <Button
          className='w-10 h-10 flex items-center justify-center'
          children={<i className='fas fa-pen' />}
          onClick={() => setIsEditing(true)}
          loading={updatePending}
        />
      )}
      <Button
        className='w-10 h-10 flex items-center justify-center'
        children={<i className='fas fa-trash' />}
        onClick={() => deleteMutate()}
        loading={deletePending}
      />
    </div>
  );
}
