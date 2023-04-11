import { mainStoreSlice, store } from "../Store/Store";
import axiosInstance from "../Utils.js/Axios";

export const getAllCandidate = () => {
  store.dispatch(mainStoreSlice.actions.openLoader());
  try {
    const response = axiosInstance.get("/get_candidates");
    return response;
  } catch (error) {
    console.log("error", error);
    store.dispatch(mainStoreSlice.actions.closeLoader());
    return error;
  } finally {
    // store.dispatch(mainStoreSlice.actions.closeLoader());
  }
};

export const getAllJobs = () => {
  store.dispatch(mainStoreSlice.actions.openLoader());
  try {
    const response = axiosInstance.get("/get_jobs");
    return response;
  } catch (error) {
    store.dispatch(mainStoreSlice.actions.closeLoader());
    return error;
  } finally {
    // store.dispatch(mainStoreSlice.actions.closeLoader());
  }
};

export const postJob = (formData) => {
  store.dispatch(mainStoreSlice.actions.openLoader());
  try {
    const response = axiosInstance.post("/create_job_post", formData);
    return response;
  } catch (error) {
    store.dispatch(mainStoreSlice.actions.closeLoader());
    return error;
  } finally {
    // store.dispatch(mainStoreSlice.actions.closeLoader());
  }
};

export const postUploadFileResume = (formData) => {
  store.dispatch(mainStoreSlice.actions.openLoader());
  try {
    const response = axiosInstance.post("/process_resume", formData);
    return response;
  } catch (error) {
    store.dispatch(mainStoreSlice.actions.closeLoader());
    return error;
  } finally {
    // store.dispatch(mainStoreSlice.actions.closeLoader());
  }
};

export const postProcessCandidate = (formData) => {
  store.dispatch(mainStoreSlice.actions.openLoader());
  try {
    const response = axiosInstance.post("/process_candidates", formData);
    return response;
  } catch (error) {
    store.dispatch(mainStoreSlice.actions.closeLoader());
    return error;
  } finally {
    // store.dispatch(mainStoreSlice.actions.closeLoader());
  }
};

export const postSendEmail = (formData) => {
  store.dispatch(mainStoreSlice.actions.openLoader());
  try {
    const response = axiosInstance.post("/sendEmail", formData);
    return response;
  } catch (error) {
    store.dispatch(mainStoreSlice.actions.closeLoader());
    return error;
  } finally {
    // store.dispatch(mainStoreSlice.actions.closeLoader());
  }
};

// axiosInstance.get("/get_jobs").then((response) => {
//   console.log(response.data);
// });
