import Flags from '../migration/flag';
import validate from '../middlewares/validateData';


const Flag = {
  async createFlag(req, res) {
    try {
      let {
        user_id, car_id, reason, description,
      } = req.body;
      const props = [user_id, car_id, reason, description];

      if (!validate(props, req.body)) {
        return res.status(400).json({
          status: 400,
          message: 'All fields must be filled',
        });
      }
      if (reason === '' || reason.match(/\s/g).length > 30 || description.match(/\s/g).length > 60) {
        return res.status(400).json({
          status: 400,
          message: 'Note that reason cannot be more than 30 words and description cannot be more than 60 words',
        });
      }
      const { rows } = await Flags.getOwner(car_id);
      if (rows.length > 0) {
        return res.status(406).json({
          status: 406,
          message: 'You have reported this ad',
        });
      }

      car_id = parseInt(car_id, 10);
      user_id = parseInt(user_id, 10);
      reason = reason.trim().replace(/\s+/g, ' ');
      description = description.trim().replace(/\s+/g, '');
      const flagger = user_id;
      const created_on = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const status = 'reported';
      const cardata = [car_id, created_on, reason, description, status, flagger];
      const flagCreated = await Flags.createdFlag(cardata);

      return res.status(201).json({
        status: 201,
        data: {
          id: flagCreated.rows[0].id,
          car_id: flagCreated.rows[0].car_id,
          created_on: flagCreated.rows[0].created_on,
          reason: flagCreated.rows[0].reason,
          description: flagCreated.rows[0].description,
          status: flagCreated.rows[0].status,
        },
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async updateFlagStatus(req, res) {
    try {
      const flags = await Flags.findFlag(req.params.flag_id);
      if (flags.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'Flag not found',
        });
      }

      const updatedFlag = await Flags.updateFlagStatus(req.params.flag_id);
      return res.status(200).json({
        status: 200,
        data: updatedFlag.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async getAllFlags(req, res) {
    try {
      const flags = await Flags.getAllFlags();
      if (flags.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'There are no flags now',
        });
      } return res.status(200).json({
        status: 200,
        data: flags.rows,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },
  async deleteFlag(req, res) {
    try {
      const flagger = await Flags.findFlag([parseInt(req.params.flag_id, 10)]);
      if (flagger.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'The flag is no longer available',
        });
      }
      const val = [req.params.flag_id];
      const flagDelete = Flags.deleteFlag(val);
      if (flagDelete.length < 1) {
        return res.status(500).json({
          status: 500,
          message: 'error processing request. Try again later',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Flag successfully deleted',
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },
};

export default Flag;
