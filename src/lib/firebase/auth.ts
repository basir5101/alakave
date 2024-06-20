import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-config";



export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        const userCreds = await signInWithPopup(auth, provider);
        const idToken = await userCreds.user.getIdToken();

        const response = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        });
        const resBody = await response.json();
        if (response.ok && resBody.success) {
            return true;
        } else return false;
    } catch (error) {
        console.error("Error signing in with Google", error);
        return false;
    }
}

export async function signInWithCredentials(email: string, password: string) {


    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        const response = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        });
        const resBody = await response.json();
        if (response.ok && resBody.success) {
            return true;
        } else return false;
    } catch (error) {
        console.error("Error signing in with Google", error);
        return false;
    }
}





export async function signOut() {
    try {
        await auth.signOut();

        const response = await fetch("/api/auth/sign-out", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resBody = await response.json();
        if (response.ok && resBody.success) {
            return true;
        } else return false;
    } catch (error) {
        console.error("Error signing out with Google", error);
        return false;
    }
}