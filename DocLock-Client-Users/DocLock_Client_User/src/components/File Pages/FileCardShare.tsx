import { JSX, useState } from "react";
import { UserFile } from "../../types/UserFile";
import { IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { Description, InsertDriveFile, MoreVert, PictureAsPdf } from "@mui/icons-material";


const fileIcons: Record<string, JSX.Element> = {
    "application/pdf": <PictureAsPdf fontSize="large" color="error" />, 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Description fontSize="large" color="primary" />, 
  default: <InsertDriveFile fontSize="large" color="disabled" />,
};

const FileCardShare = ({ file,filetype }: { file: UserFile,filetype: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    console.log(filetype); 
    return (
      <>
      <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: "center", position: "relative" }}>
        {fileIcons[filetype] || fileIcons.default}
        <Typography variant="subtitle1" fontWeight="bold" mt={1}>{file.name}</Typography>
        <IconButton 
          sx={{ position: "absolute", top: 5, right: 5 }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => console.log("View", file)}> 👀 View</MenuItem>
       
        </Menu>
      </Paper>
      </>
    );
  };
  export default FileCardShare;