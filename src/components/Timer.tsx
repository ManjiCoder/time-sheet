import { useAppSelector } from '@/redux/hooks';

export default function Timer() {
  const tasks = useAppSelector((state) => state.task);
  const { taskId } = useAppSelector((state) => state.activeTask);
  const currentTask = tasks.find((task) => task.id === taskId);
  console.log(currentTask);
  if (!currentTask) return null;
  return <div>Timer</div>;
}
