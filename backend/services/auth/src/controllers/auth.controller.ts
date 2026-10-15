import type { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { app } from "../configs/firebase.js";
import { User } from "../model/user.model.js";

export const login = async (req: Request, res: Response) => {
    try {
        const{token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);

        let user = await User.findOne({ firebaseId: decoded.uid });

        if(!user) {
            user = await User.create({
                name: decoded.name || "",
                email: decoded.email || "",
                firebaseId: decoded.uid,
            })

        }
        const sessionId = crypto.randomUUID();
        }catch (error) {
        
    }
}    