'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  Edit,
  LucideDatabaseBackup,
  MoreHorizontal,
  TrashIcon,
} from 'lucide-react';
import * as React from 'react';

import ClientWrapper from '@/components/ClientWrapper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UpdateTaskForm from '@/components/UpdateTaskForm';
import { deleteTask, Task } from '@/redux/features/task/taskReducer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { calculateDuration, jsonToCsv } from '@/utils/jsonToCsv';
import { format } from 'date-fns';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.getValue('isActive') ? 'Not Completed' : 'Compeleted'}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Task
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('category')}</div>,
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start-Time
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{format(row.getValue('startTime'), 'dd MMM yy, hh:mm a')}</div>
    ),
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End-Time
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.getValue('endTime')
          ? format(row.getValue('endTime'), 'dd MMM yy, hh:mm a')
          : '-'}
      </div>
    ),
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Duration
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('duration') ?? '-'}</div>,
  },

  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useAppDispatch();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = React.useState(false);
      const closeModal = () => setIsOpen(false);
      const openModal = () => setIsOpen(true);
      const removeTask = () => {
        dispatch(deleteTask({ key: row.original.id }));
        // dispatch(resetActiveTask()); // this will reset the current Task
      };

      return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger>
            <Button variant='ghost' className='h-8 w-8 p-0' onClick={openModal}>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='right-5 relative w-40 flex flex-col gap-y-3'>
            <div className='border-b'>Actions</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='flex space-x-2 w-full justify-start'
                >
                  <Edit /> Edit
                </Button>
              </DialogTrigger>
              <DialogContent className='flex flex-col gap-3'>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    <UpdateTaskForm
                      // handleSubmit={editTask}
                      currentTask={row.original}
                      closeModal={closeModal}
                    />
                  </DialogDescription>
                </DialogHeader>
                {/* <DialogFooter className='sm:justify-start gap-y-3'>
                  <DialogClose asChild>
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={editTask}
                    >
                      Confirm
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type='button' variant='ghost'>
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='flex space-x-2 w-full justify-start'
                >
                  <TrashIcon /> Remove
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='sm:justify-start gap-y-3'>
                  <DialogClose asChild>
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={removeTask}
                    >
                      Confirm
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type='button' variant='secondary'>
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PopoverContent>
        </Popover>
      );
      // return (
      //   <DropdownMenu>
      //     <DropdownMenuTrigger asChild>
      //       <Button variant='ghost' className='h-8 w-8 p-0'>
      //         <span className='sr-only'>Open menu</span>
      //         <MoreHorizontal />
      //       </Button>
      //     </DropdownMenuTrigger>
      //     <DropdownMenuContent align='end'>
      //       <DropdownMenuLabel>Actions</DropdownMenuLabel>
      //       {/* <DropdownMenuItem
      //         onClick={() => navigator.clipboard.writeText(payment.category)}
      //       >
      //         Copy payment ID
      //       </DropdownMenuItem> */}
      //       <DropdownMenuSeparator />
      //       <DropdownMenuItem asChild>
      //         <Dialog>
      //           <DialogTrigger asChild>
      //             <Button
      //               variant='outline'
      //               className='flex space-x-2 w-full justify-start'
      //             >
      //               <Edit /> Edit
      //             </Button>
      //           </DialogTrigger>
      //           <DialogContent>
      //             <DialogHeader>
      //               <DialogTitle>Are you absolutely sure?</DialogTitle>
      //               <DialogDescription>
      //                 This action cannot be undone. This will permanently update
      //                 your account and update your data from our servers.
      //               </DialogDescription>
      //             </DialogHeader>
      //             <DialogFooter className='sm:justify-start gap-y-3'>
      //               <DialogClose asChild>
      //                 <Button
      //                   type='button'
      //                   variant='secondary'
      //                   onClick={editTask}
      //                 >
      //                   Confirm
      //                 </Button>
      //               </DialogClose>
      //               <DialogClose asChild>
      //                 <Button type='button' variant='ghost'>
      //                   Cancel
      //                 </Button>
      //               </DialogClose>
      //             </DialogFooter>
      //           </DialogContent>
      //         </Dialog>
      //       </DropdownMenuItem>
      //       <DropdownMenuItem
      //         onSelect={(e) => {
      //           e.preventDefault();
      //           console.log('delete');
      //         }}
      //         asChild
      //       >
      //         <Dialog>
      //           <DialogTrigger asChild>
      //             <Button
      //               variant='outline'
      //               className='flex space-x-2 w-full justify-start'
      //             >
      //               <TrashIcon /> Remove
      //             </Button>
      //           </DialogTrigger>
      //           <DialogContent>
      //             <DialogHeader>
      //               <DialogTitle>Are you absolutely sure?</DialogTitle>
      //               <DialogDescription>
      //                 This action cannot be undone. This will permanently delete
      //                 your account and remove your data from our servers.
      //               </DialogDescription>
      //             </DialogHeader>
      //             <DialogFooter className='sm:justify-start gap-y-3'>
      //               <DialogClose asChild>
      //                 <Button
      //                   type='button'
      //                   variant='destructive'
      //                   onClick={removeTask}
      //                 >
      //                   Confirm
      //                 </Button>
      //               </DialogClose>
      //               <DialogClose asChild>
      //                 <Button type='button' variant='secondary'>
      //                   Cancel
      //                 </Button>
      //               </DialogClose>
      //             </DialogFooter>
      //           </DialogContent>
      //         </Dialog>
      //       </DropdownMenuItem>
      //     </DropdownMenuContent>
      //   </DropdownMenu>
      // );
    },
  },
];

export default function Records() {
  const tasks = useAppSelector((state) => state.task);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleBackup = () => {
    const updatedTasks = tasks.map((task) => {
      return {
        ...task,
        duration: calculateDuration(
          task.startTime,
          task.endTime || new Date().toISOString()
        ),
        isActive: !task.isActive ? 'Completed' : 'Not Completed',
        startTime: format(task.startTime, 'dd MMM yy hh:mm:a'),
        endTime: task.endTime ? format(task.endTime, 'dd MMM yy hh:mm:a') : '-',
      };
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const csvData = jsonToCsv(updatedTasks, {
      id: 'ID',
      isActive: 'Status',
      category: 'Task',
      duration: 'Duration',
      startTime: 'Start Time',
      endTime: 'End Time',
    });
    console.log(csvData);
    // downloadCSV(csvData);
  };

  return (
    <ClientWrapper>
      <main className='wrapper'>
        <div className='flex items-center py-4 gap-x-3'>
          <Input
            placeholder='Filter emails...'
            value={
              (table.getColumn('category')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('category')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant='default' onClick={handleBackup}>
            <LucideDatabaseBackup />
            Download
          </Button>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </ClientWrapper>
  );
}
