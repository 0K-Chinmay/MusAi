import Image from "next/image";
import { dark } from '@clerk/themes';
import {
  SignUp,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="h-100%">
    <SignedOut>
      <div className="h-screen w-100% bg-white flex justify-center items-center">
        <SignUp appearance={{
        baseTheme: dark
       }} signInUrl="/SignIn" /> 
       </div>
    </SignedOut>
    </div>
  );
}
