import React from 'react'
import { Link } from 'react-router-dom'

const header = () => {
    return (
        <header className="w-full px-0 py-5 bg-[#FFC017]">
            <div className="max-w-7xl mx-auto flex justify-between">
                <div className="flex items-center space-x-5">
                    <Link to={"/"}>
                        <img src="https://links.papareact.com/yvf" className="w-44 object-contain cursor-pointer" alt="" />
                    </Link>
                    <nav>
                        <ul className="inline-flex items-center space-x-5">
                            <li>
                                <Link to={"/"} className="inline-block">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={"/add"} className="inline-block">
                                    Add Post
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* <ul className="flex items-center space-x-5 text-green-600">
                    <li>Sign In</li>
                    <li className="border px-4 py-2 border-black bg-[#000] rounded-full text-white">Get Started</li>
                </ul> */}
            </div>
        </header>
    )
}

export default header