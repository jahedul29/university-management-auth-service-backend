export enum UserRoles {
  Student,
  Faculty,
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
