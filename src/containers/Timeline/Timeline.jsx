import { React, useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

import "./Timeline.css";
import Day1 from "../../components/days/day1";
import Day2 from "../../components/days/day2";
import Day3 from "../../components/days/day3";

function days() {}

const Timeline = function () {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const secret = sessionStorage.getItem("AM");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secret}`,
  };

  useEffect(() => {
    axios
      .get("https://apptitude2021.herokuapp.com/timeline", {
        headers,
      })
      .then((response) => {
        const timeline = response.data;
        setData1(timeline.data.day1);
        setData2(timeline.data.day2);
        setData3(timeline.data.day3);
      })
      .catch((error) => console.error(error.response.data));
  }, []);

  return (
    <div className="pt-16">
      <div className="text-white text-3xl font-700 text-3xl pl-8 pb-7">
        Timeline
      </div>
      <VerticalTimeline className="vertical-timeline-custom-line">
        {data1.map((info, key) => (
          <Day1
            key={key.id}
            name={info.name}
            starttime={info.startTime}
            endtime={info.endTime}
          />
        ))}
        {data1.map((info, key) => (
          <Day2
            key={key.id}
            name={info.name}
            starttime={info.startTime}
            endtime={info.endTime}
          />
        ))}
        {data3.map((info, key) => (
          <Day3
            key={key.id}
            name={info.name}
            starttime={info.startTime}
            endtime={info.endTime}
          />
        ))}
      </VerticalTimeline>
      <Navbar />
    </div>
  );
};

export default Timeline;
