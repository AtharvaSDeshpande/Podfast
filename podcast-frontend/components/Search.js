import { DialogContentText, Divider, Tabs, Tab } from '@material-ui/core'
import { Close, SearchSharp } from '@material-ui/icons'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Post from './Post';

function Search() {
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

  const [searchPodcasts, setSearchPodcasts] = useState([]);
  const [searchAuthors, setSearchAuthors] = useState([]);
  const [recommendedPodcasts, setRecommendedPodcasts] = useState([]);

  const getSearchPodcasts = async () => {
    try {

      const res = await axios('../api/search', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { title: search  }

      })
      const podcasts = res.data.data;
      console.log(podcasts)
      setSearchPodcasts(podcasts)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const getRecommended = async () => {

    try {

      const res = await axios('../api/podcast/podcasts', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },


      })
      const podcasts = res.data.data;
      setRecommendedPodcasts(podcasts)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getRecommended();
  }, [])
  const l = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ut vero aspernatur cumque ipsa quam culpa ipsum sunt magni beatae totam sint cum labore ea, quis pariatur? Eum, porro harum?"

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

          </Tabs>
        </div>
        {value == 0 ? <div>
          {searchPodcasts.length == 0?(<>
          <p className='text-neutral-300'>No Results Found</p>
            
          </>):(<>
          {searchPodcasts.map(podcast => (
            <Post id={podcast._id} img={podcast.img} username={podcast.creatorID.email.split("@")[0]} name={podcast.creatorID.name} caption={l} link={podcast.url} summlink={podcast.summaryUrl} title={podcast.title} creators={podcast.creatorNames.join(", ")} />

          ))}</>)}
        </div> : <div>
        

        </div>}
      </div> : <div className='mt-5 col-span-2'>
        <p className='text-white '>Recommendations for you</p>
        {recommendedPodcasts.map(podcast => (
          <Post id={podcast._id} img={podcast.img} username={podcast.creatorID.email.split("@")[0]} name={podcast.creatorID.name} caption={l} link={podcast.url} summlink={podcast.summaryUrl} title={podcast.title} creators={podcast.creatorNames.join(", ")} />

        ))}
      </div>}
    </div>
  )
}

export default Search