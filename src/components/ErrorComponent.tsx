// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ErrorComponent({ msg }: any) {
  if (!msg) return null;
  return (
    <div className='text-right w-full text-red-600 pt-1 text-sm font-bold transition-all'>
      {msg}
    </div>
  );
}
