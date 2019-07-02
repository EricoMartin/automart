import flagdb from '../test/mock_db/flags';

class Flag {
  constructor() {
    this.flags = flagdb;
  }

  createFlag(data) {
    const flagdata = {
      id: parseInt(this.flags.length + 1, 10),
      car_id: data.car_id,
      created_on: new Date().toLocaleString(),
      reason: data.reason,
      description: data.description,
      status: data.status || 'pending',
    };

    flagdb.push(flagdata);
    return flagdata;
  }

  getAllFlags() {
    return this.flags;
  }

  findFlag(id) {
    return this.flags.find(flag => parseInt(flag.id, 10) === parseInt(id, 10));
  }

  updateFlagStatus(flagId) {
    const flagref = this.flags.find(flag => parseInt(flag.id, 10) === parseInt(flagId, 10));
    flagref.status = 'resolved';
    return flagref;
  }

  deleteFlag(flagId) {
    const idx = this.flags.indexOf(flagId);
    const deletedFlag = this.flags.splice(idx, 1);
    deletedFlag.status = 'deleted';
    return deletedFlag;
  }
}
export default new Flag();
