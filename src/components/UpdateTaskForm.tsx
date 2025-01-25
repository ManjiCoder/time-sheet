import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { task } from '@/lib/zodSchemas';
import { categories } from '@/pages';
import { Task, updateTask } from '@/redux/features/task/taskReducer';
import { useAppDispatch } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import ErrorComponent from './ErrorComponent';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
type UpdateFormProps = {
  closeModal: () => void;
  currentTask: Task;
};
function UpdateTaskForm({ closeModal, currentTask }: UpdateFormProps) {
  // console.table(currentTask);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(task),
    defaultValues: {
      startTime: format(currentTask.startTime, 'yyyy-MM-dd'),
      endTime: format(currentTask.endTime || new Date(), 'yyyy-MM-dd'),
      duration: currentTask.duration,
      category: 'CSS Battle',
      isActive: currentTask.isActive,
    },
  });
  const onSubmit = (data) => {
    // console.log(data);
    const payload = { ...currentTask, ...data };
    dispatch(updateTask({ key: currentTask.id, value: payload }));
    console.log({ payload });

    // closeModal();
  };
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-2 gap-5 py-4'
    >
      <div className='formField'>
        <Label htmlFor='startTime'>Start Time</Label>
        <Input
          id='startTime'
          type='date'
          placeholder='Start Time'
          {...register('startTime')}
          className={
            errors.startTime?.message && 'ring-offset-2 ring-2 ring-red-600'
          }
        />
        <ErrorComponent msg={errors.startTime?.message} />
      </div>
      <div className='formField'>
        <Label htmlFor='endTime'>End Time</Label>
        <Input
          id='endTime'
          type='date'
          placeholder='End Time'
          {...register('endTime')}
        />
        <ErrorComponent msg={errors.endTime?.message} />
      </div>
      <div className='formField'>
        <Label htmlFor='category'>Category</Label>
        <Select {...register('category')}>
          <SelectTrigger id='category' className=''>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                <span className='flex space-x-3 gap-3 pr-5'>
                  {category.icon}
                  {category.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='formField'>
        <Label htmlFor='duration'>Duration</Label>
        <Input
          type='time'
          id='duration'
          placeholder='Duration'
          {...register('duration')}
        />
        <ErrorComponent msg={errors.duration?.message} />
      </div>

      <div className='formField flex-row col-span-2'>
        <Checkbox id='isActive' {...register('isActive')} />
        <Label htmlFor='isActive' className='ml-3'>
          Mark as completed
        </Label>
        {/* {errors.isActive && alert('Check it')} */}
      </div>

      <Button type='submit' variant='default'>
        Submit
      </Button>
    </form>
  );
}

export default UpdateTaskForm;
