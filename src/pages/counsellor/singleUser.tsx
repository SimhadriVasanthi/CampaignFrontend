import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import Images from '../../assets';
import { visitAdd } from '../../services';
import { useAppDispatch, useAppSelector } from '../../assets/hooks';
import { addStudentProfile, updateStudentProfile } from '../../store/slices/studentsInfo';
import { closePopup } from '../../store/slices/popupSlice';
import { setWordCase } from '../../assets/library';

const SingleUser = (props: any) => {
    const [loading, setLoading] = useState(false);
    const students = useAppSelector(store => store.studentInfo)
    const dispatch = useAppDispatch();
    const initialValues = {
        visitorId: props.id,
        details: props?.data?.details.map((detail: any) => ({
            label: detail.label,
            data: detail.data || "",
        })),
        notes: props?.data?.notes || "",
    };

    const submit = async (values: any) => {
        setLoading(true)
        try {
            const response = await visitAdd(values);
            if (response) {
                const newParticipant = response.data.data;
                const existingParticipant = students?.data?.find((student) => student._id === newParticipant._id);
                if (existingParticipant) {
                    dispatch(updateStudentProfile(newParticipant));
                } else {
                    dispatch(addStudentProfile(newParticipant))
                }
                setLoading(false)
            }
        } catch (err) {
            // console.log(err)
            setLoading(false)

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
                                        <InputLabel id="eligibility-label">{setWordCase(values.details?.[0]?.label)} *</InputLabel>
                                        <Select
                                            labelId="eligibility-label"
                                            label="details[0].label*"
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
                                        <InputLabel id="eligibility-label">{setWordCase(values.details?.[1]?.label)} *</InputLabel>
                                        <Select
                                            labelId="eligibility-label"
                                            label="details[1].label*"
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
