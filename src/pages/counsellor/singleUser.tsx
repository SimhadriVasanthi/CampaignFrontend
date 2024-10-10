import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Images from '../../assets';
import { visitAdd } from '../../services';
import { useAppDispatch } from '../../assets/hooks';
import { closePopup } from '../../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';
import { setWordCase } from '../../assets/library';

const SingleUser = (props: any) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userType = localStorage.getItem("userType")
    const details = userType !== "Organizer" ? ["eligible", "interested"] : ["interested", "prospective"]
    const initialValues = {
        visitorId: props.id,
        details: {
            [details[0]]: props?.data?.details?.[details[0]] || "",
            [details[1]]: props?.data?.details?.[details[1]] || "",
        },
        notes: props?.data?.notes || "",
    };

    const submit = async (values: any) => {
        setLoading(true)
        try {
            const response = await visitAdd(values);
            if (response) {
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
    useEffect(() => {
        if (props.id) {
            visitAdd(initialValues)
        }
         // eslint-disable-next-line
    }, [])

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
                                        <InputLabel id="eligibility-label">{setWordCase(details[0])}*</InputLabel>
                                        <Select
                                            label={details[0]}
                                            name={`details.${details[0]}`}
                                            value={values?.details?.[details[0]]}
                                            onChange={(e) => setFieldValue(`details.${details[0]}`, e.target.value)}
                                        // displayEmpty
                                        // defaultValue=''
                                        >
                                            {["Yes", "No", "May be"].map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" size="small">
                                        <InputLabel id="interested-label">{setWordCase(details[1])} *</InputLabel>
                                        <Select
                                            // labelId="interested-label"
                                            label={details[1]}
                                            name={`details.${details[1]}`}
                                            value={values?.details?.[details[1]]}
                                            onChange={(e) => setFieldValue(`details.${details[1]}`, e.target.value)}
                                        // displayEmpty
                                        >
                                            {["Yes", "No", "May be"].map((value) => (
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
