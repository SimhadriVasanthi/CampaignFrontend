import { Typography } from '@mui/material';
import React, { useState } from 'react';

const Education = (data: any) => {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography>Recent degree details</Typography>

        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>{data?.data?.degree}</Typography>
        <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}> {data?.data?.college}</Typography>
        <Typography fontWeight="500" sx={{ fontSize: "0.9rem" }}>{data?.data?.graduation}</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>{data?.data?.gradepercentage}</Typography>

    </div>;
};

const Abroad = (data: any) => {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography>Preferences</Typography>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>{data?.data?.course}</Typography>
        <Typography sx={{ fontSize: "1rem" }}>Countries <b>{data?.data?.country?.map((item:string)=>item+" ")}</b></Typography>
        <Typography fontWeight="500" sx={{ fontSize: "0.9rem" }}>Plan to start <b>{data?.data?.year}</b> </Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>Budget <b>{data?.data?.educationBudget}</b></Typography>

    </div>;
};

const Exams = (data: any) => {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ fontSize: "1.1rem", fontWeight: "600",mb:1 }}>Aptitute test :{data?.data?.aptitude}</Typography>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
            <Typography sx={{ fontSize: "0.85rem", }}>Gre: <b>{data?.data?.gre ? data?.data?.gre : "N/A"}</b></Typography>
            <Typography sx={{ fontSize: "0.85rem", }}>Gmat: <b>{data?.data?.gmat ? data?.data?.gmat : "N/A"}</b></Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
            <Typography sx={{ fontSize: "0.85rem", }}>ACT: <b>{data?.data?.act ? data?.data?.act : "N/A"}</b></Typography>
            <Typography sx={{ fontSize: "0.85rem", }}>SAT: <b>{data?.data?.sat ? data?.data?.sat : "N/A"}</b></Typography>
        </div>
        <Typography sx={{ fontSize: "1.1rem", fontWeight: "600",mb:1 }}>Language test :{data?.data?.language}</Typography>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
            <Typography sx={{ fontSize: "0.85rem", }}>TOEFL: <b>{data?.data?.toefl ? data?.data?.toefl : "N/A"}</b></Typography>
            <Typography sx={{ fontSize: "0.85rem", }}>IELTS: <b>{data?.data?.ielts ? data?.data?.ielts : "N/A"}</b></Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
            <Typography sx={{ fontSize: "0.85rem", }}>PTE: <b>{data?.data?.pte ? data?.data?.pte : "N/A"}</b></Typography>
            <Typography sx={{ fontSize: "0.85rem", }}>Duolingo: <b>{data?.data?.duolingo
                ? data?.data?.duolingo
                : "N/A"}</b></Typography>
        </div>


    </div>;
};

const Section2 = (data: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const components = [<Education data={data.data} />, <Abroad data={data.data} />, <Exams data={data.data} />];

    return (
        <div>
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
        </div>
    );
};

export default Section2;
