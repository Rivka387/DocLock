import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField, Card, CardContent, Typography, Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloudUpload, Description, Cancel } from "@mui/icons-material";
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
      }
    }
  };

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
      <Card sx={{
        maxWidth: 400, 
        margin: "auto", 
        padding: 3, 
        textAlign: "center", 
        border: "1px solid #c6d9e4", // צבע מסגרת עדין
        borderRadius: 2, 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // הצללה עדינה
        backgroundColor: "#fafafa"
      }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2, color: "#333" }}>
            File Upload
          </Typography>
          {!file ? (
            <Box
              sx={{
                border: `2px dashed ${dragOver ? "#6fa8cb" : "#74ad7d"}`,
                padding: 4,
                marginBottom: 2,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: dragOver ? "#e0f7fa" : "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f1f1f1", // רקע בהעברת עכבר
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CloudUpload sx={{ fontSize: 50, color: "#6fa8cb" }} />
              <Typography variant="body2" sx={{ color: "#666", marginTop: 1 }}>
                Drag and drop a file here
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 2 }}>
              <Description sx={{ fontSize: 50, color: "#6fa8cb", marginBottom: 1 }} />
              <Typography variant="body2" sx={{ marginBottom: 2, color: "#333" }}>
                File selected: {file.name}
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleCancel} 
                startIcon={<Cancel />} 
                sx={{ marginBottom: 2, textTransform: "none" }}
              >
                Cancel Selection
              </Button>
            </Box>
          )}
          <input type="file" onChange={handleFileChange} accept=".pdf,.docx" style={{ display: "none" }} id="file-input" />
          {!file && (
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#6fa8cb", 
                    color: "#fff", 
                  },
                  padding: "8px 24px", 
                  borderRadius: 2, 
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                Choose File
              </Button>
            </label>
          )}
          <TextField
            label="File Name"
            fullWidth
            margin="normal"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleUpload} 
            sx={{ marginTop: 2, textTransform: "none", padding: "10px 20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          >
            Upload
          </Button>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogSeverity === "success" ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default FileUpload;
