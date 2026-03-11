"use client";
import { Button } from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";

// DATA FLOW:
/*
    From here to /api/auth/[...all] route.
    From above file to auth.ts, then to database using PrismaClient.

*/

export default function Register(){

    const handleSignUp = async ()=>{
        
        const {data,error} = await authClient.signUp.email({
            email: "dummy@gmail.com",
            password: "123dummyPass",
            name: "Saksham Verma",
            image: "cloudinary_URL",
            callbackURL: "/profile",
        },{

        onRequest: (ctx)=>{
            // show loading spinner.
        },

        onSuccess:()=>{
            //redirect to /profile route.
        },

        onError:(ctx)=>{
            alert(ctx.error.message);
        },

        } 

    );


    }
    return(

        <Button onClick={handleSignUp}>Register</Button>

    );
}