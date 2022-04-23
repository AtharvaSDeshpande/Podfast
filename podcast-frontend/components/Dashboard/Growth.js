import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import { Line } from 'react-chartjs-2';
import { useStateValue } from '../../redux/StateProvider';



function Growth() {
    const [{user,uploadedpodcasts},dispatch] = useStateValue();
    //views
    const [myLabels, setMyLabels] = useState([]);
    const [viewData, setViewData] = useState([])
    //likes
    // const [likesLabels, setLikesLabels] = useState([]);
    const [likesData, setLikesData] = useState([])
    const getData = () => {
        uploadedpodcasts.map(uploadedpodcast => {
            // alert("hello")
            setMyLabels(oldLabels => [...oldLabels,uploadedpodcast.title]);
            setViewData(oldData => [...oldData,uploadedpodcast.views.length])

            setLikesData(oldData => [...oldData,uploadedpodcast.likes.length])
        })
    }
    useEffect(()=>{
        setViewData([]);
        setLikesData([]);
        setMyLabels([]);
        getData();
    },[uploadedpodcasts])
    const state = {
        labels: myLabels,
        datasets: [
            {
                label: 'Views-analysis',
                fill: false,
                lineTension: 0.5,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 2,
                data: viewData,
            },
            {
              label: 'Likes-analysis',
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(80,192,192,1)',
              borderColor: 'rgb(57,255,20)',
              borderWidth: 2,
              data: likesData,
          },
        ]
    }
    return (
        <div
            className='bg-white'>

            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Number of Views per podcast',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    )
}

export default Growth;