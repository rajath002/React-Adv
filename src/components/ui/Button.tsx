export default function Button(props: {
  children: React.ReactNode;
  onclick: (event: any) => void;
}) {
  return (
    <>
      <button data-testid="button" onClick={props.onclick}>{props.children}</button>
    </>
  );
}
