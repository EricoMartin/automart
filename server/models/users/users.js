
const allUsers = [];



const createUser = (data = null) => {
  if (!data) {
    throw new Error('Please enter a user object');
  }

  const id = parseInt(allUsers.length + 1000, 10);

  const user = {
    id,
    ...data,
    isAdmin: false,
}

  allUsers.push(user);

  return user;
};

const findEmail = (email) => {
  allUsers.find((user) => {
  return user.email === email;
  });
}
export {
  createUser,
  findEmail,
  allUsers
};