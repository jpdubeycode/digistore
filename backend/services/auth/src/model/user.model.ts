import mongoose, {Document} from "mongoose";

interface IPartnerprofile{
    slug?: string;
    bio?: string;
    website?: string;
    socialLinks?: ISocialLinks;

}
interface ISocialLinks{
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
}
interface IPaymentDetails{
    method:"upi"|"bank";
    upiId?: string;
    accountHolderName?: string;
    ifscCode?: string;
    accountNumber?: string;
}

export interface IUser extends Document{
    firebaseId: string;
    name: string;
    email: string;
    password: string;
    role: "partner" | "admin";
    partnerprofile: IPartnerprofile;

    paymentDetails :IPaymentDetails;
    totalSales: number;
    totalRevenue: number;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    firebaseId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["partner", "admin"],
        required: true,
        default: "partner",
    },
    partnerprofile: {
        slug: { type: String, default: "" },
        bio: { type: String, default: "" },
        website: { type: String, default: "" },
        socialLinks: {
            facebook: { type: String, default: "" },
            twitter: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            github: { type: String, default: "" },
        },
    },
    paymentDetails: {
        method: {
            type: String,
            enum: ["upi", "bank"],
            required: true,
        },
        upiId: { type: String, default: "" },
        accountHolderName: { type: String, default: "" },
        ifscCode: { type: String, default: "" },
        accountNumber: { type: String, default: "" },
    },
    totalSales: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);