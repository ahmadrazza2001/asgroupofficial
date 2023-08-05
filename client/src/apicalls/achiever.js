import { axiosInstance } from "./axiosInstance";

// add a new achiever
export const AddAchievers = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/achievers/add-achievers",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all achievers
export const GetAchievers = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/achievers/get-achievers",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit a achievers
export const EditAchievers = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/achievers/edit-achievers/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get an achiever by id
export const GetAchieversById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/achievers/get-achievers-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete an achiever
export const DeleteAchievers = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/achievers/delete-achievers/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload achiever image
export const UploadAchieversImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/achievers/upload-image-to-achievers",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update achiever status
export const UpdateAchieversStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/achievers/update-achievers-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// place a new bid
/*export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bids/place-new-bid",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};*/

// get all bids
/*export const GetAllBids = async (filters) => {
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
*/
