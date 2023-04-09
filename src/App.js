import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import Employer from "./Employer/Employer";
import LoginPage from "./Auth/Login";
import FileUpload from "./FileUpload";
import EmployerMain from "./Employer/EmployerMain";
import UploadResume from "./Employer/UploadResume";
import LandingPage from "./Careers/LandingPage";
import Questionnaire from "./Employer/Questionnaire";
import "./App.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { store } from "./Store/Store";
import { useSelector } from "react-redux";

const RouterUse = () => {
  let isCheckAccessToken = localStorage.getItem("token");
  let routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    {
      path: "upload",
      element: <UploadResume />,
    },
    { path: "login", element: <LoginPage /> },
    // { path: "upload", element: <FileUpload /> },
    {
      path: "employer",
      element: isCheckAccessToken ? <EmployerMain /> : <Navigate to="/login" />,
      children: [
        {
          path: "search",
          element: <Employer />,
        },
        {
          path: "upload",
          element: <UploadResume />,
        },
        {
          path: "questionnaire",
          element: <Questionnaire />,
        },
      ],
    },
  ]);
  return routes;
};

function App() {
  // const [isLoaderOpen, setIsLoaderOpen] = useState(true);
  // const count = store.getState().count;
  console.log("store.getState()", store.getState());
  const isLoaderOpen = store.getState().isLoaderOpen;
  const currentUser = useSelector((state) => state);
  console.log("currentUser", currentUser);

  // const handleClose = () => {
  //   setIsLoaderOpen(false);
  // };
  return (
    <div className="App">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoaderOpen}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BrowserRouter>
        <RouterUse />
      </BrowserRouter>
    </div>
  );
}

export default App;
