"use client";

import { useState } from "react";
import Todo from "./Todo";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "@/actions/todoAction";

export default function TodoUI() {
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
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
    <>
      <Input
        value={searchInput}
        placeholder='Search TODO'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
        label='search TODO'
        icon={<i className='fas fa-search' />}
      ></Input>

      {isLoading && <p>Loading...</p>}
      {data && data.map((todo) => <Todo key={todo.id} id={1} todo={todo} />)}

      <Button onClick={() => mutate()} loading={isPending}>
        <i className='fas fa-plus mr-2' />
        ADD TODO
      </Button>
    </>
  );
}
