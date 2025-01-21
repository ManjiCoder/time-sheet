import { appName } from '@/types/constants';
import { ModeToggle } from './ToggleThemeBtn';

export default function Navbar() {
  return (
    <header className='grid grid-cols-2 items-center px-4 py-2'>
      {/* Logo */}
      <h1 className='h1'>{appName}</h1>

      {/* User Ac */}

      <div className='relative justify-self-end'>
        {/* <Popover>
          <PopoverTrigger className='justify-self-end'>open</PopoverTrigger>
          <PopoverContent className='right-4 relative w-32'>logout</PopoverContent>
        </Popover> */}
        <ModeToggle />
      </div>
    </header>
  );
}
