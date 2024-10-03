import React, { useState, useRef, createRef, useEffect } from 'react'
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { AvatarLoader } from './Loader.jsx';
import { useScreenshot } from 'use-react-screenshot'




function App() {

  const corsProxy = "https://cors-anywhere.herokuapp.com/";
  const tweetRef = useRef(null)
  const dowloaddRef = useRef();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [tweet, setTweet] = useState("");
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [image, takeScreenshot] = useScreenshot()

  const getImage = () => takeScreenshot(tweetRef.current)


  const tweetFormat = (tweet) => {
    tweet = tweet
      .replace(/@([\w]+)/g, "<span>@$1</span>")
      .replace(/#([\wşçöüğı]+)/gi, "<span>#$1</span>")
      .replace(/(https?:\/\/[\w\.\/]+)/, "<span>$1</span>")
    return tweet;
  }

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.addEventListener("load", function () {
      setAvatar(this.result)
    })
    reader.readAsDataURL(file)
  }
  // const fetchTweetInfo = async () => {
  //   try {
  //     await fetch(`${corsProxy}https://api.twitter.com/2/users/by/username/${username}`, {
  //       header: {
  //         Authorization: `Bearer ${bearerToken}`,
  //         mode: 'no-cors'
  //       }
  //     })
  //       .then(result => result.json())
  //       .then(data => console.log(data))
  //   } catch (error) {
  //   }
  // }

  const formatNumber = number => {
    if (!number) {
      number = 0;
    }
    if (number < 1000) {
      return number;
    }
    number /= 1000;
    number = String(number).split(".")
    return number[0] + (number[1] > 100 ? "," + number[1].slice(0, 1) + "K" : "K");
  }

  useEffect(() => {
    if (image) {
      dowloaddRef.current.click()
    }
  }, [image])

  return (
    <>
      <div className='tweet-settings'>
        <h3>Tweet Settings</h3>
        <ul>
          <li>
            <label>Name</label>
            <input type="text" className='input' onChange={(e) => setName(e.target.value)} />
          </li>
          <li>
            <label>User Name</label>
            <input type="text" className='input' onChange={(e) => setUsername(e.target.value)} />
          </li>
          <li>
            <label>Tweet</label>
            <textarea maxLength="300" type="text" className='textarea' onChange={(e) => setTweet(e.target.value)} />
          </li>
          <li>
            <label>Retweet</label>
            <input type="number" className='input' onChange={(e) => setRetweets(e.target.value)} />
          </li>
          <li>
            <label>Quote Tweets</label>
            <input type="number" className='input' onChange={(e) => setQuoteTweets(e.target.value)} />
          </li>
          <li>
            <label>Likes</label>
            <input type="text" className='input' onChange={(e) => setLikes(e.target.value)} />
          </li>
          <li className='line avatar-li'>
            <label>Avatar</label>
            <button className='add-file' onClick={() => document.getElementById('fileInput').click()}>
              <input style={{display:"none"}} id='fileInput' type="file" className='input line-w ' onChange={avatarHandler} /> Add Profile Foto
            </button>
          </li>
          <li className='line'>
            <label htmlFor="">Verified</label>
            <input type="checkbox" className='input line-w check-box' onClick={(e) => setIsVerified(!isVerified)} />
          </li>
          <button onClick={getImage}>Create Fake Tweet</button>
          <div className="dowload-url">
            {image && (<a ref={dowloaddRef} href={image} download="tweet.png">Dowland Tweet</a>)}
          </div>
        </ul>
      </div>
      <div className="tweet-container">
        {/* <div className="fetch-info">
          <input placeholder='Enter Your userName' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button onClick={fetchTweetInfo}>Your Last Tweet</button>
        </div> */}
        <div className='tweet' ref={tweetRef}>
          <div className="tweet-author">
            {avatar && <img src={avatar} alt="" /> || <AvatarLoader />}
            <div>
              <div className="name">
                {name || "Your Name"}
                {isVerified && <MdVerified className='verifi' />}
              </div>
              <div className="username">
                @{username || "yourusername"}
              </div>
            </div>
          </div>
          <div className="tweet-content" >
            <p dangerouslySetInnerHTML={{ __html: (tweet && tweetFormat(tweet) || "fake tweet") }}></p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{retweets && formatNumber(retweets) || "0"}</b>Retweet
            </span>
            <span>
              <b>{quoteTweets && formatNumber(quoteTweets) || "0"}</b>Alıntı Tweetler
            </span>
            <span>
              <b>{likes && formatNumber(likes) || "0"}</b>Beğeni
            </span>
          </div>
          <div className="tweet-actions">
            <span><FiMessageCircle /></span>
            <span><AiOutlineRetweet /></span>
            <span><IoMdHeartEmpty /></span>
            <span><IoShareOutline /></span>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
