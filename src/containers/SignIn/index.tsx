import React from 'react';

import { Container } from '@/components/container';

import { type SignInFormProps } from './signin.interface';
import SignInFormPassword from './SignInFormPassword';
// import firebase from "firebase";
// import firebaseConfig from "@/lib/firebase/config";
// import { isTorNetwork } from "@/lib/utils/url.util";

// const SignInForm = dynamic(() => import("./SignInForm"), { ssr: false });

interface SignInProps extends SignInFormProps {}

export default function SignIn(props?: SignInProps) {
  // const isTorBrowser = isTorNetwork();

  // if (isTorBrowser) {
  return (
    <Container>
      <SignInFormPassword {...props} />
    </Container>
  );
  // }

  // // Initialize Firebase
  // if (firebase.apps.length <= 0) {
  //   firebase.initializeApp(firebaseConfig);
  // }

  // return (
  //   <>
  //     <Container>
  //       <SignInForm {...props} />
  //     </Container>
  //   </>
  // );
}
