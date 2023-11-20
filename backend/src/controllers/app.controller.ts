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
      username: req.body.username,
    });

    if (!user) {
      return res.status(400).json({
        message: 'Incorrect username or password',
      });
    }
    const isValid = await argon2.verify(
      user.password as string,
      req.body.password
    );
    if (!isValid) {
      return res.status(400).json({
        message: 'Incorrect username or password',
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
      username: user.username,
      fullName: user.fullName,
      accessToken,
    });
  }

  async register(req: Request, res: Response) {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      return res.status(400).json({
        message: `Username already existed`,
      });
    }
    const hashedPassword = await argon2.hash(req.body.password);
    const createdUser = new User({
      fullName: req.body.fullName,
      username: req.body.username,
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
