import { IconButton } from "@material-tailwind/react";
import Checkbox from "./ui/Checkbox";
import { useState } from "react";

export default function Todo({ id, value, completed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed1, setCompleted1] = useState(false);
  const [title, setTitle] = useState("NEW Todo");

  return (
    <div className='w-full flex items-center gap-1'>
      <Checkbox
        checked={completed1}
        onChange={(e) => setCompleted1(e.target.checked)}
      />

      {isEditing ? (
        <input
          className='flex-1 border-b-black border-b pb-1'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed1 && "line-through"}`}>{title}</p>
      )}

      {isEditing ? (
        <>
          <IconButton
            children={<i className='fas fa-check' />}
            onClick={() => setIsEditing(false)}
          />
        </>
      ) : (
        <IconButton
          children={<i className='fas fa-pen' />}
          onClick={() => setIsEditing(true)}
        />
      )}
      <IconButton children={<i className='fas fa-trash' />} />
    </div>
  );
}
