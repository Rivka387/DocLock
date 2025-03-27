import { JSX, useState } from "react";
import { UserFile } from "../../types/UserFile";
import { IconButton, Menu, MenuItem, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { Description, InsertDriveFile, MoreVert, PictureAsPdf } from "@mui/icons-material";
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import mammoth from "mammoth";

const fileIcons: Record<string, JSX.Element> = {
  "application/pdf": <PictureAsPdf fontSize="large" color="error" />, 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Description fontSize="large" color="primary" />, 
  default: <InsertDriveFile fontSize="large" color="disabled" />,
};

const FileCardShare = ({ file, filetype }: { file: UserFile, filetype: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [originalBlob, setOriginalBlob] = useState<Blob | null>(null);

  const handleCloseViewer = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
    setFileContent(null);
  };

  const handleViewClick = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleFetchFile = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/UserFile/CheckingIsAllowedView/${email}`,
        { Id: file.id, password },
        { responseType: "blob" }
      );

      if (response.status !== 200) throw new Error("Failed to fetch file");

      const fileBlob = new Blob([response.data], { type: response.headers["content-type"] });
      const fileURL = URL.createObjectURL(fileBlob);

      setOriginalBlob(fileBlob);
      setFileUrl(fileURL);

      // אם זה DOCX, להמיר ל-HTML
      if (filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const arrayBuffer = await fileBlob.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setFileContent(result.value);
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: "center", position: "relative" }}>
        {fileIcons[filetype] || fileIcons.default}
        <Typography variant="subtitle1" fontWeight="bold" mt={1}>{file.name}</Typography>
        <IconButton sx={{ position: "absolute", top: 5, right: 5 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleViewClick}>👀 View</MenuItem>
        </Menu>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Email & Password</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth margin="dense" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleFetchFile} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {fileUrl && (
        <Dialog open={Boolean(fileUrl)} onClose={handleCloseViewer} fullWidth maxWidth="md">
          <DialogTitle>File Viewer</DialogTitle>
          <DialogContent>
            {filetype === "application/pdf" ? (
              <iframe src={fileUrl} width="100%" height="500px"></iframe>
            ) : filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              fileContent ? (
                <div dangerouslySetInnerHTML={{ __html: fileContent }} />
              ) : (
                <DocViewer documents={[{ uri: fileUrl }]} pluginRenderers={DocViewerRenderers} />
              )
            ) : (
              <Typography>File preview not supported, download instead.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewer}>Close</Button>
            <Button
              onClick={() => {
                if (originalBlob) {
                  const downloadUrl = URL.createObjectURL(originalBlob);
                  const link = document.createElement("a");
                  link.href = downloadUrl;
                  link.download = file.name;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
              variant="contained"
            >
              Download
            </Button>
            <Button onClick={() => window.print()} variant="outlined">Print</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default FileCardShare;
