import { Description, InsertDriveFile, MoreVert, PictureAsPdf } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { JSX, useState } from "react";
import { UserFile } from "../types/UserFile";

const fileIcons: Record<string, JSX.Element> = {
    "application/pdf": <PictureAsPdf fontSize="large" color="error" />, 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Description fontSize="large" color="primary" />, 
  default: <InsertDriveFile fontSize="large" color="disabled" />,
};


const FileCard = ({ file,filetype }: { file: UserFile,filetype: string }) => {
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
        <MenuItem onClick={() => console.log("Share", file)}>🔗 Share</MenuItem>
        <MenuItem onClick={() => console.log("Edit", file)}>✏️ Edit</MenuItem>
        <MenuItem onClick={() => console.log("Delete", file)}>🗑️ Delete</MenuItem>
      </Menu>
    </Paper>
    </>
  );
};
export default FileCard;