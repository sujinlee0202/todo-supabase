"use client";

import { useState } from "react";
import Todo from "./Todo";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "@/actions/todoAction";

export default function TodoUI() {
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos({ searchInput }),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["todos"],
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),
    onSuccess: () => refetch(),
  });

  return (
    <div className='max-w-2xl mx-auto p-6 bg-gray-50'>
      <div className='mb-6'>
        <Input
          value={searchInput}
          placeholder='Search TODO'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          label='Search TODO'
          icon={<i className='fas fa-search' />}
        />
      </div>

      {isLoading && <p className='text-center'>Loading...</p>}
      {data && data.map((todo) => <Todo key={todo.id} todo={todo} />)}

      <div className='mt-6 flex justify-end'>
        <Button onClick={() => mutate()} loading={isPending}>
          <i className='fas fa-plus mr-2' />
          ADD TODO
        </Button>
      </div>
    </div>
  );
}
