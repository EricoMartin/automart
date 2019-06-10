const allUsers = [];

const user = {
  id = null;
  email = null;
  firstName = null;
  lastName = null;
  password = null;
  address = null;
  isAdmin = null;
  createdAt = new Date();
  updatedAt = new Date();
}

const createUser = (data = null) => {
  if (!data) {
    throw new Error('Please enter a user object');
  }

  const id = parseInt(allUsers.length + 1000, 10);

  
  allUsers.push(user);

  return user;
};

const findEmail = (email) => {
  allUsers.find((user) => {
  user.email === email;
  });
}
export {
  createUser,
  findEmail,
  allUsers
};