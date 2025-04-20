import axiosInstance from "./axiosInstance";

// Chart kaydetme
export const saveChart = async (chartRequest) => {
    try {
      const response = await axiosInstance.post('/saveChart', chartRequest);
      return response.data;
    } catch (error) {
      console.error('Chart kaydetme hatası:', error);
      throw error;
    }
  };
  
  // // Chart silme
  // export const deleteChart = async (id) => {
  //   try {
  //     const response = await axiosInstance.delete(`/deleteChart/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Chart silme hatası:', error);
  //     throw error;
  //   }
  // };