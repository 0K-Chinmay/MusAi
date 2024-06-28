import { dark } from '@clerk/themes';
import {
  SignIn,
  SignedOut,
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="h-100%">
    <SignedOut>
      <div className="h-screen w-100% bg-white flex justify-center items-center">
        <SignIn appearance={{
        baseTheme: dark
       }}/> 
       </div>
    </SignedOut>
    </div>
  );
}
