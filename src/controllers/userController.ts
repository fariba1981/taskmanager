import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';

const createToken = (user: IUser) => {
    return jwt.sign({id: user._id, email: user.email}, 'myJWTsecret', {
        expiresIn: 86400
    });
};

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({message: 'Please. Send your email and password'});
    const user = await User.findOne({email});
    if (user)
        return res.status(400).json({message: "The user already exists"});
    else {
        const newUser = new User({email,password});
        await newUser.save();
        return res.status(201).json({newUser});
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({message: 'Please. Send your email and password'});
    const user = await User.findOne({email});
    if (!user)
        return res.status(400).json({message: 'The user does not exists'});
    else {
        const isMatch = await user.comparePassword(password);
        if (isMatch)
            return res.status(200).json({token: createToken(user)});
        else
            return res.status(400).json({message: 'The email or password are incorrect'});
    }
    
};
