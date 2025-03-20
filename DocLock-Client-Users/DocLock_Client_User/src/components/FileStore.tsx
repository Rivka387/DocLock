import { makeAutoObservable, runInAction } from "mobx";
import { UserFile } from "../types/UserFile";
import axios from "axios";
import userStore from "./userStore";

class FileStore {
  files: UserFile[] = [];
  loading: boolean = false;
  error: string | null = null;
  url: string = "http://localhost:3000/api/File";

  constructor() {
    makeAutoObservable(this);
  }

  async uploadFile(file: File, name: string, password: string, type: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", name);
    formData.append("password", password);
    formData.append("fileType", type);

    console.log(formData);

    try {
      runInAction(() => {
        this.loading = true;
      });

      console.log(userStore.user.id + "user id=" + userStore.user);

      const response = await axios.post(
        `${this.url}/upload/${userStore.user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);

      await this.fetchFiles();
      alert("Upload successful");
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error uploading file";
      });
      alert("Upload failed");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchFiles() {
    try {
      runInAction(() => {
        this.loading = true;
      });

      const response = await axios.get(`${this.url}/user/${userStore.user.id??sessionStorage.getItem('userId')}`);
      
      runInAction(() => {
        this.files = response.data;
        this.error = null; // מאפסים שגיאות ישנות אם הקריאה הצליחה
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error fetching files";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const fileStore = new FileStore();
export default fileStore;
