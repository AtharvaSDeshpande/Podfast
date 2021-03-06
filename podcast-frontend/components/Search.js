import { DialogContentText, Divider, Tabs, Tab } from '@material-ui/core'
import { Close, SearchSharp } from '@material-ui/icons'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { actionTypes } from '../redux/reducer';
import { useStateValue } from '../redux/StateProvider';
import Creator from './Creator';
import Post from './Post';

function Search({ }) {
  const [{ user, recommendedpodcasts,searchedpodcasts,searchedontagspodcasts }, dispatch] = useStateValue()
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (search != "") {
      setSearchResult(true);
      getSearchPodcasts();

    }
  }
  const resetSearch = () => {
    setSearchResult(false);
    setSearch("");
  }
  const [value, setValue] = useState(0);

  // const [searchPodcasts, setSearchPodcasts] = useState([]);
  const [searchAuthors, setSearchAuthors] = useState([]);
  // const [searchOnTagsPodcasts, setSearchOnTagsPodcasts] = useState([]);

  const getSearchPodcasts = async () => {
    try {

      const res = await axios('../api/podcast/search', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { title: search.toLowerCase() }

      })
      const podcasts = res.data.data;
      console.log(podcasts)
      dispatch({
        type: actionTypes.SET_SEARCHPODCASTS,
        searchedpodcasts: podcasts
      })
      

      const userres = await axios('../api/user/search', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { title: search.toLowerCase() }

      })
      const users = userres.data.data;
      console.log(users)
      setSearchAuthors(users)

      const tagsres = await axios('../api/podcast/searchOnTags', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { title: search.toLowerCase()  }

      })
      const podcastsOnTags = tagsres.data.data;
      console.log(podcastsOnTags)
      dispatch({
        type: actionTypes.SET_SEARCHONTAGSPODCASTS,
        searchedontagspodcasts: podcastsOnTags
      })
     


    } 
    catch (error) {
      console.log(error)
    }

  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [recommIds,setRecommIds] = useState();
  useEffect(async () => {
    let url = 'http://localhost:8000/' + user?._id;
    const djangores = await axios.get(url)
    console.log(djangores.data)
    const ids = djangores.data.map(pod => {
      return pod.id
    })
    console.log(ids)
    setRecommIds(ids);
    const res = await axios("../api/podcast/getRecomendedPodcasts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { ids: ids }
    })
    console.log(res.data.data)
    dispatch({
      type: actionTypes.SET_RECOMMENDEPODCASTS,
      recommendedpodcasts: res.data.data
    })
  }, [])

  return (
    <div className='md:mx-auto grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl  py-3 mx-2'>
      <form className='flex col-span-2 '>
        <input type='search'
          className='form-control relative flex min-w-0 h-10  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-full'
          placeholder='Search Podcasts or Artists'
          onChange={(e) => {
            // console.log(e.target.value);
            if (e.target.value == "")
              setSearchResult(false);
            setSearch(e.target.value)
            setValue(0)
          }}
          value={search} />
        <button onClick={handleSearch} type="submit">
          <SearchSharp className='h-10 w-10 p-2 cursor-pointer  text-white bg-blue-600 hover:bg-blue-799 focus:bg-blue-700 active:bg-blue-800' />

        </button>

      </form>
      <hr className='col-span-2 bg-[gray] mt-5' />
      {searchResult ? <div className="mt-5 col-span-2 items-center">
        <div className='flex justify-between'>
          <p className='text-white'>Search Results</p>
          <Close className='text-white text-sm cursor-pointer' onClick={resetSearch} />

        </div>
        <div className='flex justify-center'>
          <Tabs
            value={value}
            onChange={handleChange}

            indicatorColor="primary"
            textColor="secondary"
            aria-label="icon label tabs example"

          >
            <Tab label="Podcasts" className='text-white' />
            <Tab className='text-white' label="Creators" />
            <Tab className='text-white' label="Tags" />

          </Tabs>
        </div>
        {value == 0 ? <div>
          {searchedpodcasts.length == 0 ? (<>
            <p className='text-neutral-300'>No Results Found</p>

          </>) : (<>
            {searchedpodcasts.map(podcast => (
              <Post 
                choice = "searched"
                id={podcast._id} 
                img={podcast.img} 
                username={podcast.creatorID.email.split("@")[0]} 
                name={podcast.creatorID.name} 
                caption={podcast?.description} 
                link={podcast.url} 
                summlink={podcast.summaryUrl} 
                title={podcast.title} 
                creators={podcast.creatorNames.join(", ")} 
                likes={podcast.likes} 
                views={podcast.views}
                categories={podcast?.categories} 
                creatorID = {podcast?.creatorID._id}
                otherData = {search}/>

            ))}</>)}
        </div> : value == 1 ? (<div>

          {searchAuthors.map(creator => (
            <Creator id={creator._id} name={creator.name} email={creator.email} color={creator?.color} />
          ))}

        </div>) : (
          <div>
            {searchedontagspodcasts.length == 0 ? (<>
              <p className='text-neutral-300'>No Results Found</p>

            </>) : (<>
              {searchedontagspodcasts.map(podcast => (
                <Post
                  choice = "searchedOnTags" 
                  id={podcast._id} 
                  img={podcast.img} 
                  username={podcast.creatorID.email.split("@")[0]} 
                  name={podcast.creatorID.name} 
                  caption={podcast?.description} 
                  link={podcast.url} 
                  summlink={podcast.summaryUrl} 
                  title={podcast.title} 
                  creators={podcast.creatorNames.join(", ")}
                  likes={podcast.likes} 
                  views={podcast.views}
                  categories = {podcast?.categories} 
                  creatorID = {podcast?.creatorID._id}
                  otherData={search}/>

              ))}</>)}
          </div>

        )}
      </div> : <div className='mt-5 col-span-2'>
        <p className='text-white '>Recommendations for you</p>
        {/* {recommendedPodcast.map(podcast => (
          <Post id={podcast.uuid} img={podcast.image} username={"ana"} name={podcast.author} caption={podcast.description_x} link={podcast.audio} summlink={null} title={podcast.title_x} creators={"mul creators"} />

        ))} */}
        {recommendedpodcasts.map(podcast => (
          <Post 
            choice = "recommended"
            id={podcast._id} 
            img={podcast.img} 
            username={podcast.creatorID.email.split("@")[0]} 
            name={podcast.creatorID.name} 
            caption={podcast?.description} 
            link={podcast.url} 
            summlink={podcast.summaryUrl} 
            title={podcast.title} 
            creators={podcast.creatorNames.join(", ")}
            likes={podcast.likes} 
            views={podcast.views} 
            categories={podcast?.categories} 
            creatorID = {podcast?.creatorID._id}
            otherData= {recommIds}/>

        ))}
      </div>}
    </div>
  )
}

export default Search