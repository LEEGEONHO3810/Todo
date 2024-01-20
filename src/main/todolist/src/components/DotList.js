import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../style.css';
import axios from 'axios';

export const DotList = ({ activeStartDate, date }) => {

    const [dotList, setDotList] = useState([]); // dotList 초기화
    const dateYM = moment(activeStartDate).format("YYYY-MM");
    useEffect(() => {
        const fetchData = async () => {
            try {
                // axios 호출 시, params 객체를 사용
                const response = await axios.get('api/DotList', {
                    params: { date: dateYM }
                });
                setDotList(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [dateYM]);

    const formattedDate = moment(date).format("YYYY-MM-DD");
    return (
        <>
            {dotList.map((day, index) => {
                console.log(moment(formattedDate).isSame(day, "day"));
                console.log("formattedDate : " + formattedDate);
                console.log(day);
                if (day == formattedDate) {
                    // 객체의 date 속성과 formattedDate를 비교
                    return <div key={index} className="dot"></div>;
                }
                return null;
            })}
        </>
    );
};

export default DotList;
