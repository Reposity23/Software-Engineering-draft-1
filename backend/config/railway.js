// EDIT THIS FILE WHEN YOU CREATE A NEW RAILWAY ACCOUNT / PROJECT
// Keep these values in sync with backend/api_railway.py for quick manual updates.

const railwayDefaults = {
  mongoUri:
    "mongodb://mongo:sAaUrUyEWfuYgnHTJhWnYQlQhoDZvgQj@mainline.proxy.rlwy.net:35014",
};

const getMongoUri = () => process.env.MONGO_URI || railwayDefaults.mongoUri;

module.exports = {
  railwayDefaults,
  getMongoUri,
};
