import { Task } from '@/redux/features/task/taskReducer';
import { appName } from '@/types/constants';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

export const jsonToCsv = (
  arr: Task[],
  orderBy: {
    id: string;
    isActive: string;
    category: string;
    duration: string;
    startTime: string;
    endTime: string;
  }
) => {
  const csvTitle = Object.values(orderBy).toString();
  let csvData = csvTitle + '\n';
  arr.forEach((task) => {
    let csvDesc = '';
    Object.keys(orderBy).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      csvDesc += `${task[key]},`;
    });
    csvData += `${csvDesc.slice(0, -1)}\n`;
    csvDesc = '';
  });
  return csvData;
};

export const downloadCSV = (csvStr: string) => {
  const blob = new Blob([csvStr], { type: 'text/csv' });
  const url = URL.createObjectURL(blob); // created

  const a = document.createElement('a');
  a.href = url;
  a.download = `${appName}.csv`;
  document.body.appendChild(a); // added
  a.click();

  document.body.removeChild(a); // remove
  URL.revokeObjectURL(url); // remove
};

export const calculateDuration = (startTime: string, endTime: string) => {
  let duration = '';
  const days = Math.abs(differenceInDays(startTime, endTime));
  const hrs = Math.abs(differenceInHours(startTime, endTime));
  const mins = Math.abs(differenceInMinutes(startTime, endTime));
  if (days > 0) {
    duration += `${days.toString()}:${days > 1 ? ' days' : ' day'}`;
  }
  if (hrs > 0) {
    duration += `${hrs.toString()}:${hrs > 1 ? ' hrs' : ' hr'}`;
  }
  if (mins > 0) {
    duration += `${mins.toString()}${mins > 1 ? ' mins' : ' min'}`;
  }

  return duration || '0 min';
};
