import { Logo } from "./shorturl/ui/logo";
import { NavLinks } from "./shorturl/ui/navLinks";
import { NavBtn } from "./ui/button";

import { link as menu } from './shorturl/ui/navLinks';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";


export const NavBar = () => {

    const [navToggleOn, setnavToggleOn] = useState(false);

    return(

    <>
        { navToggleOn && <MenuPopUpModal setnavToggleOn={setnavToggleOn} /> }

        <FontAwesomeIcon 
            onClick={() => setnavToggleOn(true)}
            className="max-md:block text-5xl ml-5 mt-3 text-white font-bold hidden hover:opacity-40 hover:cursor-pointer" 
            icon={faBars} />

        <div className="max-md:hidden sticky top-0 z-50 w-full h-24 bg-slate-200 flex items-center justify-around">

            <div className="flex gap-10 items-center">
               <Logo />
               <NavLinks />
            </div>

            <NavBtn />
            
        </div>

    </>

    )
}


const NavButtons = () => {

    return(
  
       <div className="flex gap-10 max-md:flex-col max-md:w-full max-md:mt-5">
  
            <button className="bg-black rounded-md font-bold p-2 text-white hover:opacity-75 max-md:w-full">
              Support Us
            </button>
  
            <button className="bg-slate-200 rounded-md font-bold p-2 text-black  hover:opacity-75 max-md:w-full">
              FAQ
            </button>
  
        </div>
    )
}


const MenuPopUpModal = ({ setnavToggleOn }: any) => {

    return(
  
      <div className='max-md:block max-md:fixed hidden w-full h-screen bg-violet-700 absolute top-0 z-50'>
  
            <FontAwesomeIcon 
              className="text-5xl hover:opacity-75 text-white cursor-pointer absolute right-4 top-2"
              icon={faTimes} 
              onClick={() => setnavToggleOn(false)}
              />
  
  
            <div className="flex flex-col items-center justify-start p-20 h-full gap-10 inset-0">
  
                <h1 className="text-white text-5xl">
                   <Logo />
                </h1>
  

                <ul className="flex flex-col gap-8 text-white">
  
                    { menu.map((item) => (
  
                      <li key={item.name}>
  
                            <Link
                              to={item.to}
  
                                className={ item.current ? 'current' 
                                 : 'text-lg font-bold p-2 rounded-md hover:bg-black hover:opacity-100'
                                } >
  
                              {item.name}
  
                            </Link>
  
                     </li>
  
                    ))}
  
                </ul>

                <NavButtons />
    
            </div>
            
        </div>
    )
  }
  