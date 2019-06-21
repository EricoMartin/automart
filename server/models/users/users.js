
const allUsers = [];



const createUser = (data = null) => {
  if (!data) {
    throw new Error('Please enter a user object');
  }

  const id = parseInt(allUsers.length + 1000, 10);

  const user = {
  id,
  email : data.email,
  firstName : data.firstName,
  lastName : data.lastName,
  password : data.password,
  address : data.address,
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