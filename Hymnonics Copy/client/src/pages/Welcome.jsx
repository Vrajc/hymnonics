import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Welcome = () => {

    const theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-";
    const [text, setText] = useState('');
  
    useEffect(() => {
        const theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-";
        const ctnt = "Hymnonics";
        const speed = 55;
        const increment = 6;

        let clen = ctnt.length;
        let si = 0;
        let stri = 0;
        let block = "";
        let fixed = "";

        const rustle = (i) => {
        setTimeout(() => {
            if (--i) rustle(i);
            nextFrame(i);
            si = si + 1;
        }, speed);
        };

        const nextFrame = (pos) => {
            for (let i = 0; i < clen - stri; i++) {
              let num = Math.floor(theLetters.length * Math.random());
              let letter = theLetters.charAt(num);
              block = block + letter;
            }
            if (si === (increment - 1)) {
              stri++;
            }
            if (si === increment) {
              fixed = fixed + ctnt.charAt(stri - 1);
              si = 0;
            }
            setText(fixed + block);
            block = "";
          };
      
          rustle(clen * increment + 1);
      
          return () => {
            clearTimeout(rustle);
          };
        }, []);
      

    return(
        <div>
            <div class="area relative">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

                <div class='concert-one-regular absolute top-20 left-36 text-5xl text-[#FAFAFF] font-bold py-8'>Welcome to..</div>
                <div class='absolute top-32 left-52 text-9xl text-[#FAFAFF] font-bold py-14 ml-24 madimi-one-regular' id="output">{text}</div>

				<div className=" mt-[450px] ml-24">
          <NavLink to='/login'>
            <button class="relative px-5 py-2 font-medium text-white group ml-20 h-11 w-40">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#14B5E1] group-hover:bg-[#0A5A71] group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#0A5A71] group-hover:bg-[#14B5E1] group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-[#14B5E1] -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-[#536379] -rotate-12"></span>
              <span class="relative nunito-lol text-lg">Login</span>
						</button>
          </NavLink>

          <NavLink to='/signup'>
            <button class="relative px-5 py-2 font-medium text-white group ml-20 h-11 w-40">
							<span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#14B5E1] group-hover:bg-[#0A5A71] group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#0A5A71] group-hover:bg-[#14B5E1] group-hover:-skew-x-12"></span>
							<span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-[#14B5E1] -rotate-12"></span>
							<span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-[#536379] -rotate-12"></span>
							<span class="relative nunito-lol text-lg">Signup</span>
						</button>
          </NavLink>
		
                </div>
            </div>
        </div>
    );
}

export default Welcome;