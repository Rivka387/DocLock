import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, Grid2 as Grid, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import fileStore from "./FileStore";
import userStore from "./userStore";
import { UserFile } from "../types/UserFile";
import FileCard from "./FileCard";
import Nofile from "./Nofile";

const FileList = observer(() => {
  const [openFiles, setOpenFiles] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userStore.user.id && sessionStorage.getItem('userId')) {
          await userStore.fetchUser(parseInt(sessionStorage.getItem('userId') as string));
        }
        await fileStore.fetchFiles();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (fileStore.error) return <div>Error: {fileStore.error}</div>;
if(fileStore.files?.length === 0) return <Nofile/>;
  const groupedFiles = fileStore.files?.reduce((acc, file) => {
    const dateKey = new Date(file.createdAt).toLocaleDateString();
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(file);
    return acc;
  }, {} as Record<string, UserFile[]>);

  // פונקציה לשינוי מצב התפשטות של קובץ לפי תאריך
  const handleToggle = (date: string) => {
    setOpenFiles(prevState => ({
      ...prevState,
      [date]: !prevState[date]
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      {groupedFiles && Object.entries(groupedFiles).map(([date, files]) => {
        const isOpen = !openFiles[date] || false;
        return (
          <Box key={date} sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              onClick={() => handleToggle(date)}
              sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {isOpen ? <ExpandLess /> : <ExpandMore />} Uploaded on: {date}
            </Typography>
            <Collapse in={isOpen}>
              <Grid container spacing={2} mt={1}>
                {files.map(file => (
                  <Grid key={file.id}>
                    <FileCard file={file} filetype={file.fileType} />
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
});

export default FileList;
