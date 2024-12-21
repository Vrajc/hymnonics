import { useState, useRef, useEffect } from "react";
import { TbMusicSearch } from "react-icons/tb";
import { toast } from "react-toastify";

const Navbar = ({setIsLoggedIn, user, setAudioUrl, setIsSearched, setRandomNumber, setSelectedSong, setSongId, setSelectedList, setAllSongs, allSongs}) => {

    const [songName, setSongName] = useState('');

    const searchHandler = async(songName) => {
        setSongName(songName);
        const response = await fetch(`http://localhost:3000/user/findsong/${songName}.mp3`, {
        method: 'GET',
        })

        let data = await response.json();
        
        if(data.success){
            setIsSearched(true);
            setSelectedList('');
            setSelectedSong(songName);
            setSongId(data.data._id);
            setRandomNumber(Math.floor(Math.random() * 7));
        }else{
            toast.error(data.message);
        }
    }

    const changeHandler = async(e) => {
        setSongName(e.target.value);
    }

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) 
            {
                setIsSearched(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, buttonRef]);

    return(
        <div className="flex justify-between items-center h-[11%] bg-[#2E86AB] relative">

            <div onClick={() => {setIsSearched(false); setSelectedList(''); setSelectedSong(''); setAudioUrl('')}} className="flex items-center ml-2 hover:cursor-pointer">
                <img src="https://i.ibb.co/nzvBVjy/hymnonics.png" alt="hymn" className="w-16 h-16 mr-2" />
                <span className="text-[#FAFAFF] text-2xl madimi-one-regular">Hymnonics</span>
            </div>


            <div className=" relative w-1/3">
                <div>
                <input type="text" className="w-full px-4 py-2 bg-[#A1E4F7] text-[#212738] border border-[#14B5E1] rounded-full focus:outline-none placeholder-[#212738]" onChange={changeHandler} onKeyDown={(e) => {if(e.key === 'Enter'){searchHandler(e.target.value)}}} placeholder="Search" value={songName}></input>
                <button ref={buttonRef}><TbMusicSearch onClick={() => searchHandler(songName)} className=" absolute top-3 right-6 scale-150 opacity-85"/></button>
                </div>
            </div>

            <div className="flex items-center mr-5 text-lg">
                <p className="text-[#FAFAFF] mr-8 permanent-marker-regular text-xl">{user}</p>
                <button className="text-[#FAFAFF] mr-3 nunito-lol hover:text-red-500 hover:font-bold scale-105 cursor-pointer transition-all duration-300" onClick={() => setIsLoggedIn(false)}>Logout</button>
            </div>

            { songName && !allSongs.find(song => song === songName) &&
                <div ref={menuRef} className=" z-20 absolute top-16 left-[35.2%] rounded-2xl w-1/3 -ml-3 px-2 py-2 bg-[#56CFF0] text-[#212738] border border-[#14B5E1] ">
                    <div className=" w-full flex flex-col relative">
                        {allSongs.filter((item) => item !== songName && item.startsWith(songName)).map((item) => <div className=" h-7 px-3 pt-0.5 hover:cursor-pointer hover:border-1 border-[#4BB9DC] hover:bg-[#4BB9DC] rounded-lg duration-100 transition-all" onClick={() => searchHandler(item)} >{item}</div>).slice(0,4)}
                    </div>
                </div>
            }
        </div>
    );
}

export default Navbar;