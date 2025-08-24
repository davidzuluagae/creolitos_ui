import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect the root path to /main
  redirect('/main');
}
