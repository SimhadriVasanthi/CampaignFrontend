import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import Images from '../../assets';
import { visitAdd } from '../../services';
import { useAppDispatch} from '../../assets/hooks';
import { updateStudentProfile } from '../../store/slices/studentsInfo';
import { closePopup } from '../../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';

const SingleUser = (props: any) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues = {
        visitorId: props.id,
        details: [
            {
                label: "eligible",
                data: props.data?.details?.[0]?.data
            },
            {
                label: "interested",
                data: props.data?.details?.[1]?.data
            }
        ],
        notes: props?.data?.notes || "",
    };

    const submit = async (values: any) => {
        setLoading(true)
        try {
            const response = await visitAdd(values);
            if (response) {
                dispatch(
                    updateStudentProfile({
                        ...response.data.data.user,         
                        details: response.data.data.visit.details, 
                        notes: response.data.data.visit.notes,      
                    })
                );
                setLoading(false)
                navigate("/")
                window.location.reload()
            }
        } catch (err) {
            setLoading(false)
            navigate("/")
        }
        dispatch(closePopup())
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => submit(values)}
            >
                {({ values, handleChange, setFieldValue }) => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" size="small">
                                        <InputLabel id="eligibility-label">Eligibility *</InputLabel>
                                        <Select
                                            labelId="eligibility-label"     // ID matches InputLabel
                                            label="Eligibility"             // Displays "Eligibility" label
                                            name={`details[0].data`}
                                            value={values.details?.[0]?.data}
                                            onChange={(e) => setFieldValue('details[0].data', e.target.value)}
                                            displayEmpty
                                        >
                                            {["yes", "no"].map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" size="small">
                                        <InputLabel id="interested-label">Interested *</InputLabel>
                                        <Select
                                            labelId="interested-label" 
                                            label="Interested"          
                                            name={`details[1].data`}
                                            value={values.details?.[1]?.data}
                                            onChange={(e) => setFieldValue('details[1].data', e.target.value)}
                                            displayEmpty
                                        >
                                            {["yes", "no"].map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Notes *"
                                        name="notes"
                                        type="text"
                                        label="Notes"
                                        size="small"
                                        multiline
                                        rows={3}
                                        value={values.notes}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ textAlign: "right" }}>
                                    <Button type="submit" sx={{
                                        color: "#fff",
                                        background: "#3B3F76",
                                        borderRadius: "15px",
                                        textTransform: "none",
                                        fontSize: "0.8rem",
                                        "&:hover": {
                                            background: "#3B3F76",
                                        },
                                    }}>
                                        {loading ? (
                                            <Box
                                                component="img"
                                                src={Images.standardLoader}
                                                alt="standardLoader"
                                                sx={{ width: "1rem", height: "1rem" }}
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

export default SingleUser;
