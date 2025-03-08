import TodoUI from "@/components/TodoUI";

export default function Home() {
  return (
    <main className='flex flex-col items-center w-2/3 mx-auto'>
      <h1 className='text-3xl font-bold text-center py-6'>TODO LIST</h1>
      <TodoUI />
    </main>
  );
}
