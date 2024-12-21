import { useEffect, useState } from "react";
import Navbar from "../componants/Navbar";
import { toast } from "react-toastify";
import p1 from '../assets/p1.svg'
import p2 from '../assets/p2.svg'
import p3 from '../assets/p3.svg'
import p4 from '../assets/p4.svg'
import p5 from '../assets/p5.svg'
import p6 from '../assets/p6.svg'
import p7 from '../assets/p7.svg'
import play from '../assets/play.svg'
import add from '../assets/add.svg'

const Home = ({isLoggedIn, setIsLoggedIn, user, isAdmin, token}) => {
    
    const [playlists, setPlaylists] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [songs, setSongs] = useState([]);
    const [createPlaylist, setCreatePlaylist] = useState(false);
    const [name, setName] = useState('');
    const [selectedList, setSelectedList] = useState('');
    const [selectedSong, setSelectedSong] = useState('');
    const [randomNumber, setRandomNumber] = useState(0);
    const [isAddToList, setIsAddToList] = useState(false);
    const [id, setSongId] = useState('');
    const [allSongs, setAllSongs] = useState([]);
    const [welcomePosters, setWelcomePosters] = useState([]);

    const arr = [p1, p2, p3, p4, p5, p6, p7];
    const imagee = arr[randomNumber];

    function capitalize(str) {
        if (!str) return ""; // Handle empty or null strings
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const getPlaylist = async() => {
        const response = await fetch(`http://localhost:3000/user/getplaylists/${token}`, {
        method: 'GET',
        })

        let data = await response.json();
        setPlaylists(data.data);
    }

    const addToList = async(list) => {
        console.log(list);
        setIsAddToList(false);
        const response = await fetch(`http://localhost:3000/user/addsong/${list}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})
        })
        
        const data = await response.json();
        
        if(data.success){
            toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }
        getSongs(list);
    }

    const getSongs = async(list) => {
        const response = await fetch(`http://localhost:3000/user/getsongs/${list}`, {
        method: 'GET',
        })

        let data = await response.json();
        setSongs(data.data);
    }

    const createList = async() => {
        setCreatePlaylist(false);
        const response = await fetch('http://localhost:3000/user/create_playlist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, token})
        })
        
        const data = await response.json();
        
        if(data.success){
            toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }
        getPlaylist();
    }


    const [audioUrl, setAudioUrl] = useState('');
    const playHandler = async(song) => {
        setAudioUrl('');
        const response = await fetch(`http://localhost:3000/user/play/${song}`, {
        method: 'GET',
        })

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
    }

    const changeHandler = async() => {
        if(allSongs.length == 0){
            const response = await fetch('http://localhost:3000/admin/getSongsName');
            const data = await response.json();
            if(data.success){
                setAllSongs(data.songs);
            }
        }
    }

    useEffect(() => {
        getPlaylist();
        changeHandler()
    }, [])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    const [welcome, setWelcome] = useState([]);
    useEffect(() => {
        setWelcome(shuffleArray(allSongs));
        setWelcomePosters(shuffleArray(arr));
    }, [allSongs]);

    return(
        <div className=" flex-cols h-screen nunito-lol">
            <Navbar setIsLoggedIn={setIsLoggedIn} user={user} setAudioUrl={setAudioUrl} setIsSearched={setIsSearched} setRandomNumber={setRandomNumber} setSelectedSong={setSelectedSong} setSongId={setSongId} setSelectedList={setSelectedList} allSongs={allSongs} setAllSongs={setAllSongs}/>
            
            <div className="h-[79%] flex">
                {/* -- Playlist --*/}
                <div className=" bg-[#212738] w-[25%] py-3 border-r-2 border-[#14B5E1] overflow-auto no-scrollbar ">
                    <div className=" fixed top-[81px] -mt-1 bg-[#212738]">
                        <p className=" concert-one-regular text-4xl text-[#FAFAFF] mt-3 mb-4 ml-2">Playlists</p>
                    </div>
                    <div className=" mt-16">
                    {
                        playlists.map((list) => (
                            <div key={list.id} onClick={() => {getSongs(list.id); setIsSearched(false); setSelectedList(list.name)}} className={`text-xl cursor-pointer py-2 mb-3 ml-4 mr-4 px-4 hover:scale-105 hover:transition-all hover:duration-200 hover:ml-8 ${ selectedList === list.name ? `text-[#14B5E1] transition-all duration-200} border-2 border-[#FAFAFF] rounded-lg` : ` text-[#FAFAFF]`}`} >{list.name}</div>
                        ))
                    }
                </div>

                { createPlaylist ?
                    (
                        <div className=" flex">
                            <input type="text" onKeyDown={(e) => {if(e.key === 'Enter'){createList()}}} onChange={(e) => setName(e.target.value)} placeholder="Enter playlist's name here" className=" bg-[#3C4867] px-3 p-1 rounded-lg ml-5 text-[#FAFAFF] shadow-[inset_0px_-0.8169865012168884px_0.8169865012168884px_0px_#FFFFFF59,inset_1.6339730024337769px_3.2679460048675537px_3.2679460048675537px_-0.8169865012168884px_#00000040]"></input>
                            <button onClick={createList} className=" ml-8 text-[#FAFAFF] border-2 rounded-lg py-1 px-4 hover:bg-[#FAFAFF] hover:text-[#212738] transition-all duration-300">Create</button>
                        </div>
                    ) :
                    (
                        <button onClick={() => setCreatePlaylist(true)} className=" ml-32 text-[#FAFAFF] border-2 rounded-lg py-1 px-4 hover:bg-[#FAFAFF] hover:text-[#212738] transition-all duration-300 mt-3">
                            Create Playlist
                        </button>
                    )
                }
                </div>

                {/* -- Songs --*/}
                <div className=" w-[75%] bg-[#212738] text-[#FAFAFF] overflow-auto no-scrollbar">
                    
                    <div className=" fixed top-20 -mt-1 bg-[#212738] z-10 w-full">
                        <p className=" concert-one-regular text-4xl mt-3 mb-4 ml-6">Songs</p>
                    </div>
                    <div className=" mt-16">
                    {   selectedList != '' &&
                        songs.map((song) => (
                            <p key={song} onClick={() => {playHandler(song); setSelectedSong(song)}} className={` text-xl cursor-pointer py-1 mb-3 ml-11 mr-4 hover:scale-105 transition-all duration-300 hover:ml-16 ${ selectedSong === song ? 'text-[#14B5E1] scale-110 font-bold ml-24 z-1' : `text-[#FAFAFF]`}`}>{capitalize(song.slice(0, -4))}</p>
                        ))
                    }

                    {/* -- Searched Song Poster -- */}
                    {
                        isSearched &&
                        <div className=" relative flex flex-col">
                            <img src={imagee} className=" absolute mt-6 ml-16 h-44"></img>
                            <div className="absolute text-white text-xl mt-52 ml-16 max-w-md break-words z-10 flex flex-col">
                                <p className="opacity-85 ml-2">{selectedSong.length > 11 ? capitalize(`${selectedSong.slice(0, 11)}..`) : capitalize(selectedSong)}</p>
                                <div className=" flex flex-row ml-2 mt-1">
                                    <img src={play} onClick={() => playHandler(`${selectedSong}.mp3`)} className=" h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                    <img src={add} onClick={() => setIsAddToList(!isAddToList)} className=" h-6 ml-2 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                </div>
                                
                            </div>
                            {
                                isAddToList &&
                                <div style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} className=" absolute mt-[275px] px-3 py-1 max-h-[150px] overflow-x-scroll ml-28 bg-[#2E86AB] min-w-28 min-h-6 rounded-lg fill-current">
                                    {
                                        playlists.map((list) => (
                                            <div onClick={() => addToList(list.id)} className=" cursor-pointer transition-all duration-200 hover:scale-105 hover:ml-2" key={list.id}>{list.name}</div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    }

                    {/* -- Welcome Songs -- */}
                    {   selectedList == '' && selectedSong == '' && (welcome.length > 0) &&
                        <div className=" w-full h-[480px] grid grid-rows-2 gap-5">
                            <div className=" grid grid-cols-4 gap-5 ml-20">
                                {/* -- 1 -- */}
                                <div className=" relative w-44 h-56">
                                    <div className="flex flex-col">
                                        <img src={welcomePosters[0]} className="h-40 mt-2"></img>
                                        <div className=" text-white text-xl max-w-md break-words z-10 flex flex-col">
                                            <p className="opacity-85 ml-3 mt-2">{welcome[0].length > 11 ? capitalize(`${welcome[0].slice(0,11)}..`) : capitalize(welcome[0])}</p>
                                            <div className=" flex flex-row">
                                                <img src={play} onClick={() => playHandler(`${welcome[0]}.mp3`)} className=" absolute right-2 bottom-7 h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* -- 2 -- */}
                                <div className=" relative w-44 h-56">
                                    <div className="flex flex-col">
                                        <img src={welcomePosters[1]} className="h-40 mt-2"></img>
                                        <div className=" text-white text-xl max-w-md break-words z-10 flex flex-col">
                                            <p className="opacity-85 ml-3 mt-2">{welcome[1].length > 11 ? capitalize(`${welcome[1].slice(0,11)}..`) : capitalize(welcome[1])}</p>
                                            <div className=" flex flex-row">
                                                <img src={play} onClick={() => playHandler(`${welcome[1]}.mp3`)} className=" absolute right-2 bottom-7 h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* -- 3 -- */}
                                <div className=" relative w-44 h-56">
                                    <div className="flex flex-col">
                                        <img src={welcomePosters[2]} className="h-40 mt-2"></img>
                                        <div className=" text-white text-xl max-w-md break-words z-10 flex flex-col">
                                            <p className="opacity-85 ml-3 mt-2">{welcome[2].length > 11 ? capitalize(`${welcome[2].slice(0,11)}..`) : capitalize(welcome[2])}</p>
                                            <div className=" flex flex-row">
                                                <img src={play} onClick={() => playHandler(`${welcome[2]}.mp3`)} className=" absolute right-2 bottom-7 h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* -- 4 -- */}
                                <div className=" relative w-44 h-56">
                                    <div className="flex flex-col">
                                        <img src={welcomePosters[3]} className="h-40 mt-2"></img>
                                        <div className=" text-white text-xl max-w-md break-words z-10 flex flex-col">
                                            <p className="opacity-85 ml-3 mt-2">{welcome[3].length > 11 ? capitalize(`${welcome[3].slice(0,11)}..`) : capitalize(welcome[3])}</p>
                                            <div className=" flex flex-row">
                                                <img src={play} onClick={() => playHandler(`${welcome[3]}.mp3`)} className=" absolute right-2 bottom-7 h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" grid grid-cols-4 gap-5 ml-20">
                                {/* -- 5 -- */}
                                <div className=" relative w-44 h-56">
                                    <div className="flex flex-col">
                                        <img src={welcomePosters[4]} className="h-40 mt-2"></img>
                                        <div className=" text-white text-xl max-w-md break-words z-10 flex flex-col">
                                            <p className="opacity-85 ml-3 mt-2">{welcome[4].length > 11 ? capitalize(`${welcome[4].slice(0,11)}..`) : capitalize(welcome[4])}</p>
                                            <div className=" flex flex-row">
                                                <img src={play} onClick={() => playHandler(`${welcome[4]}.mp3`)} className=" absolute right-2 bottom-7 h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* -- 6 -- */}
                                <div className=" relative w-44 h-56">
                                    <div className="flex flex-col">
                                        <img src={welcomePosters[5]} className="h-40 mt-2"></img>
                                        <div className=" text-white text-xl max-w-md break-words z-10 flex flex-col">
                                            <p className="opacity-85 ml-3 mt-2">{welcome[5].length > 11 ? capitalize(`${welcome[5].slice(0,11)}..`) : capitalize(welcome[5])}</p>
                                            <div className=" flex flex-row">
                                                <img src={play} onClick={() => playHandler(`${welcome[5]}.mp3`)} className=" absolute right-2 bottom-7 h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* -- 7 -- */}
                                <div className=" relative w-44 h-56">
                                    <div className="flex flex-col">
                                        <img src={welcomePosters[6]} className="h-40 mt-2"></img>
                                        <div className=" text-white text-xl max-w-md break-words z-10 flex flex-col">
                                            <p className="opacity-85 ml-3 mt-2">{welcome[6].length > 11 ? capitalize(`${welcome[6].slice(0,11)}..`) : capitalize(welcome[6])}</p>
                                            <div className=" flex flex-row">
                                                <img src={play} onClick={() => playHandler(`${welcome[6]}.mp3`)} className=" absolute right-2 bottom-7 h-6 hover:scale-110 transition-all duration-200 cursor-pointer"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </div>

            {/* -- Audio-Player --*/}
            <div className=" w-full bg-[#212738] h-[10%] border-t-2 border-[#14B5E1]">       
                {audioUrl && (
                    <audio controls autoPlay className=" p-2 h-full w-full px-[25%] py-2.5">
                    <source src={audioUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>

        </div>
    );
}

export default Home;