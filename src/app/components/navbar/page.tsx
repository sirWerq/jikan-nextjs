export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-center bg-transparent p-3">
      <div className="container flex justify-between items-center">
        <div className="flex gap-11 items-center">
          <h1 className="font-semibold text-2xl">AmiaList</h1>
          <ul className="flex gap-1">
            <li>
              <a href="/" className="p-2 hover:bg-red-300 rounded-md">
                Anime
              </a>
            </li>
            <li>
              <a href="/manga" className="p-2 hover:bg-red-300 rounded-md">
                Manga
              </a>
            </li>
            <li>
              <a href="#" className="p-2 hover:bg-red-300 rounded-md">
                Top Anime
              </a>
            </li>
            <li>
              <a href="#" className="p-2 hover:bg-red-300 rounded-md">
                Top Manga
              </a>
            </li>
            <li>
              <a href="#" className="p-2 hover:bg-red-300 rounded-md">
                Seasons
              </a>
            </li>
          </ul>
        </div>
        <div className="flex gap-8 items-center h-full">
          <div className="relative mx-auto text-gray-600 h-full flex items-center">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <svg
                className="text-gray-600 h-6 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <div>
            <img
              src="/hero.jpg"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
