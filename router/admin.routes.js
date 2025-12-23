const { Router } = require("express");
const superAdmin = require("../middleware/superadmin");
const {
  roleUpgrade,
  getAllUser,
  downgrade,
} = require("../controller/admin.controller");

const adminRouter = Router();

adminRouter.put("/role_upgrade", superAdmin, roleUpgrade);
adminRouter.get("/get_all_user", superAdmin, getAllUser);
adminRouter.put("/role_downgrade", superAdmin, downgrade);

module.exports = adminRouter;
