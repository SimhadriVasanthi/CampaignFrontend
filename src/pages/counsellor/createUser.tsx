import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import Images from '../../assets';
import { registerUser } from '../../services';
// import { addUserProfile } from '../../store/slices/userInfo';

const CreateUser = () => {
    const [loading, setLoading] = useState(false);
    const generatePassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]';
        const passwordLength = 12;
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    };

    const submit = async (values: any) => {
        setLoading(true)
        try {
            const response = await registerUser(values)
            setLoading(false)
            window.location.reload()
        } catch (err) {
            setLoading(false)
        }
    };

    const initialValues = {
        name: "",
        email: "",
        password: "",
        boothNumber: "",
        institutionName: "",
        role: "",
        userType: "",
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => submit(values)}
            >
                {({ isSubmitting, values, handleChange, setFieldValue, errors, touched }) => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Name *"
                                        name="name"
                                        type="text"
                                        size="small"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Email *"
                                        name="email"
                                        type="email"
                                        size="small"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Password *"
                                        name="password"
                                        type="text"
                                        size="small"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        sx={{ textTransform: 'none', fontSize: "12px", border: "1px solid #3b3f76", color: "#3b3f76", borderRadius: "15px" }}
                                        onClick={() => setFieldValue('password', generatePassword())}
                                    >
                                        Generate
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Institution Name *"
                                        name="institutionName"
                                        type="text"
                                        size="small"
                                        value={values.institutionName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Booth Number*"
                                        name="boothNumber"
                                        type="number"
                                        size="small"
                                        value={values.boothNumber}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        name={`userType`}
                                        value={values.userType}
                                        onChange={handleChange}
                                        size="small"
                                        defaultValue=''
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            Select user type *
                                        </MenuItem>
                                        {["Organizer", "Exhibitor"].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        name={`role`}
                                        value={values.role}
                                        onChange={handleChange}
                                        size="small"
                                        defaultValue=''
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            Select role *
                                        </MenuItem>
                                        {["Reception", "Counsellor", "Education_Loan", "Applications", "Scholarship", "Volunteer"].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                



                                <Grid item xs={12} sx={{ textAlign: "right" }}>
                                    <Button
                                        sx={[{
                                            color: "#fff",
                                            background: "#3B3F76",
                                            borderRadius: "15px",
                                            textTransform: "none",
                                            fontSize: "0.8rem",
                                            "&:hover": {
                                                background: "#3B3F76",
                                            },
                                        }]}
                                        type="submit"
                                    >
                                        {loading ? (
                                            <img
                                                src={Images.standardLoader}
                                                alt="Loading..."
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                            />
                                        ) : (
                                            "Save"
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default CreateUser;
