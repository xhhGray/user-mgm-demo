const express = require("express");
// 创建一个express实例
const app = express();

// 访问模型对象
const models = require("../db/models");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * 新增一个用户
 */
app.post("/createUser", async (req, res, next) => {
  try {
    let { name, phone, email, role } = req.body;
    let user = await models.User.create({
      name,
      phone,
      email,
      role,
    });
    res.json({
      user,
      message: "创建成功！",
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 删除一个用户
 */
app.post("/deleteUser", async (req, res, next) => {
  try {
    let { id } = req.body;
    models.User.destroy({
      where: {
        id,
      },
    });
    res.json({
      message: "删除成功！",
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 修改一个用户，或变更状态
 */
app.post("/updateUser", async (req, res, next) => {
  try {
    let { id, phone, email, role } = req.body;
    let user = await models.User.findOne({
      where: {
        id,
      },
    });
    if (user) {
      user = await user.update({
        phone,
        email,
        role,
      });
    }
    res.json({
      user,
      message: "修改成功！",
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 查询user表
 */
app.post("/findUser", async (req, res, next) => {
  try {
    let { role, limit, offset } = req.body;
    let list = await models.User.findAndCountAll({
      where: role ? { role } : {},
      limit,
      offset,
    });
    res.json({
      list,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 统一处理异常
 */
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/**
 * 添加服务器的监听
 */
app.listen(8080, () => {
  // 服务器通过 nodemon 启动，ip默认为http://172.0.0.1
  console.log("服务器启动了...");
});
