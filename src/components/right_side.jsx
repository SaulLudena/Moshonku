import { useState, useRef, useEffect } from 'react'
import { IoMdCloudUpload } from 'react-icons/io'
import ColorThief from 'colorthief'
import { IoIosAddCircle } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { Dialog, DialogPanel } from '@headlessui/react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { FaCheckCircle } from 'react-icons/fa'
export default function Right_side() {
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [colors, setColors] = useState([])
  const imgRef = useRef(null)
  const [songs, setSongs] = useState([])
  const [newSong, setNewSong] = useState('')
  let [isOpen, setIsOpen] = useState(true)
  useEffect(() => {
    if (imageURL) {
      const img = imgRef.current
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const colorThief = new ColorThief()
        let extractedColors = colorThief.getPalette(img, 5)
        extractedColors = extractedColors.sort((a, b) => {
          const contrast = (color) => {
            const luminance =
              (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255
            return Math.abs(1 - luminance) // Contraste con fondo blanco
          }
          return contrast(b) - contrast(a) // Ordena de mayor a menor contraste
        })
        setColors(extractedColors)
      }
    }
  }, [imageURL])
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  const handleImage = (e) => {
    const image = e.target.files[0]

    // Verificar que el archivo sea una imagen
    if (image && image.type.startsWith('image/')) {
      setImage(image)
      const imageURL = URL.createObjectURL(image)
      setImageURL(imageURL)
      console.log('Imagen cargada correctamente')
    } else {
      console.log('Por favor, selecciona un archivo de imagen válido')
    }
  }

  const addSong = () => {
    if (newSong.trim()) {
      setSongs([...songs, newSong])
      setNewSong('')
    }
  }

  const editSong = (index, newTitle) => {
    const updatedSongs = [...songs]
    updatedSongs[index] = newTitle
    setSongs(updatedSongs)
  }

  const deleteSong = (index) => {
    setSongs(songs.filter((_, i) => i !== index))
  }
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#353535d2]">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-[50%] max-w-[1500px] m-auto bg-[#EBEBEB] p-10 max-xl:w-[100%] "
            >
              <div className="grid grid-cols-12">
                <div className=" col-span-12">
                  <h1 className="text-5xl font-bold tracking-[-2px]">
                    TOP SONGS
                  </h1>
                </div>
                <div className=" col-span-8">
                  <ol className="list-decimal mt-10 px-7 text-2xl text-left ">
                    <li className="hover:font-bold flex items-center gap-5">
                      <span>Song title 1 </span>
                      <div className="flex gap-2">
                        <div className="p-3 rounded-full bg-[#BDB75F] text-[#1C1C1C]">
                          <MdEdit />
                        </div>
                        <div className="p-3 rounded-full bg-[#BD5F5F] text-[#EBEBEB]">
                          <FaDeleteLeft />
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className=" col-span-4 flex items-center justify-end">
                  <div className="w-full justify-center text-center grid">
                    <div
                      className="flex items-center gap-3 bg-[#E3E2D3] px-5 py-3"
                      onClick={open}
                    >
                      <span>Add songs</span>
                      <div className="text-2xl ">
                        <IoIosAddCircle />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" col-span-12 pt-10">
                  {' '}
                  <div className="w-full justify-center text-center grid">
                    <div
                      className="flex items-center gap-3 bg-[#E3E2D3] px-5 py-3"
                      onClick={open}
                    >
                      <span>Save</span>
                      <div className="text-2xl ">
                        <FaCheckCircle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className=" col-span-6 h-full w-full max-2xl:col-span-12">
        <div className=" w-full h-[90rem]">
          <div className="border-8 border-[#353535] h-full bg-[#EFEEE5] p-10 ">
            <div className="relative group">
              {!imageURL ? (
                <div className="transition duration-100 group-hover:bg-[#b5b4a6] h-[40rem] grid items-center justify-center text-center bg-[#E3E2D3] text-7xl">
                  <div className="flex flex-col justify-center items-center text-center text-[#585858]">
                    <IoMdCloudUpload />
                    <h1 className="text-2xl">Select image</h1>
                  </div>
                </div>
              ) : (
                <img
                  ref={imgRef}
                  src={imageURL}
                  alt="image"
                  className="w-full h-[40rem] object-cover group-hover:opacity-80 transition duration-100"
                />
              )}
              <input
                type="file"
                className="border-2 border-black absolute top-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImage}
                accept="image/*"
              />
            </div>
            <div className="grid grid-cols-12 mt-10 relative">
              <div className="col-span-6  cursor-pointer">
                <h1 className="text-5xl font-bold tracking-[-2px]">
                  TOP SONGS
                </h1>
                <ol className="list-decimal mt-10 px-7 text-2xl text-left h-[20rem]">
                  <li className="hover:font-bold"> Song title 1 </li>
                  <li className="hover:font-bold"> Song title 2 </li>
                  <li className="hover:font-bold"> Song title 3 </li>
                  <li className="hover:font-bold"> Song title 4 </li>
                  <li className="hover:font-bold"> Song title 5 </li>
                  <li className="hover:font-bold"> Song title 6 </li>
                  <li className="hover:font-bold"> Song title 7 </li>
                  <li className="hover:font-bold"> Song title 8 </li>
                  <li className="hover:font-bold"> Song title 9 </li>
                  <li className="hover:font-bold"> Song title 10 </li>

                  <div className="absolute left-0 translate-y-4 ">
                    <div
                      className="flex items-center gap-3 bg-[#E3E2D3] px-5 py-3"
                      onClick={open}
                    >
                      <span>Edit songs</span>
                      <div className="bg-[#1C1C1C] text-[#E3E2D3] p-2 rounded-full ">
                        <MdEdit />
                      </div>
                    </div>
                  </div>
                </ol>
              </div>
              <div className="col-span-6 flex flex-col gap-5">
                <div className="grid justify-end">
                  <div className="flex gap-3">
                    {colors.length ? (
                      colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-12 h-12"
                          style={{ backgroundColor: `rgb(${color.join(',')})` }}
                        ></div>
                      ))
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-[#adab96]"></div>
                        <div className="w-12 h-12 bg-[#c7c5a8]"></div>
                        <div className="w-12 h-12 bg-[#d6d5c6]"></div>
                        <div className="w-12 h-12 bg-[#d8d6b8]"></div>
                        <div className="w-12 h-12 bg-[#E3E2D3]"></div>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right flex cursor-pointer relative ">
                  <div className="text-right w-full">
                    <span className="hover:font-bold">Math Rock |</span>
                    <span className="hover:font-bold"> Indie |</span>
                    <span className="hover:font-bold"> Rock</span>
                  </div>
                  <div className="absolute right-0 translate-y-10 ">
                    <div className="flex items-center gap-2 bg-[#E3E2D3] px-5 py-3">
                      <span>Edit gender</span>
                      <IoIosAddCircle />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 mt-30  grid relative ">
                <div className="gap-5 flex flex-col ">
                  <div className="border-red-700 ">
                    <p className="text-2xl">PRODUCTION YEAR</p>
                    <p className="text-2xl">PRODUCED BY</p>
                  </div>
                </div>
                <div className="absolute left-0 translate-y-20 ">
                  <div className="flex items-center gap-2 bg-[#E3E2D3] px-5 py-3">
                    <span>Edit info</span>
                    <IoIosAddCircle />
                  </div>
                </div>
              </div>
              <div className="col-span-6 mt-28 relative">
                <div className="gap-5 flex flex-col">
                  <div className="text-right">
                    <p className="text-2xl">Band</p>
                    <p className="text-5xl font-bold tracking-[-2px]">
                      ALBUM NAME
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 -translate-y-35 ">
                  <div className="flex items-center gap-2 bg-[#E3E2D3] px-5 py-3">
                    <span>Edit info</span>
                    <IoIosAddCircle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
