export enum UserRoles {
  // eslint-disable-next-line no-unused-vars
  Student,
  // eslint-disable-next-line no-unused-vars
  Faculty,
  // eslint-disable-next-line no-unused-vars
  Admin,
}

export const generateUserId = (lastId: string, role: string): string => {
  const academicYear = new Date().getFullYear().toString().slice(-2);
  const newRoll = lastId ? parseInt(lastId.slice(-4)) : 1;
  const userId = `${academicYear}${
    UserRoles[role as keyof typeof UserRoles]
  }${newRoll.toString().padStart(4, '0')}`;
  return userId;
};
