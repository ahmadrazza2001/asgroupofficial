import { axiosInstance } from "./axiosInstance";

// add a new news
export const AddNews = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/news/add-news", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all news
export const GetNews = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/news/get-news", filters);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit a news
export const EditNews = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/news/edit-news/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get a news by id
export const GetNewsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/news/get-news-by-id/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete a news
export const DeleteNews = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/news/delete-news/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload news image
export const UploadNewsImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/news/upload-image-to-news",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update news status
export const UpdateNewsStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/news/update-news-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// place a new bid
export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bids/place-new-bid",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all bids
export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/bids/get-all-bids",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
