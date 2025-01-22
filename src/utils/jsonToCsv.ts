import { Task } from '@/redux/features/task/taskReducer';

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
    for (const key in task) {
      csvDesc += `${task[key]},`;
    }
    csvData += `${csvDesc}\n`;
    csvDesc = '';
  });
  return csvData;
};

export const downloadCSV = (csvStr: string) => {
  const blob = new Blob([csvStr], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  document.body.appendChild(a);
  a.click();

  a.removeChild(a);
  URL.revokeObjectURL(url);
};
