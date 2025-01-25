export default function ErrorComponent({ msg }: any) {
  if (!msg) return null;
  return <div>{msg}</div>;
}
