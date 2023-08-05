import { axiosInstance } from "./axiosInstance";

// add a new business
export const AddBusiness = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/business/add-business",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all achievers
export const GetBusiness = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/business/get-business",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit a achievers
export const EditBusiness = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/business/edit-business/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get an achiever by id
export const GetBusinessById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/business/get-business-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete an achiever
export const DeleteBusiness = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/business/delete-business/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload achiever image
export const UploadBusinessImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/business/upload-image-to-business",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update achiever status
export const UpdateBusinessStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/business/update-business-status/${id}`,
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
