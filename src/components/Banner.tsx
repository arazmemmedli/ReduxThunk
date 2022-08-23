import React from 'react'

const banner: React.FC = () => {
    return (
        <div className="bg-[#FFC017] border-y border-black py-10 lg:py-0">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="px-10 lg:px-0 space-y-5">
                    <h1 className='text-6xl max-w-xl font-serif text-left'>
                        <span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read, and connect
                    </h1>
                    <h2>
                        It's easy and free to post yout thinking on any topic and connect with millions of readers.
                    </h2>
                </div>
                <img className='hidden md:inline-flex h-32 lg:h-full' src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />
            </div>
        </div>
    )
}

export default banner;