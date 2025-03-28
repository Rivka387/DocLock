import React, { useRef, useState } from 'react';
import { Button, TextField, Box, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Typography, Card, CardContent } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import userStore from './userStore';
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';

const Register = observer(() => {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [inputCode, setInputCode] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const sendVerificationCode = (email: string) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        const subject = `Verify your email for DocLock ${code}`;
        const body = `Hello, ${nameRef.current?.value}. Your verification code for DocLock is ${code}. Please use it to complete your registration process.`;
        userStore.sendEmail(email, subject, body);
        console.log(`Verification code sent to ${email}: ${code}`);
        setIsDialogOpen(true);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (name && email && password) {
            if (!validateEmail(email)) {
                setAlertInfo({ severity: 'warning', message: 'Please enter a valid email address.' });
                return;
            }

            if (password.length < 6) {
                setAlertInfo({ severity: 'warning', message: 'Password is too weak. Please choose a stronger password.' });
                return;
            }

            sendVerificationCode(email);
            setAlertInfo({ severity: 'info', message: 'A verification code has been sent to your email.' });
        } else {
            setAlertInfo({ severity: 'warning', message: 'Please fill in all fields.' });
        }
    };

    const handleVerifyCode = async () => {
        if (inputCode === verificationCode) {
            const name = nameRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;

            const newUser: Partial<User> = { name, email, password, filesId: [], isActive: true };

            try {
                await userStore.registerUser(newUser, [Roles.User]);
                navigate('/');
                setAlertInfo({ severity: 'success', message: 'Successfully registered!' });
                setIsDialogOpen(false);
            } catch (error) {
                setAlertInfo({ severity: 'error', message: 'An unexpected error occurred. Please try again later.' });
                console.error('Register error:', error);
            }
        } else {
            setAlertInfo({ severity: 'error', message: 'Verification code is incorrect.' });
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: '#f4f6f8' }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#6fa8cb', fontWeight: 'bold' }}>
                        Register to DocLock
                    </Typography>
                    {alertInfo && (
                        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 2 }}>
                            {alertInfo.message}
                        </Alert>
                    )}
                    <form onSubmit={handleRegister}>
                        <TextField label="Name" inputRef={nameRef} fullWidth required sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#6fa8cb',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#70ab9f',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#74ad7d',
                                    },mb:2
                                },
                            }} />
                        <TextField label="Email" inputRef={emailRef} fullWidth required sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#6fa8cb',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#70ab9f',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#74ad7d',
                                    },mb:2
                                },
                            }} />
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            inputRef={passwordRef}
                            fullWidth
                            required
                           sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#6fa8cb',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#70ab9f',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#74ad7d',
                                    },
                                },
                                mb:2
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                bgcolor: '#70ab9f',
                                color: 'white',
                                '&:hover': { bgcolor: '#74ad7d' },
                                borderRadius: 2,
                                py: 1.5,
                                fontWeight: 'bold',
                            }}
                        >
                            Register
                        </Button>
                        <Button
                            fullWidth
                            component={Link}
                            to='/login'
                            sx={{ mt: 2, color: '#6fa8cb', textTransform: 'none' }}
                        >
                            Already have an account? Sign in
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Verify Your Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the verification code sent to your email.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Verification Code"
                        fullWidth
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleVerifyCode} color="primary">
                        Verify
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
});

export default Register;
