import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TiHomeOutline } from "react-icons/ti";
import { GrHomeRounded } from "react-icons/gr";
import { IoMdTrendingUp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RiMovie2Line } from "react-icons/ri";
import { FaTv } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";
import styled from "styled-components"
import logo from "../assets/ZFLIX.png"








const SideBar = () => {
    const navigate = useNavigate();
    const sideDetails = [
        {
            title: 'Home',
            icon: GrHomeRounded ,
            link: '/'
        },
        {
            title: 'Trending',
            icon: IoMdTrendingUp ,
            link: '/trending'
        },
        {
            title: 'Discover',
            icon: TiHomeOutline ,
            link: '/discover'
        },
        {
            title: 'Search',
            icon: CiSearch ,
            link: '/search'
        },
        {
            title: 'Movies',
            icon: RiMovie2Line ,
            link: '/movies'
        },
        {
            title: 'TV Series',
            icon: FaTv ,
            link: '/tvshows'
        },
        {
            title: 'People',
            icon: IoPeopleOutline ,
            link: '/'
        },
        {
            title: 'Home',
            icon: TiHomeOutline ,
            link: '/'
        },
        {
            title: 'Home',
            icon: TiHomeOutline ,
            link: '/'
        },
        {
            title: 'Home',
            icon: TiHomeOutline ,
            link: '/'
        },
        {
            title: 'Home',
            icon: TiHomeOutline ,
            link: '/'
        },
        {
            title: 'Home',
            icon: TiHomeOutline ,
            link: '/'
        },
        {
            title: 'Home',
            icon: TiHomeOutline ,
            link: '/'
        },
    ]
    const StyledText = styled.h1` 
    font-family: Georgia, serif; []
`; 
  return (
    <div className='sticky top-0 left-0 h-screen text-white font-sans '>
        <div className='overflow-x-auto sidebar relative w-full flex flex-col items-center justify-center'>
        <div>
            <img src={logo} alt='logo'  />
        </div>
        <div className='w-full px-5'>
            {sideDetails.map((item, index) => {
                const Icon = item.icon
            return  (<div key={index} onClick={() => navigate(item.link)} className='py-2 cursor-pointer text-xl w-full hover:bg-[#33333A]  my-3 px-5 flex gap-3 justify-start align-middle font-extralight rounded-2xl duration-100 hover:translate-x-4 transition-transform hover:duration-100 hover:text-pink-500'>
                <Icon />
            <StyledText>{item.title}</StyledText>
            </div>)})}
        </div>
       </div>
    </div>
  )
}

export default SideBar