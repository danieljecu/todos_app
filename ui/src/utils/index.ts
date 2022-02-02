import axiosInstance from "./axiosInstance";
import { useLocalStorageState } from "./useLocalStorage";

// More hooks/utils will be added in the future and this could
// lead to confusing imports if there is a default
// eslint-disable-next-line import/prefer-default-export
export { axiosInstance, useLocalStorageState };
