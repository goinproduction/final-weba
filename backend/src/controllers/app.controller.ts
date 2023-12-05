import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export default class AppController {
  async getUser(req: Request, res: Response) {
    const user = await User.findById(
      {
        _id: req.params.userId,
      },
      { password: 0 }
    );
    if (!user) {
      return res.status(404).json({
        message: 'Not Found',
      });
    }
    return res.status(200).json(user);
  }

  async login(req: Request, res: Response) {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        message: 'Incorrect email or password',
      });
    }
    const isValid = await argon2.verify(
      user.password as string,
      req.body.password
    );
    if (!isValid) {
      return res.status(400).json({
        message: 'Incorrect email or password',
      });
    }
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1h',
      }
    );
    return res.status(200).json({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      accessToken,
    });
  }

  async loginGoogle(req: Request, res: Response) {
    const input = {
      email: req.body.email,
      fullName: req.body.full_name,
      avatar: req.body.avatar,
    };
    const user = await User.findOne({
      email: input.email,
    });
    if (user) {
      return res.status(400).json({
        message: 'User with email already existed',
      });
    }
    const newUser = new User({
      fullName: input.fullName,
      email: input.email,
      avatar: input.avatar,
    });
    await newUser.save();
    const accessToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1h',
      }
    );
    return res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      accessToken,
    });
  }

  async register(req: Request, res: Response) {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({
        message: `email already existed`,
      });
    }
    const hashedPassword = await argon2.hash(req.body.password);
    const createdUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });
    await createdUser.save();
    return res.status(201).json({
      id: createdUser._id,
    });
  }

  async update(req: Request, res: Response) {
    const user = await User.findOne({
      _id: req.params.userId,
    });
    if (!user) {
      return res.status(404).json({
        message: 'Not Found',
      });
    }
    user.fullName = req.body.fullName ? req.body.fullName : user.fullName;
    user.password = req.body.password
      ? await argon2.hash(req.body.password)
      : user.password;
    user.save();
    return res.status(200).json({
      id: user._id,
    });
  }
}
