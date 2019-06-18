const allUsers = [];



const createUser = (data = null) => {
  if (!data) {
    throw new Error('Please enter a user object');
  }

  const id = parseInt(allUsers.length + 1000, 10);

  const user = {
  id,
  email : null,
  firstName : null,
  lastName : null,
  password : null,
  address : null,
  isAdmin : false,
  createdAt : new Date(),
  updatedAt : new Date()
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