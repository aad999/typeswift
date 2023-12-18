function Home() {
    return (
        <div className="w-full flex flex-col space-y-5 justify-center items-center p-20 bg-amber-300 h-screen">
            <h1 class="font-extrabold text-3xl w-full max-w-3xl text-center bg-amber-300 p-5 -mb-4 rounded-lg rounded-b-none text-white drop-shadow-xl">{"--- Type Swift ---"}</h1>
            <div className="drop-shadow-xl rounded-lg rounded-t-none w-full max-w-3xl h-full flex flex-col space-y-5 justify-center items-center bg-gradient-to-bl from-rose-100 to-teal-100">
                <div className="font-extrabold italic text-xl">--- PRACTICE (SOLO) ---</div>
                <div className="flex items-center justify-center space-x-5">
                    <a href="/solo/easy">
                        <button type="button" class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none tranistion-all duration-1000 w-24">Easy</button>
                    </a>
                    <a href="/solo/medium">
                        <button type="button" class="text-white bg-amber-700 hover:bg-amber-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none tranistion-all duration-1000 w-24">Medium</button>
                    </a>
                    <a href="/solo/hard">
                        <button type="button" class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none tranistion-all duration-1000 w-24">Hard</button>
                    </a>
                </div>
                {/* <div className="font-extrabold italic text-xl">{">>>"} COMPETE (MULTIPLAYER) {"<<<"}</div>
                <div className="flex items-center justify-center space-x-5">
                    <a href="/multi/easy">
                        <button type="button" class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none tranistion-all duration-1000 w-24">Easy</button>
                    </a>
                    <a href="/multi/medium">
                        <button type="button" class="text-white bg-amber-700 hover:bg-amber-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none tranistion-all duration-1000 w-24">Medium</button>
                    </a>
                    <a href="/multi/hard">
                        <button type="button" class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none tranistion-all duration-1000 w-24">Hard</button>
                    </a>
                </div> */}
            </div>
        </div>
    );
}

export default Home;