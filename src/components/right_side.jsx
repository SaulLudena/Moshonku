import { IoMdCloudUpload } from 'react-icons/io'
export default function Right_side() {
  return (
    <div className=" col-span-6 h-full w-full max-2xl:col-span-12">
      <div className=" w-full h-[90rem]">
        <div className="border-8 border-[#353535] h-full bg-[#EFEEE5] p-10 ">
          <div className=" h-[40rem] grid items-center justify-center text-center bg-[#E3E2D3] text-7xl">
            <div className="flex flex-col justify-center items-center text-center text-[#585858]">
              <IoMdCloudUpload />
              <h1 className="text-2xl">Select image</h1>
            </div>
          </div>
          {/*
          COLOCAR LOGICA DE IMAGENES AQUI
          */}
          <div className="grid grid-cols-12 mt-10">
            <div className="col-span-6 ">
              <h1 className="text-5xl font-bold tracking-[-2px]">TOP SONGS</h1>
              <ol className="list-decimal mt-10 px-7 text-2xl text-left">
                <li>Amor </li>
                <li>Producto anormal</li>
                <li>Cancelame</li>
                <li>Mi para ti</li>
                <li>Amor </li>
                <li>Producto anormal</li>
                <li>Cancelame</li>
                <li>Amor </li>
                <li>Producto anormal</li>
                <li>Cancelame</li>
              </ol>
            </div>
            <div className="col-span-6  flex flex-col gap-5">
              <div className="grid justify-end">
                <div className=" flex gap-3 ">
                  <div className="bg-black w-12 h-12"></div>
                  <div className="bg-zinc-900 w-12 h-12"></div>
                  <div className="bg-zinc-800 w-12 h-12"></div>
                  <div className="bg-zinc-600 w-12 h-12"></div>
                  <div className="bg-zinc-400 w-12 h-12"></div>
                </div>
              </div>
              <div className=" text-right flex">
                <div className="text-right w-full">
                  <span>Math Rock |</span>
                  <span> Indie |</span>
                  <span> Rock</span>
                </div>
              </div>
            </div>
            <div className="col-span-6 mt-30">
              <div className=" gap-5 flex flex-col">
                <div className="">
                  <p className="text-2xl">PRODUCTION YEAR</p>
                  <p className="text-2xl">PRODUCED BY</p>
                </div>
              </div>
            </div>
            <div className="col-span-6  mt-28 ">
              <div className=" gap-5 flex flex-col">
                <div className=" text-right">
                  <p className="text-2xl">Band Name</p>
                  <p className="text-5xl font-bold tracking-[-2px]">
                    Absolutely mashing potatoes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
