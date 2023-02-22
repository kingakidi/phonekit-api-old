const domainServices = require("../services/domains.services");

exports.index = async (req, res) => {
  const domains = await domainServices.getAllDomain();

  res.status(200).json(domains);
};
exports.store = async (req, res) => {};
exports.update = async (req, res) => {};
exports.destroy = async (req, res) => {};
exports.ssl = async (req, res) => {};
