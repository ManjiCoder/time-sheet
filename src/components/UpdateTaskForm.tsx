import { task } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

function UpdateTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(task),
  });
  const onSubmit = (data) => console.log(data);
  console.log({ errors });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='date' placeholder='startTime' {...register} />
      <input
        type='date'
        placeholder='endTime'
        {...register('endTime', { required: true })}
      />
      <select {...register('category')}>
        <option value='CSS Dev'>CSS Dev</option>
      </select>
      <input type='time' placeholder='duration' {...register} />
      <input type='checkbox' placeholder='isActive' {...register} />

      <input type='submit' />
    </form>
  );
}

export default UpdateTaskForm;
