import {
  AiFillDashboard,
  AiFillHeart,
  AiOutlineDashboard,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import path from "./path";
import { BsFilePerson, BsPostcard } from "react-icons/bs";
import { FcUpRight } from "react-icons/fc";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";

export const text = {
  image: "https://phongtro123.com/images/contact-us-pana-orange.svg",
  content: "Liên hệ với chúng tôi nếu bạn cần hỗ trợ:",
  contacts: [
    {
      text: "HỖ TRỢ THANH TOÁN",
      phone: "Điện thoại: 0917686101",
      zalo: "Zalo: 0917686101",
    },
    {
      text: "HỖ TRỢ ĐĂNG TIN",
      phone: "Điện thoại: 0902657123",
      zalo: "Zalo: 0902657123",
    },
    {
      text: "HOTLINE 24/7",
      phone: "Điện thoại: 0917686101",
      zalo: "Zalo: 0917686101",
    },
  ],
};
export const textintro = {
  title: "Tại sao lại chọn phongtrosinhvien?",
  description:
    "Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Thuephongtro.com tự hào là trang web đứng top google về các từ khóa: ",
  description2:
    "...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn",
  statistic: [
    {
      name: "Thành viên",
      value: "116.998+",
    },
    {
      name: "Tin đăng",
      value: "103.348+",
    },
    {
      name: "Lượt truy cập/tháng",
      value: "300.000+",
    },
    {
      name: "Lượt xem/tháng",
      value: "2.500.000+",
    },
  ],
  price: "Chi phí thấp, hiệu quả tối đa",
  comment:
    '"Trước khi biết website thuephongtro, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website thuephongtro.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."',
  author: "Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)",
  question: "Bạn đang có phòng trọ / căn hộ cho thuê?",
  answer: "Không phải lo tìm người cho thuê, phòng trống kéo dài",
};
export const memberSidebar = [
  {
    id: 1,
    name: "Thông tin cá nhân",
    path: `${path.MEMBER}/${path.PERSONAL}`,
    icon: <BsFilePerson size={20} />,
    type: "SINGLE",
  },
  {
    id: 3,
    name: "Tin đăng",
    icon: <BsPostcard size={20} />,
    type: "PARENT",
    subs: [
      {
        path: `${path.MEMBER}/${path.CREATE_POST}`,
        name: "Tạo mới",
      },
      {
        path: `${path.MEMBER}/${path.MANAGE_POST}`,
        name: "Quản lý",
      },
    ],
  },
  {
    id: 100,
    name: "Danh sách yêu thích",
    path: `${path.MEMBER}/${path.WISHLIST}`,
    icon: <AiOutlineHeart size={20} />,
    type: "SINGLE",
  },
  {
    id: 2,
    name: "Tới Homepage",
    path: `/`,
    icon: <RiShareForwardFill size={20} />,
    type: "SINGLE",
  },
];
export const targets = [
  {
    code: "male",
    label: "Nam",
    name: "Nam",
    value: "Nam",
  },
  {
    code: "female",
    label: "Nữ",
    name: "Nữ",
    value: "Nữ",
  },
  {
    code: "all",
    label: "Tất cả",
    value: "Tất cả",
    name: "Tất cả",
  },
];
export const adminSidebar = [
  {
    id: 5,
    name: "Thống kê",
    path: `${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20} />,
    type: "SINGLE",
  },
  {
    id: 3,
    name: "Quản lý tin đăng",
    icon: <BsPostcard size={20} />,
    type: "SINGLE",
    path: `${path.ADMIN}/${path.MANAGE_POST_ALL}`,
  },
  {
    id: 4,
    name: "Quản lý thành viên",
    path: `${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <AiOutlineUser size={20} />,
    type: "SINGLE",
  },
  {
    id: 8,
    name: "Quản lý gia hạn",
    path: `${path.ADMIN}/${path.MANAGE_EXPIRED}`,
    icon: <MdOutlineAttachMoney size={20} />,
    type: "SINGLE",
  },
  {
    id: 2,
    name: "Tới Homepage",
    path: `/`,
    icon: <RiShareForwardFill size={20} />,
    type: "SINGLE",
  },
];
