const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../models");
const asyncHandler = require("express-async-handler");

const createNewPost = asyncHandler(async (req, res) => {
  const response = await db.Post.create({
    ...req.body,
    expiredDate: Date.now() + process.env.DEFAULT_DAYS * 24 * 3600 * 1000,
  });
  return res.json({
    success: response ? true : false,
    mes: response ? "Tạo mới tin đăng thành công" : "Có lỗi, hãy thử lại sau.",
  });
});
const getPosts = asyncHandler(async (req, res) => {
  const {
    limit,
    page,
    fields,
    order,
    address,
    price,
    area,
    keyword,
    isPublic,
    ...query
  } = req.query;
  const limitQuery = +limit || +process.env.LIMIT;
  const offset = +page - 1 || 0;
  const offsetQuery = offset * limitQuery;
  if (keyword)
    query[Op.or] = [
      { title: { [Op.substring]: `%${keyword}%` } },
      { address: { [Op.substring]: `%${keyword}%` } },
    ];
  if (address) query.address = { [Op.substring]: `%${address}%` };
  if (price && price.length === 2) query.price = { [Op.between]: price };
  if (price && price.length === 1) query.price = { [Op.gt]: price[0] };
  if (area && area.length === 2) query.area = { [Op.between]: area };
  if (area && area.length === 1) query.area = { [Op.gt]: area[0] };
  const queries = {};
  if (order) queries.order = [order];
  else queries.order = [["title", "DESC"]];
  queries.offset = offsetQuery;
  queries.limit = limitQuery;
  if (isPublic) query.expiredDate = { [Op.gte]: Date.now() };
  if (fields) queries.attributes = fields.split(",");
  if (limit === "ALL") {
    const q = {};
    if (fields) q.attributes = fields.split(",");
    const response = await db.Post.findAll(q);
    return res.json({
      success: response ? true : false,
      posts: response,
    });
  } else {
    // console.log(query)
    const response = await db.Post.findAndCountAll({
      where: query,
      ...queries,
      include: [
        {
          model: db.User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role"],
          },
          as: "author",
        },
        { model: db.Category, attributes: ["value"], as: "cates" },
        { model: db.Expired, attributes: ["status"], as: "expiredPost" },
      ],
    });
    return res.json({
      success: response ? true : false,
      posts: response,
    });
  }
});
const getPostById = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await db.Post.findByPk(pid, {
    include: [
      {
        model: db.User,
        attributes: { exclude: ["password", "createdAt", "updatedAt", "role"] },
        as: "author",
      },
      { model: db.Category, attributes: ["value"], as: "cates" },
      { model: db.Rating, as: "votes" },
    ],
  });
  return res.json({
    success: response ? true : false,
    mes: response ? "Got" : "Có lỗi, hãy thử lại sau.",
    post: response,
  });
});
const updatePost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await db.Post.update(req.body, { where: { id: pid } });
  return res.json({
    success: response[0] > 0 ? true : false,
    mes:
      response[0] > 0
        ? "Cập nhật tin đăng thành công"
        : "Có lỗi, hãy thử lại sau.",
  });
});
const deletePost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await db.Post.destroy({ where: { id: pid } });
  return res.json({
    success: response > 0 ? true : false,
    mes: response > 0 ? "Xóa tin đăng thành công" : "Có lỗi, hãy thử lại sau.",
  });
});
const createRequestRequired = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { pid, days } = req.body;
  const alreadyExpiredPost = await db.Expired.findOne({ where: { pid, uid } });
  if (alreadyExpiredPost) {
    await db.Expired.update(
      { ...req.body, uid },
      { where: { id: alreadyExpiredPost.id } }
    );
  } else {
    await db.Expired.create({ ...req.body, uid });
  }
  if (req.body?.status === "Accepted") {
    await db.Post.update(
      { expiredDate: Date.now() + days * 24 * 3600 * 1000 },
      { where: { id: pid } }
    );
  }
  return res.json({
    success: true,
    mes: "Đã gửi yêu cầu gia hạn. Chủ trọ hãy liên hệ admin thanh toán số tiền gia hạn đã đăng ký.",
  });
});
const getExpireds = asyncHandler(async (req, res) => {
  const { limit, page, fields, order, keyword, ...query } = req.query;
  const limitQuery = +limit || +process.env.LIMIT;
  const offset = +page - 1 || 0;
  const offsetQuery = offset * limitQuery;
  if (keyword)
    query[Op.or] = [
      { "$requestUser.name$": { [Op.substring]: keyword } },
      { "$requestPost.title$": { [Op.substring]: keyword } },
    ];
  const queries = {};
  if (order) queries.order = [order];
  else queries.order = [["createdAt", "DESC"]];
  queries.offset = offsetQuery;
  queries.limit = limitQuery;
  if (fields) queries.attributes = fields.split(",");
  if (limit === "ALL") {
    const q = {};
    if (fields) q.attributes = fields.split(",");
    const response = await db.Expired.findAll(q);
    return res.json({
      success: response ? true : false,
      expireds: response,
    });
  } else {
    const response = await db.Expired.findAndCountAll({
      where: query,
      ...queries,
      include: [
        { model: db.Post, as: "requestPost" },
        { model: db.User, as: "requestUser" },
      ],
    });
    return res.json({
      success: response ? true : false,
      expireds: response,
    });
  }
});
const updateExpired = asyncHandler(async (req, res) => {
  const { expiredId } = req.params;
  const { status, pid, days } = req.body;
  if (status === "Accepted") {
    const [post, expired] = await Promise.all([
      db.Post.update(
        { expiredDate: Date.now() + days * 24 * 3600 * 1000 },
        { where: { id: pid } }
      ),
      db.Expired.update({ status }, { where: { id: expiredId } }),
    ]);
    return res.json({
      success: post[0] > 0 && expired[0] > 0 ? true : false,
      mes: post[0] > 0 && expired[0] > 0 ? "Updated." : "Có lỗi hãy thử lại.",
    });
  } else {
    const response = await db.Expired.update(
      { status },
      { where: { id: expiredId } }
    );
    return res.json({
      success: response[0] > 0 ? true : false,
      mes: response[0] > 0 ? "Updated." : "Có lỗi hãy thử lại.",
    });
  }
});
const deleteExpired = asyncHandler(async (req, res) => {
  const { expiredId } = req.params;
  const response = await db.Expired.destroy({ where: { id: expiredId } });
  return res.json({
    success: response > 0 ? true : false,
    mes: response > 0 ? "Removed." : "Có lỗi hãy thử lại.",
  });
});
const updateWishlist = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { uid } = req.user;
  const alreadyWishlist = await db.Wishlist.findOne({ where: { pid, uid } });
  if (alreadyWishlist) {
    await db.Wishlist.destroy({ where: { pid, uid } });
  } else {
    await db.Wishlist.create({ pid, uid });
  }
  return res.json({
    success: true,
    mes: "Đã cập nhật Wishlist của bạn.",
  });
});
const rating = asyncHandler(async (req, res) => {
  const { content, score } = req.body;
  const { postId } = req.params;
  const { uid } = req.user;
  const alreadyRatingUser = await db.Rating.findOne({
    where: { uid, targetId: postId },
  });
  if (alreadyRatingUser) {
    await db.Rating.update(req.body, { where: { id: alreadyRatingUser.id } });
  } else {
    await db.Rating.create({ content, score, targetId: postId, uid });
  }
  const response = await db.Rating.findAll({ where: { targetId: postId } });
  const totalStar = response?.reduce((sum, el) => sum + el.score, 0);
  const star = Math.round(totalStar / response.length);
  await db.Post.update({ star }, { where: { id: postId } });
  return res.json({
    success: true,
    mes: "Updated.",
  });
});
module.exports = {
  createNewPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  createRequestRequired,
  getExpireds,
  updateExpired,
  deleteExpired,
  updateWishlist,
  rating,
};
