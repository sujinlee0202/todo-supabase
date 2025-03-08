"use client";

import Todo from "./Todo";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function TodoUI() {
  return (
    <>
      <Input label='search TODO' icon={<i className='fas fa-search' />}></Input>
      <Todo id={1} value={"New TODO"} completed={false} />
      <Button>
        <i className='fas fa-plus mr-2' />
        ADD TODO
      </Button>
    </>
  );
}
