import { Description, InsertDriveFile, MoreVert, PictureAsPdf } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { JSX, useState, useEffect } from "react";
import { UserFile } from "../../types/UserFile";
import FileStore from "./FileStore";
import axios from "axios";
import mammoth from "mammoth";
import DocViewer from "react-doc-viewer";
import { DocViewerRenderers } from 'react-doc-viewer';

const fileIcons: Record<string, JSX.Element> = {
  "application/pdf": <PictureAsPdf fontSize="large" color="error" />,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Description fontSize="large" color="primary" />,
  default: <InsertDriveFile fontSize="large" color="disabled" />,
};

const FileCard = ({ file, filetype }: { file: UserFile; filetype: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openShare, setOpenShare] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [email, setEmail] = useState("");
  const [newFileName, setNewFileName] = useState(file.name);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    FileStore.deleteFile(file.id);
    setOpenDelete(false);
  };

  const handleShare = async () => {
    FileStore.shareFile(file, email);
    setOpenShare(false);
  };

  const handleEdit = async () => {
    FileStore.editFile(file.id, newFileName);
    setOpenEdit(false);
  };

  const handleViewClick = async () => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.post(
        `http://localhost:3000/api/UserFile/GetFile/${file.id}`,
        { responseType: "blob" }
      );

      if (response.status === 200) {
        const fileBlob = new Blob([response.data], { type: response.headers["content-type"] });
        const fileURL = URL.createObjectURL(fileBlob);

        setFileUrl(fileURL);

        if (filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          const arrayBuffer = await fileBlob.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setFileContent(result.value);
        }
      }
    } catch (error) {
      setError("Error fetching file");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (openView && !fileUrl && !fileContent) {
      handleViewClick(); // Trigger file loading when dialog is opened
    }
  }, [openView]);

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
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => { setOpenShare(true); setAnchorEl(null); }}>🔗 Share</MenuItem>
          <MenuItem onClick={() => { setOpenEdit(true); setAnchorEl(null); }}>✏️ Edit</MenuItem>
          <MenuItem onClick={() => { setOpenDelete(true); setAnchorEl(null); }}>🗑️ Delete</MenuItem>
          <MenuItem onClick={() => { setOpenView(true); setAnchorEl(null); handleViewClick(); }}>👀 View</MenuItem>
        </Menu>
      </Paper>

      {/* Share Dialog */}
      <Dialog open={openShare} onClose={() => setOpenShare(false)}>
        <DialogTitle> Share File</DialogTitle>
        <DialogContent>
          <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShare(false)}>Cancel</Button>
          <Button onClick={handleShare} color="primary">Share</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {file.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit File Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle> Edit File</DialogTitle>
        <DialogContent>
          <TextField label="New File Name" fullWidth value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEdit} color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* File Viewer Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth maxWidth="md">
        <DialogTitle>File Viewer</DialogTitle>
        <DialogContent>
          {isLoading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {filetype === "application/pdf" && fileUrl && !isLoading ? (
            <iframe src={fileUrl} width="100%" height="500px" title="PDF Viewer"></iframe>
          ) : filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
            fileContent ? (
              <div dangerouslySetInnerHTML={{ __html: fileContent }} />
            ) : (
              !isLoading && <DocViewer documents={[{ uri: fileUrl || "" }]} pluginRenderers={DocViewerRenderers} />
            )
          ) : (
            !isLoading && <Typography> File preview not supported, please download the file to view it. </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
          <Button onClick={() => window.print()} variant="outlined">Print</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileCard;
