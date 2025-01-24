import ClientWrapper from '@/components/ClientWrapper';
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
  LucideCode,
  LucideCodeXml,
  LucideMusic,
  LucidePhoneCall,
  LucideSmartphone,
  LucideYoutube,
} from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 1, name: 'CSS Dev', icon: <LucideCode /> },
  { id: 2, name: 'Geeks For Geeks', icon: <LucideCodeXml /> },
  { id: 3, name: 'Youtube', icon: <LucideYoutube /> },
  { id: 4, name: 'Music', icon: <LucideMusic /> },
  { id: 5, name: 'Calling', icon: <LucidePhoneCall /> },
  { id: 6, name: 'Phone', icon: <LucideSmartphone /> },
];

export default function Home() {
  const tasks = useAppSelector((state) => state.task);
  const { isActive, categoryId, taskId } = useAppSelector(
    (state) => state.activeTask
  );
  const [category, setCategory] = useState<null | string>(categoryId);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    const isTask = taskId;
    const currentTask = isTask
      ? tasks.findIndex((task) => task.id === taskId)
      : null;
    const payload: Task = {
      startTime: currentTask
        ? tasks[currentTask].startTime
        : new Date().toISOString(),
      category: category ?? 'Misc',
      isActive: currentTask ? tasks[currentTask].isActive : false,
      duration: '-',
      endTime: currentTask ? new Date().toISOString() : null,
      id: isTask && tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    };
    if (isActive && taskId && payload.endTime) {
      payload.duration = calculateDuration(payload.startTime, payload.endTime);
      dispatch(resetActiveTask());
      dispatch(updateTask({ key: taskId, value: payload }));
    } else {
      dispatch(addTask(payload));
      dispatch(
        setActiveTask({
          taskId: payload.id,
          isActive: true,
          categoryId: category,
        })
      );
    }

    // console.table(payload);
  };

  return (
    <ClientWrapper>
      <main className='wrapper flex min-h-96 justify-center items-center gap-5'>
        <Drawer>
          <DrawerTrigger>
            <Button
              variant='outline'
              className='w-40 py-6 font-bold text-lg  border'
            >
              {category || 'Category'}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='mx-auto h-[80vh] w-full max-w-sm'>
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
                      className='grid place-items-center shadow-md bg-slate-800 h-16 w-16 rounded-full'
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
      </main>
    </ClientWrapper>
  );
}
