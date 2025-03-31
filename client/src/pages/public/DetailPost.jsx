import { apiGetPostById, apiGetPosts } from "@/apis/post";
import {
  Button,
  Comments,
  Map,
  Rating,
  RelatedPost,
  Slider,
  TypeBox,
} from "@/components";
import React, { useEffect, useRef, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { GoDotFill, GoLocation } from "react-icons/go";
import { customMoney, renderStarFromNumber } from "@/ultils/fn";
import moment from "moment/moment";
import "moment/locale/vi";
import DOMPurify from "dompurify";
import { BsFillTelephoneFill } from "react-icons/bs";
import { SiZalo } from "react-icons/si";
import { CgSpinner } from "react-icons/cg";
import { useSelector } from "react-redux";
import withBaseTopping from "@/hocs/withBaseTopping";
import path from "@/ultils/path";

const DetailPost = ({ navigate, location }) => {
  const { pid } = useParams();
  const dRef = useRef();
  const [post, setPost] = useState(null);
  const { current } = useSelector((s) => s.user);
  const { isShowModal } = useSelector((s) => s.app);
  const [related, setRelated] = useState({
    news: null,
    hot: null,
  });
  const [center, setCenter] = useState([]);
  const fetchPostById = async () => {
    const response = await apiGetPostById(pid);
    if (response.success) setPost(response.post);
    const [news, hot] = await Promise.all([
      apiGetPosts({ limit: 4, order: ["createdAt", "DESC"] }),
      apiGetPosts({ limit: 5, order: ["star", "DESC"] }),
    ]);
    if (news.success)
      setRelated((prev) => ({ ...prev, news: news.posts?.rows }));
    if (hot.success) setRelated((prev) => ({ ...prev, hot: hot.posts?.rows }));
  };
  useEffect(() => {
    setCenter([]);
    if (pid && !isShowModal) fetchPostById();
    // dRef.current.scrollIntoView({ block: "center" })
  }, [pid, isShowModal]);
  return (
    <section className="mb-6">
      {!post?.isAvailable && (
        <p className="p-4 border rounded-md border-main-pink text-main-pink bg-transparent text-center w-full inline-block mt-6 text-sm">
          Chỗ nghỉ này đã được người cho thuê đánh dấu là ĐÃ ĐƯỢC THUÊ. Bạn có
          thể liên hệ người cho thuê để thông tin thêm nêu cần.
        </p>
      )}
      <div ref={dRef} className="text-main-blue my-4 text-sm">
        Breadcrum
      </div>
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="col-span-7 bg-white rounded-md border">
          <Slider count={1}>
            {post?.images?.map((el) => (
              <img
                key={el}
                src={el}
                alt="avatar"
                className="h-[350px] object-contain m-auto"
              />
            ))}
          </Slider>
          <div className="p-4 text-sm flex flex-col gap-3">
            <h1 className="text-xl text-main-red font-bold line-clamp-2">
              <span className="w-fit inline-block">
                {post?.star && (
                  <span className="flex items-center mr-3">
                    {renderStarFromNumber(post?.star)?.map((el, idx) => (
                      <span key={idx}>{el}</span>
                    ))}
                  </span>
                )}
              </span>
              <span>{post?.title}</span>
            </h1>
            <span>
              Chuyên mục:{" "}
              <span className="text-main-blue font-semibold underline cursor-pointer">
                {post?.cates?.value +
                  " " +
                  post?.address?.split(",")?.slice(-1)?.pop()}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <GoLocation color="#1266DD" size={16} />
              <span>{post?.address}</span>
            </span>
            <div className="grid grid-cols-3">
              <span className="flex items-center gap-2">
                💰
                <span className="text-lg font-bold text-green-600">
                  {customMoney(post?.price)}
                </span>
              </span>
              <span className="flex items-center gap-2">
                🔳<span>{post?.area}</span>
                <span>
                  m<sup>2</sup>
                </span>
              </span>
              <span className="flex items-center gap-2">
                🕓<span>{moment(post?.createdAt).fromNow()}</span>
              </span>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold">Thông tin mô tả</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.description),
                }}
              />
            </div>
            <div className="mt-6">
              <h2 className="text-lg my-3 font-bold">Đặc điểm tin đăng</h2>
              <div className="grid grid-cols-10">
                <div className="col-span-3 flex flex-col">
                  <span className="p-2  border-[0.5px]">Khu vực:</span>
                  <span className="p-2  border-[0.5px] bg-gray-100">
                    Loại tin rao:
                  </span>
                  <span className="p-2  border-[0.5px]">Đối tượng:</span>
                  <span className="p-2  border-[0.5px] bg-gray-100">
                    Ngày đăng:
                  </span>
                </div>
                <div className="col-span-7 flex flex-col">
                  <span className="p-2  border-[0.5px]">
                    {post?.cates?.value +
                      " " +
                      post?.address?.split(",")?.slice(-1)?.pop()}
                  </span>
                  <span className="p-2  border-[0.5px] bg-gray-100">
                    {post?.cates?.value}
                  </span>
                  <span className="p-2  border-[0.5px]">{post?.target}</span>
                  <span className="p-2  border-[0.5px] bg-gray-100">
                    {moment(post?.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold my-3">Thông tin liên hệ</h2>
              <div className="grid grid-cols-10">
                <div className="col-span-3 flex flex-col">
                  <span className="p-2  border-[0.5px]">Liên hệ:</span>
                  <span className="p-2  border-[0.5px] bg-gray-100">
                    Điện thoại:
                  </span>
                  <span className="p-2  border-[0.5px]">Zalo:</span>
                </div>
                <div className="col-span-7 flex flex-col">
                  <span className="p-2  border-[0.5px]">
                    {post?.author?.name}
                  </span>
                  <span className="p-2  border-[0.5px] bg-gray-100">
                    {post?.author?.phone}
                  </span>
                  <span className="p-2  border-[0.5px]">
                    {post?.author?.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold">Bản đồ</h2>
              <span className="py-3">{post?.address}</span>
              <div className="w-full h-[250px]">
                <Map
                  address={post?.address?.replace("Địa chỉ:", "")}
                  zoom={16}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <div className="rounded-md bg-white p-4 flex gap-2 flex-col justify-center items-center">
            <div className="rounded-full bg-white">
              <img
                src={post?.author?.avatar || "/user.svg"}
                alt="avatar"
                className="w-20 h-20 object-cover rounded-full border border-blue-500"
              />
            </div>
            <span className="flex fap-2 items-center text-sm">
              <GoDotFill
                size={20}
                color={post?.author?.isBlocked ? "red" : "green"}
              />
              <span>
                {post?.author?.isBlocked
                  ? "Tài khoản tạm khóa"
                  : "Đang hoạt động"}
              </span>
            </span>
            <span className="text-lg font-semibold">{post?.author?.name}</span>
            <Button fullWidth>
              <BsFillTelephoneFill size={18} />
              <span className="text-lg pl-3">{post?.author?.phone}</span>
            </Button>
            <Button
              className="bg-white text-main-blue border border-blue-600"
              fullWidth
            >
              <span className="h-6 w-6 rounded-full text-main-blue flex items-center justify-center border border-[#1266DD]">
                <SiZalo size={18} />
              </span>
              <span className="text-lg pl-3">{post?.author?.phone}</span>
            </Button>
          </div>
          <RelatedPost title="Tin nổi bật" data={related.hot} />
          <RelatedPost title="Tin mới đăng" data={related.news} />
        </div>
      </div>
      <div className="mt-6">
        <Rating
          name={post?.title}
          votes={post?.votes}
          star={post?.star}
          pid={post?.id}
        />
      </div>
      <div className="w-full mt-4 p-4  rounded-md bg-white drop-shadow-sm">
        <h1 className="text-xl font-bold tracking-tight mb-6">
          Trao đổi và bình luận
        </h1>
        <div className="flex flex-col gap-4">
          {current ? (
            <TypeBox pid={post?.id} />
          ) : (
            <span className="mb-4">
              Hãy để lại góp ý của bạn.{" "}
              <span
                onClick={() =>
                  navigate({
                    pathname: path.LOGIN,
                    search: createSearchParams({
                      redirect: location.pathname,
                    }).toString(),
                  })
                }
                className="cursor-pointer text-main-blue hover:underline"
              >
                Đi tới đăng nhập!
              </span>
            </span>
          )}
          <Comments />
        </div>
      </div>
    </section>
  );
};

export default withBaseTopping(DetailPost);
