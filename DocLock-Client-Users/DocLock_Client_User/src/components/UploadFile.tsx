import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField, Card, CardContent, Typography, Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloudUpload, Description, Cancel, Close } from "@mui/icons-material";
import fileStore from "./FileStore";

const FileUpload = observer(() => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [password, setPassword] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState<"success" | "error">("error");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type !== "application/pdf" && selectedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setDialogMessage("Invalid file type. Please upload a PDF or DOCX file.");
        setDialogSeverity("error");
        setOpenDialog(true);
        setFile(null);
        setFileName("");
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      }} };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile.type !== "application/pdf" && droppedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setDialogMessage("Invalid file type. Please upload a PDF or DOCX file.");
        setDialogSeverity("error");
        setOpenDialog(true);
        setFile(null);
        setFileName("");
      } else {
        setFile(droppedFile);
        setFileName(droppedFile.name);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !fileName || !password) {
      setDialogMessage("Please fill out all fields");
      setDialogSeverity("error");
      setOpenDialog(true);
      return;
    }
    await fileStore.uploadFile(file, fileName, password, file.type);
  };

  const handleCancel = () => {
    setFile(null);
    setFileName("");
    setPassword("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
    <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          File Upload
        </Typography>
        {!file ? (
          <Box
            sx={{ border: `2px dashed ${dragOver ? "blue" : "gray"}`, padding: 4, marginBottom: 2, textAlign: "center", cursor: "pointer", backgroundColor: dragOver ? "#f0f0f0" : "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudUpload sx={{ fontSize: 50, color: "gray" }} />
            <Typography>Drag and drop a file here</Typography>
          </Box> ) 
          : (<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 2 }}>
            {file?.type === "application/pdf" ? (
              <Description sx={{ fontSize: 50, color: "gray", marginBottom: 1 }} /> ) 
              : ( <Description sx={{ fontSize: 50, color: "gray", marginBottom: 1 }} /> )}
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              File selected: {file.name} </Typography>
           
            <Button variant="outlined" color="error" onClick={handleCancel} startIcon={<Cancel />} sx={{ marginBottom: 2 }}>
              Cancel Selection </Button>
          </Box>
        )}
        <input type="file" onChange={handleFileChange} accept=".pdf,.docx" style={{ display: "none" }} id="file-input" />
        {!file && (
          <label htmlFor="file-input"> <Button variant="outlined" component="span"> Choose File</Button> </label>
 )}
        <TextField label="File Name" fullWidth  margin="normal" value={fileName}  onChange={(e) => setFileName(e.target.value)}  />

        <TextField label="Password" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        
        <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginTop: 2 }}>  Upload</Button>
      </CardContent>
    </Card>

    <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ maxWidth: "80%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: dialogSeverity === "error" ? "red" : "green" }}>
          {dialogSeverity === "error" ? "Error" : "Success"}
        </Typography>
        <IconButton onClick={handleCloseDialog} edge="end" color="inherit"><Close /></IconButton>
        </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: dialogSeverity === "error" ? "red" : "green" }}>
          {dialogMessage}
        </Typography>
      </DialogContent>
    </Dialog>
    </>
  );
});

export default FileUpload;
