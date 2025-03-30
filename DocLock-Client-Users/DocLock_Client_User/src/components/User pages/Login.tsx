import React, { useRef, useState } from 'react';
import { Button, TextField, Grid, Box, Alert, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import userStore from './userStore';
import { Roles } from '../../types/Roles';
import { observer } from 'mobx-react-lite';

const Login = observer(() => {

    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePasswordStrength = (password: string) => {
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Moderate';
        return 'Strong';
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (email && password) {
            if (!validateEmail(email)) {
                setAlertInfo({ severity: 'warning', message: 'Please enter a valid email address.' });
                return;
            }

            const passwordStrength = validatePasswordStrength(password);
            if (passwordStrength === 'Weak') {
                setAlertInfo({ severity: 'warning', message: 'Password is too weak. Please choose a stronger password.' });
                return;
            }

            try {
                userStore.loginUser(email, password, [Roles.User]).then(() => {
                    console.log(userStore.user.id, userStore.token);
                    navigate('/');
                });

                setAlertInfo({ severity: 'success', message: 'Successfully logged in!' });
            } catch (error) {
                setAlertInfo({ severity: 'error', message: 'Failed to login. Please check your credentials and try again.' });
                console.error('Login error:', error);
            }
        } else {
            setAlertInfo({ severity: 'warning', message: 'Please fill in all fields.' });
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, borderRadius: '8px', boxShadow: 2, backgroundColor: '#fff' }}>
            {alertInfo && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 2 }}>
                    {alertInfo.message}
                </Alert>
            )}
            <form onSubmit={handleLogin}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            inputRef={emailRef}
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
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
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
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                backgroundColor: '#6fa8cb',
                                '&:hover': {
                                    backgroundColor: '#70ab9f',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Button
                type="button"
                component={Link}
                to="/register"
                sx={{
                    mt: 2,
                    textAlign: 'center',
                    color: '#70ab9f',
                    '&:hover': {
                        color: '#6fa8cb',
                    },
                }}
            >
                Don’t have an account? Sign up
            </Button>
            
        </Box>
    );
});

export default Login;
