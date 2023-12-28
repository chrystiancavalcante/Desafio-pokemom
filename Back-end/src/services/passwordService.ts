import bcrypt from 'bcrypt';

export const hashPassword = async (password: any) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: any, hash: any) => {
  return await bcrypt.compare(password, hash);
};
