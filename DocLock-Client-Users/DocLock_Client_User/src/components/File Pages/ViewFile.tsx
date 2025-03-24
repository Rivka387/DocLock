import { observer } from "mobx-react-lite";
import userStore from "../User pages/userStore";
import fileStore from "./FileStore";
import { useEffect, useState } from "react";
import { UserFile } from "../../types/UserFile";
import NoFileShare from "../Massages/NoFileShare";
import { Box, Collapse, Grid2 as Grid, Typography } from "@mui/material";
import FileCardShare from "./FileCardShare";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const  ViewFile= observer(() =>{

  const [openFiles, setOpenFiles] = useState<{ [key: string]: boolean }>({});

   useEffect(() => {
      const fetchData = async () => {
        try {
          if (!userStore.user.id && sessionStorage.getItem('userId')) {
            await userStore.fetchUser(parseInt(sessionStorage.getItem('userId') as string));
          }
          await fileStore.fetchFileShare();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

    
      if (fileStore.error) return <div>Error: {fileStore.error}</div>;
  if(fileStore.fileShare?.length === 0) return <NoFileShare/>;
  const groupedFiles = fileStore.fileShare?.reduce((acc, file) => {
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
                    <FileCardShare file={file} filetype={file.fileType} />
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
}
)

export default ViewFile;
