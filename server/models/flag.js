import flagdb from '../test/mock_db/flags';

  const createdFlag = (data) =>{
    const flagdata = {
      id: parseInt(flagdb.length + 1, 10),
      user_id: data.user_id,
      car_id: data.car_id,
      created_on: new Date().toLocaleString(),
      reason: data.reason,
      description: data.description,
      status: 'pending',  //pending || resoloved || deleted
    };

    flagdb.push(flagdata);
    return flagdata;
  }

  const getAllFlags = () =>{
    return flagdb;
  }

  const findFlag = (id) =>{
    return flagdb.find(flag => parseInt(flag.id, 10) === parseInt(id, 10));
  }

  const updateFlagStatus = (flag_id) =>{
    const flagref = flagdb.find(flag => parseInt(flag.id, 10) === parseInt(flag_id, 10));
    flagref.status = 'resolved';
    return flagref;
  }

  const deleteFlag = (flagId) =>{
    const idx = flagdb.indexOf(flagId);
    const deletedFlag = flagdb.splice(idx, 1);
    deletedFlag.status = 'deleted';
    return deletedFlag;
  }

export default{
  createdFlag,
  getAllFlags,
  findFlag,
  updateFlagStatus,
  deleteFlag,
  flagdb
};
