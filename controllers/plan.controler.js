const planServices = require("../services/plan.services");

exports.index = async (req, res) => {
  try {
    const response = await planServices.getAllPlan();

    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await planServices.updatePlan(id, req.body);

    if (response) {
      return res.status(200).json({
        status: 200,
        data: response,
        message: "Plan updated successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

exports.store = async (req, res) => {
  try {
    const response = await planServices.postPlan(req.body);
    if (response) {
      return res.status(201).json({
        status: 201,
        message: "plans created successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await planServices.deletePlan(id);
    if (response) {
      return res.status(201).json({
        status: 201,
        message: "plans deleted successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

exports.update_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await planServices.updatePlan(id, req.body);

    if (response) {
      return res.status(201).json({
        status: 201,
        data: response,
        message: "Plan updated successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

exports.plan_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await planServices.getPlanById(id);

    if (response) {
      return res.status(201).json({
        status: 201,
        message: "plans fetch succesfully",
        data: response[0],
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
