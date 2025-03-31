import path from "./ultils/path";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Layout,
  Home,
  Login,
  Chothuecanho,
  Chothuephongtro,
  Nhachothue,
  Timoghep,
  DetailPost,
  Filter,
} from "./pages/public";
import { Loading, Modal } from "./components";
import {
  LayoutAdmin,
  Dashboard,
  ManageUser,
  ManagePosts,
  ManageExpired,
} from "./pages/admin";
import {
  LayoutMember,
  Personal,
  CreatePost,
  ManagePost,
  Wishlist,
} from "./pages/member";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getCategories,
  getCurrent,
  getDataVn,
  getOptions,
} from "./redux/actions";
import { apiUpdateViews } from "./apis/app";

function App() {
  const dispatch = useDispatch();
  const { isLoading, categories, isShowModal, modalContent } = useSelector(
    (state) => state.app
  );
  const { token, current } = useSelector((state) => state.user);
  const updateViews = async (uid) => {
    await apiUpdateViews({ uid });
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOptions());
    dispatch(getDataVn());
  }, []);
  useEffect(() => {
    updateViews(current?.id);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (token) dispatch(getCurrent());
    }, 500);
  }, [token]);
  return (
    <div className="bg-gray-100">
      {isShowModal && <Modal>{modalContent}</Modal>}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
          <Loading />
        </div>
      )}
      <Routes>
        <Route path={path.LAYOUT} element={<Layout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_POST__PID__TITLE} element={<DetailPost />} />
          <Route path={path.FILTER} element={<Filter />} />
          <Route
            path={path.CHOTHUECANHO}
            element={
              <Chothuecanho
                {...categories?.find((el) => el.slug === path.CHOTHUECANHO)}
              />
            }
          />
          <Route
            path={path.CHOTHUEPHONGTRO}
            element={
              <Chothuephongtro
                {...categories?.find((el) => el.slug === path.CHOTHUEPHONGTRO)}
              />
            }
          />
          <Route
            path={path.NHACHOTHUE}
            element={
              <Nhachothue
                {...categories?.find((el) => el.slug === path.NHACHOTHUE)}
              />
            }
          />
          <Route
            path={path.TIMOGHEP}
            element={
              <Timoghep
                {...categories?.find((el) => el.slug === path.TIMOGHEP)}
              />
            }
          />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />

        {/* Admin routes */}
        <Route path={path.ADMIN} element={<LayoutAdmin />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_EXPIRED} element={<ManageExpired />} />
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.MANAGE_POST_ALL} element={<ManagePosts />} />
        </Route>

        {/* Member routes */}
        <Route path={path.MEMBER} element={<LayoutMember />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
        </Route>

        <Route path={path.INVALID} element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
