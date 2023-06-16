import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   validate: {
    //     validator: function (value: string) {
    //       return /^[\w-]+(\.[w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
    //     },
    //     message: 'Invalid email format',
    //   },
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
