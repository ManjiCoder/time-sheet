import { useAppSelector } from '@/redux/hooks';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { useEffect, useRef } from 'react';

export default function Timer() {
  const tasks = useAppSelector((state) => state.task);
  const { isActive, taskId } = useAppSelector((state) => state.activeTask);
  const currentTask = tasks.find((task) => task.id === taskId);
  const timerRef = useRef<HTMLDivElement>(null);

  const showTimer = (date = new Date()) => {
    if (currentTask && timerRef.current) {
      const hr = differenceInHours(date, currentTask.startTime) % 24;
      const min = differenceInMinutes(date, currentTask.startTime) % 60;
      const sec = differenceInSeconds(date, currentTask.startTime) % 60;
      const [hrElemt, minElemt, secElemt] = Array.from(
        timerRef.current.children
      );
      secElemt.classList.remove('animate-pulse');
      if (hr > 0) {
        hrElemt.textContent = hr.toString().padStart(2, '0');
      }
      minElemt.textContent = min.toString().padStart(2, '0') + ':';
      secElemt.textContent = sec.toString().padStart(2, '0');
    }
  };
  useEffect(() => {
    const intervalId = setInterval(showTimer, 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTask]);

  return (
    <div className='text-2xl font-semibold'>
      {isActive && (
        <div ref={timerRef}>
          <span></span>
          <span></span>
          <span className='animate-pulse'>Loading...</span>
        </div>
      )}
    </div>
  );
}
