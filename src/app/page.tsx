import { redirect } from 'next/navigation';

export default function Home () {
  redirect( '/dashboard' );
  return (
    <div>
      <h1>Home page</h1>
    </div >
  );
}
