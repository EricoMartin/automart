import usersData from '../test/mock_db/users';

const createUser = (data) => {
  const userData = {
    token: data.token,
    id: data.id || parseInt(usersData.length + 1, 10),
    email: data.email || '',
    first_name: data.firstName || '',
    last_name: data.lastName || '',
    password: data.password || '',
    address: data.address || '',
    is_admin: data.isAdmin || false,
    status: data.status || '',
  };
  usersData.push(userData);
  return userData;
};

const getAllUsers = () => usersData;


const findByFirstName = firstName => usersData.find(user => user.first_name === firstName);

const findByEmail = email => usersData.find(user => user.email === email);

const findByEmailPass = (email, password) => usersData.find(user => user.email === email && user.password === password);

const getUser = id => usersData.find(user => user.id === id);

const deleteUser = (userdata) => {
  const idx = usersData.indexOf(userdata);
  return usersData.splice(idx, 1);
};

const loginUser = (id) => {
  const logUser = usersData.filter(user => parseInt(user.id, 10) === parseInt(id, 10));
  logUser.status = 'loggedIn';
  return logUser;
};

const changePassword = (id, newPassword) => {
  const userPassword = usersData.getUser(id);
  userPassword.password = newPassword || userPassword.password;
  return userPassword;
};
const createAdmin = (userId) => {
  const adminUser = usersData.getUser(userId);
  adminUser.isAdmin = true;
  return adminUser;
};

export default {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  loginUser,
  findByEmail,
  findByEmailPass,
  findByFirstName,
  changePassword,
  createAdmin,
};
