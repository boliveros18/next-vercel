import bcrypt from "bcryptjs";
import { User, IUser } from "../models";
import { db } from "./";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLocaleLowerCase(),
    role,
    name,
  };
};

export const oAUthToDbUser = async (
  oAuthEmail: string,
  oAuthName: string,
  oAuthRole: string
) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: oAuthRole,
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};

export const getUsersbyId = async (
  id: string | string[] | undefined
): Promise<IUser[] | []> => {
  await db.connect();
  if(id){
    const user = await User.find(
      { _id: id },
      { name: 1, role: 1, email: 1 }
    ).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(user));
  }
  return []
};
