import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement,
} from 'chart.js';
import { Whatshot } from "@material-ui/icons";
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
import axios from 'axios';



function Growth() {

    //get trending tags
    const [tags,setTags] = useState([]);
    const getTrends = async() => {
    const res = await axios('../api/trends/getTrending', {
          method: "GET",
    
      })
        const temp = res.data.tags;//console.log(res.data.tags)
        setTags(res.data.tags);
        console.log(tags);
      }

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
        getTrends();
    },[uploadedpodcasts])
    const state = {
        labels: myLabels,
        datasets: [
            {
                label: 'Views-analysis',
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 2,
                data: viewData,
            },
            {
              label: 'Likes-analysis',
              fill: false,
              backgroundColor: 'rgba(80,192,192,1)',
              borderColor: 'rgb(57,255,20)',
              borderWidth: 2,
              data: likesData,
          },
        ]
    }
    return (
        <div
            >

            <Line
                data={state}
                options={{
                    aspectRatio:2.5,
                    layout: {
                        padding: {
                            left: 80,
                            right: 80,
                            top: 0,
                            bottom: 30
                        }
                    },
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 20
                        }
                    },            
                    scaleFontSize: 15,
                    plugins: {
                        title: {
                            display: true,
                            font: {
                                size: 20
                            },
                            text: 'Text/View Analyses of all your created podcast',
                            padding: {
                                top: 20,
                                bottom: 30
                            },
                            color:"rgb(255,165,0)"
                        }
                    },
                    responsive:true,
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div class="relative max-w-7xl mx-auto items-center">
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#aa0808] to-[yellow] rounded-lg blur opacity-18"></div>
            
                    <div class="relative px-7 py-6 bg-black ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <div className = "flex items-center">
                    <Whatshot className = "text-indigo-400 mr-1" ></Whatshot>
                    <div class="space-y-2">
                        <p class="text-slate-2000 text-indigo-400">Trending Tags this week</p>
                    </div>
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>

            <div className="grid grid-cols-4 gap-3 relative max-w-7xl mx-auto">
                {tags?.map((tag) => (
                <div className=" flex flex-wrap w-fit relative mx-2">
                    <div className="w-fit mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#7df4ff] to-[#e1e1ff] rounded-lg opacity-25 group-hover:opacity-100 group-hover:blur transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative px-7 py-6 bg-gradient-to-r from-[#5f2c82] to-[#49a09d] ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                                <div className="space-y-2">
                                    <p className="block text-[white] group-hover:text-[#d399f5] transition duration-200">{tag}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}   
            </div>
            <br></br>
            <br></br>
        </div>

    )
}

export default Growth;