const chothuecanho = require("../data/chothuecanho.json");
const nhachotue = require("../data/nhachothue.json");
const chothuephongtro = require("../data/chothuephongtro.json");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const DEFAULT_DAYS = 3650;
const chothuecanhodata = chothuecanho.body.map((el, idx) => ({
  images: JSON.stringify(el.images),
  title: el.header.title,
  star: Math.round(Math.random() * 4) + 1,
  address: el.header.address,
  description: el.mainContent.content?.join(", "),
  category: 3,
  price: Math.round(Math.random() * 900) * 100000,
  area: Math.round(Math.random() * 500) + 2,
  target: "Tất cả",
  postedBy: 3 + idx,
  expiredDate: new Date(Date.now() + DEFAULT_DAYS * 24 * 3600 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
const chothuephongtrodata = chothuephongtro.body.map((el, idx) => ({
  images: JSON.stringify(el.images),
  title: el.header.title,
  star: Math.round(Math.random() * 4) + 1,
  address: el.header.address,
  description: el.mainContent.content?.join(", "),
  category: 1,
  price: Math.round(Math.random() * 900) * 100000,
  area: Math.round(Math.random() * 500) + 2,
  target: "Tất cả",
  postedBy: 3 + idx,
  expiredDate: new Date(Date.now() + DEFAULT_DAYS * 24 * 3600 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
const nhachotuedata = nhachotue.body.map((el, idx) => ({
  images: JSON.stringify(el.images),
  title: el.header.title,
  star: Math.round(Math.random() * 4) + 1,
  address: el.header.address,
  description: el.mainContent.content?.join(", "),
  category: 2,
  price: Math.round(Math.random() * 900) * 100000,
  area: Math.round(Math.random() * 500) + 2,
  target: "Tất cả",
  postedBy: 3 + idx,
  expiredDate: new Date(Date.now() + DEFAULT_DAYS * 24 * 3600 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

exports.postData = []
  .concat(chothuecanhodata)
  .concat(chothuephongtrodata)
  .concat(nhachotuedata);
exports.userData = [
  ...chothuecanho.body,
  ...nhachotue.body,
  ...chothuephongtro.body,
]
  .map((el) => ({
    name: el.contact?.content[0]?.content,
    phone: el.contact?.content[1]?.content,
    password: hashPassword("123456"),
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  .filter(
    (el, idx, self) => idx === self.findIndex((u) => u.phone === el.phone)
  );

exports.priceOptions = [
  {
    value: "Dưới 1 triệu",
    min: 0,
    max: 999999,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 1 - 2 triệu",
    min: 1000000,
    max: 2000000,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 2 - 3 triệu",
    min: 2000000,
    max: 3000000,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 3 - 5 triệu",
    min: 3000000,
    max: 5000000,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 5 - 7 triệu",
    min: 5000000,
    max: 7000000,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 7 - 10 triệu",
    min: 7000000,
    max: 10000000,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 10 - 15 triệu",
    min: 10000000,
    max: 15000000,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Trên 15 triệu",
    min: 15000000,
    max: null,
    type: "PRICE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
exports.areaOptions = [
  {
    value: "Dưới 20 m²",
    min: 0,
    max: 20,
    type: "AREA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 20 - 30 m²",
    min: 20,
    max: 30,
    type: "AREA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 30 - 50 m²",
    min: 30,
    max: 50,
    type: "AREA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 50 - 70 m²",
    min: 50,
    max: 70,
    type: "AREA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Từ 70 - 90 m²",
    min: 70,
    max: 90,
    type: "AREA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "Trên 90 m²",
    min: 90,
    max: null,
    type: "AREA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
exports.roles = [
  {
    code: "1010",
    value: "Quản trị viên",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "102",
    value: "Thành viên",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
exports.categories = [
  {
    text: "Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023",
    subText:
      "Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.",
    slug: slugify("Cho thuê phòng trọ"),
    value: "Cho thuê phòng trọ",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    text: "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2023",
    subText:
      "Cho thuê nhà nguyên căn - Kênh đăng tin cho thuê nhà số 1: giá rẻ, chính chủ, miễn trung gian, đầy đủ tiện nghi, mức giá, diện tích cho thuê khác nhau.",
    slug: slugify("Nhà cho thuê"),
    value: "Nhà cho thuê",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    text: "Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất 2023",
    subText:
      "Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.",
    slug: slugify("Cho thuê căn hộ"),
    value: "Cho thuê căn hộ",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    text: "Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép, Mới Nhất 2023",
    subText:
      "Tìm người ở ghép, tìm nam ở ghép, tìm nữ ở ghép, share phòng trọ, tìm chỗ ở ghép cùng, tìm bạn ở ghép, xin ở ghép mới nhất 2023. Đăng tin ở ghép hiệu quả, nhanh chóng nhất...",
    slug: slugify("Tìm người ở ghép"),
    value: "Tìm người ở ghép",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
