import { Task } from '@/redux/features/task/taskReducer';
import { appName } from '@/types/constants';

export const jsonToCsv = (
  arr: Task[],
  orderBy: {
    id: string;
    isActive: string;
    category: string;
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
    csvData += `${csvDesc}\n`;
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
