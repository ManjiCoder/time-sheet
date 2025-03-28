import ClientWrapper from '@/components/ClientWrapper';
import Timer from '@/components/Timer';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  resetActiveTask,
  setActiveTask,
} from '@/redux/features/task/activeTaskReducer';
import { addTask, Task, updateTask } from '@/redux/features/task/taskReducer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { calculateDuration } from '@/utils/jsonToCsv';
import {
  CircleHelpIcon,
  CurlyBraces,
  LucideCode,
  LucideCodeXml,
  LucideMusic,
  LucidePhoneCall,
  LucideSmartphone,
  LucideYoutube,
} from 'lucide-react';
import { useState } from 'react';

export const categories = [
  { id: 1, name: 'CSS Dev', icon: <LucideCode /> },
  { id: 2, name: 'Geeks For Geeks', icon: <CurlyBraces /> },
  { id: 3, name: 'Youtube', icon: <LucideYoutube /> },
  { id: 4, name: 'Music', icon: <LucideMusic /> },
  { id: 5, name: 'Calling', icon: <LucidePhoneCall /> },
  { id: 6, name: 'Phone', icon: <LucideSmartphone /> },
  { id: 7, name: 'Coding', icon: <LucideCodeXml /> },
  { id: 8, name: 'Unknown', icon: <CircleHelpIcon /> },
];

export default function Home() {
  const tasks = useAppSelector((state) => state.task);
  const { isActive, categoryId, taskId } = useAppSelector(
    (state) => state.activeTask
  );
  const [category, setCategory] = useState<null | string>(categoryId);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    // Default
    const payload: Task = {
      id: tasks.length > 1 ? tasks[tasks.length - 1].id + 1 : tasks.length + 1,
      isActive: true,
      startTime: new Date().toISOString(),
      endTime: null,
      category: category ?? 'Misc',
      duration: null,
    };
    if (isActive && taskId) {
      const currentTask = tasks[tasks.findIndex((task) => task.id === taskId)];
      const newPayload: Task = {
        id: currentTask.id,
        isActive: false,
        startTime: currentTask.startTime,
        endTime: new Date().toISOString(),
        category: currentTask.category,
        duration: null,
      };
      newPayload.duration = calculateDuration(
        currentTask.startTime,
        newPayload.endTime!
      );
      dispatch(resetActiveTask());
      dispatch(updateTask({ key: taskId, value: newPayload }));
      // const p = sendRequest({
      //   endPoint: `/id/${newPayload.id}`,
      //   method: 'PATCH',
      //   data: newPayload,
      // });
      // toast.promise(p, promiseOption);
    } else {
      dispatch(addTask(payload));
      dispatch(
        setActiveTask({
          taskId: payload.id,
          isActive: true,
          categoryId: category,
        })
      );
      // const p = sendRequest({
      //   endPoint: '/',
      //   method: 'POST',
      //   data: { ...payload, id: 'INCREMENT' },
      // });
      // toast.promise(p, promiseOption);
    }

    // console.table(payload);
  };

  return (
    <ClientWrapper>
      <main className='wrapper flex flex-col min-h-96 justify-center items-center gap-5'>
        <Timer />
        <section className='flex justify-center items-center gap-5'>
          <Drawer>
            <DrawerTrigger>
              <Button
                variant='outline'
                className='w-40 py-6 font-bold text-lg  border'
              >
                {category || 'Category'}
              </Button>
            </DrawerTrigger>
            <DrawerContent className='h-[80vh]'>
              <div className='h-[80vh] overflow-y-auto w-full grid place-items-center pb-8'>
                <DrawerHeader className='grid gap-11 grid-cols-2 lg:grid-cols-3'>
                  <DrawerTitle hidden>Select category</DrawerTitle>
                  <DrawerDescription hidden>
                    This action cannot be undone.
                  </DrawerDescription>
                  {categories.map(({ id, name, icon }) => (
                    <div
                      className='flex flex-col gap-2 font-bold text-lg items-center text-center'
                      key={id}
                    >
                      <DrawerClose
                        className='grid place-items-center text-white shadow-md bg-primary h-16 w-16 rounded-full'
                        key={name}
                        onClick={() => setCategory(name)}
                      >
                        {icon}
                      </DrawerClose>
                      {name}
                    </div>
                  ))}
                </DrawerHeader>
                {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
            <Button variant='outline'>Cancel</Button>
            </DrawerClose>
            </DrawerFooter> */}
              </div>
            </DrawerContent>
          </Drawer>

          <Button
            onClick={handleClick}
            variant='default'
            className='w-40 font-bold text-lg py-6'
          >
            {!isActive ? 'Start' : 'Stop'}
          </Button>
        </section>
      </main>
    </ClientWrapper>
  );
}
