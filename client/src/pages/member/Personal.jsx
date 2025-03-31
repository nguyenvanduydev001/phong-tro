import { apiUploadImageCloudinary } from "@/apis/app";
import { apiUpdateProfile } from "@/apis/user";
import { Button, InputForm, Title } from "@/components";
import withBaseTopping from "@/hocs/withBaseTopping";
import { getCurrent } from "@/redux/actions";
import { modal } from "@/redux/appSlice";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import ChangePhone from "./ChangePhone";

const Personal = ({ dispatch }) => {
  const { current } = useSelector((s) => s.user);
  const {
    formState: { errors },
    setValue,
    watch,
    register,
    reset,
  } = useForm();
  const name = watch("name");
  const avatar = watch("avatar");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    reset({
      name: current?.name,
      phone: current?.phone,
      role: current?.roleData?.value,
      isBlocked: current?.isBlocked ? "Đang khóa" : "Đang hoạt động",
    });
    setValue("avatar", current.avatar);
  }, [current]);

  const handleUploadFile = async (e) => {
    const formData = new FormData();
    setIsLoading(true);
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "phongtro");
    const response = await apiUploadImageCloudinary(formData);
    setIsLoading(false);
    if (response.status === 200) {
      setValue("avatar", response.data?.secure_url);
    }
  };
  const onSubmit = async () => {
    const response = await apiUpdateProfile({ name, avatar });
    if (response.success) {
      toast.success(response.mes);
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };
  return (
    <section className="">
      <Title title="Thông tin cá nhân">
        <Button onClick={onSubmit}>Cập nhật</Button>
      </Title>
      <div className="sm:w4/5 w-3/5 mx-auto p-4 grid grid-cols-10 mt-6 gap-6">
        <form className="flex flex-col gap-3 col-span-7">
          <InputForm
            label="Tên của bạn"
            register={register}
            errors={errors}
            id="name"
            validate={{ required: "Trường này không được bỏ trống." }}
            fullWidth
          />
          <InputForm
            label="Số điện thoại"
            register={register}
            errors={errors}
            id="phone"
            validate={{ required: "Trường này không được bỏ trống." }}
            inputClassName="border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default"
            readOnly
            fullWidth
          />
          <InputForm
            label="Vai trò"
            register={register}
            errors={errors}
            id="role"
            validate={{ required: "Trường này không được bỏ trống." }}
            fullWidth
            readOnly
            inputClassName="border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default"
          />
          <InputForm
            label="Trạng thái"
            register={register}
            errors={errors}
            id="isBlocked"
            validate={{ required: "Trường này không được bỏ trống." }}
            fullWidth
            inputClassName="border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default"
            readOnly
          />
          <span
            onClick={() =>
              dispatch(
                modal({
                  isShowModal: true,
                  modalContent: <ChangePassword phone={current?.phone} />,
                })
              )
            }
            className="text-main-blue underline cursor-pointer mt-4 text-sm"
          >
            Đổi mật khẩu
          </span>
          <span
            onClick={() =>
              dispatch(
                modal({ isShowModal: true, modalContent: <ChangePhone /> })
              )
            }
            className="text-main-blue underline cursor-pointer text-sm"
          >
            Cập nhật số điện thoại mới
          </span>
        </form>
        <div className="col-span-3 flex flex-col gap-4">
          <h3 className="font-medium" htmlFor="avatar">
            Ảnh đại diện
          </h3>
          <img
            src={avatar || "/user.svg"}
            alt="avatar"
            className="w-24 h-24 object-cover border rounded-full"
          />
          <label
            className="rounded-md px-4 py-2 flex items-center justify-center text-white bg-main-pink w-fit gap-2"
            htmlFor="avatar"
          >
            {isLoading && (
              <span className="animate-spin">
                <CgSpinner />
              </span>
            )}
            <span>Tải ảnh</span>
          </label>
          <input hidden onChange={handleUploadFile} type="file" id="avatar" />
        </div>
      </div>
    </section>
  );
};

export default withBaseTopping(Personal);
