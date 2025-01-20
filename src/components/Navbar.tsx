import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { appName } from '@/types/constants';

export default function Navbar() {
  return (
    <header className='grid grid-cols-2 items-center px-4 py-2'>
      {/* Logo */}
      <h1 className='h1'>{appName}</h1>

      {/* User Ac */}

      {/* <div className='relative justify-self-end'> */}
      <Popover>
        <PopoverTrigger>
          <Avatar className='justify-self-end'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>logout</PopoverContent>
      </Popover>
      {/* </div> */}
    </header>
  );
}
