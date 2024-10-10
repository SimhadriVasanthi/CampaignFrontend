import { Typography } from '@mui/material';
import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Education = (data: any) => {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "1rem" }}>
        <Typography fontWeight="500">Education Details</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>Degree : <b style={{ fontWeight: "500" }}>{data?.data?.degree}</b></Typography>
        <Typography sx={{ fontSize: "0.9rem" }}> College : <b style={{ fontWeight: "500" }}>{data?.data?.college}</b></Typography>
        {data?.data?.graduation ? <Typography sx={{ fontSize: "0.9rem" }}>Graduation : <b style={{ fontWeight: "500" }}>{data?.data?.graduation}</b></Typography> : ""}
        <Typography sx={{ fontSize: "0.9rem" }}>Grade : <b style={{ fontWeight: "500" }}>{data?.data?.gradepercentage}</b></Typography>
    </div>
};

const Abroad = (data: any) => {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "1rem" }}>
        <Typography fontWeight="500">Preferences</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>Course : <b style={{ fontWeight: "500" }}>{data?.data?.course}</b></Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>Countries : <b style={{ fontWeight: "500" }}>{data?.data?.country?.map((item: string) => <button style={{ marginRight: "0.5rem", border: "none", background: "rgb(218 218 233)", borderRadius: "5px", padding: "4px" }}>{item}</button>)}</b></Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>Plan to Start : <b style={{ fontWeight: "500" }}>{data?.data?.year}</b> </Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>Budget : <b style={{ fontWeight: "500" }}>{data?.data?.educationBudget}</b></Typography>

    </div>;
};

const Exams = (data: any) => {
    return <div style={{ display: "flex", flexDirection: "column", marginLeft: "1rem" }}>
        <Typography fontWeight="500">Test Scores</Typography>
        {data?.data?.aptitude && <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>Aptitute Test :<b style={{ fontWeight: "500" }}>{data?.data?.aptitude}</b></Typography>}
        <div style={{ display: "flex", gap: "2rem" }}>
            {data?.data?.gre && <Typography sx={{ fontSize: "0.85rem", }}>GRE: <b style={{ fontWeight: "500" }}>{data?.data?.gre}</b></Typography>}
            {data?.data?.gmat && <Typography sx={{ fontSize: "0.85rem", }}>GMAT: <b style={{ fontWeight: "500" }}>{data?.data?.gmat}</b></Typography>}
            {data?.data?.act && <Typography sx={{ fontSize: "0.85rem", }}>ACT: <b style={{ fontWeight: "500" }}>{data?.data?.act}</b></Typography>}
            {data?.data?.sat && <Typography sx={{ fontSize: "0.85rem", }}>SAT: <b style={{ fontWeight: "500" }}>{data?.data?.sat}</b></Typography>}
        </div>
        {data?.data?.language && <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>Language Test :<b style={{ fontWeight: "500" }}>{data?.data?.language}</b></Typography>}
        <div style={{ display: "flex", gap: "2rem" }}>
            {data?.data?.toefl && <Typography sx={{ fontSize: "0.85rem", }}>TOEFL: <b style={{ fontWeight: "500" }}>{data?.data?.toefl}</b></Typography>}
            {data?.data?.ielts && <Typography sx={{ fontSize: "0.85rem", }}>IELTS: <b>{data?.data?.ielts}</b></Typography>}
            {data?.data?.pte && <Typography sx={{ fontSize: "0.85rem", }}>PTE: <b style={{ fontWeight: "500" }}>{data?.data?.pte}</b></Typography>}
            {data?.data?.duolingo && <Typography sx={{ fontSize: "0.85rem", }}>Duolingo: <b style={{ fontWeight: "500" }}>{data?.data?.duolingo}</b></Typography>}
        </div>


    </div>;
};
const Section2 = (data: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const components = [
        <Education data={data.data} />,
        <Abroad data={data.data} />,
        <Exams data={data.data} />,
    ];



    const goToNext = () => {
        if (activeIndex < components.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    return (
        <div
            style={{ position: 'relative', touchAction: 'pan-y' }}
        >
            <div>{components[activeIndex]}</div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {components.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            height: '10px',
                            width: '10px',
                            margin: '0 5px',
                            backgroundColor: activeIndex === index ? '#333' : '#ddd',
                            borderRadius: '50%',
                            display: 'inline-block',
                            cursor: 'pointer',
                        }}
                    ></span>
                ))}
            </div>

            {activeIndex > 0 && (
                <button
                    onClick={goToPrevious}
                    style={{
                        position: 'absolute',
                        left: '-22px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <ChevronLeftIcon />
                </button>
            )}

            {activeIndex < components.length - 1 && (
                <button
                    onClick={goToNext}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        // fontSize: '24px',
                    }}
                >
                    <ChevronRightIcon />
                </button>
            )}
        </div>
    );
};



export default Section2;
