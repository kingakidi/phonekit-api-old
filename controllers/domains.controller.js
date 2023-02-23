const domainServices = require("../services/domains.services");

const userServices = require("../services/users.service");

exports.index = async (req, res) => {
  try {
    const response = await domainServices.getAllDomain();

    if (response && response.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Domains fetch successfully",
        data: response,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "No domain available on the system at the moment",
        data: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.single = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await domainServices.getDomainById(id);

    if (response && response.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Domains fetch successfully",
        data: response,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Domain does not exist on the system",
        data: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
exports.get_by_name = async (req, res) => {
  try {
    const domain = req.params.name;
    const response = await domainServices.getDomainByName(domain);

    if (response && response.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Domains fetch successfully",
        data: response,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Domain does not exist on the system",
        data: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
exports.store = async (req, res) => {
  try {
    // check the user id
    const { user_id } = req.body;

    // check if user have a domain, then replace

    const isUser = await userServices.getUserById(user_id);

    if (isUser.length > 0) {
      const response = await domainServices.postDomain(req.body);

      if (response) {
        // get the domains
        const { insertId } = response;

        const domain = await domainServices.getDomainById(insertId);

        return res.status(201).json({
          status: true,
          message: "domain created successfully",
          data: domain,
        });
      }
    } else {
      return res.status(400).json({
        status: true,
        message: "invalid user id ",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
exports.update = async (req, res) => {
  try {
    // check if domain exist
    const { id } = req.params;

    const isDomain = await domainServices.getDomainById(id);

    if (isDomain.length > 0) {
      const response = await domainServices.updateDomain(id, req.body);

      if (response) {
        const domain = await domainServices.getDomainById(id);
        return res.status(200).json({
          status: true,
          message: "Domain updated successfully",
          data: domain,
        });
      }
    } else {
      return res.status(400).json({
        status: true,
        message: "domain does not exist",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await domainServices.deleteDomain(id);
    return res.status(200).json({
      status: true,
      message: "Domain deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
exports.ssl = async (req, res) => {};
