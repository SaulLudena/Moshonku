import { useState, useRef, useEffect } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import ColorThief from "colorthief";
import { IoIosAddCircle } from "react-icons/io";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FaCheckCircle, FaEye, FaTrash } from "react-icons/fa";

export default function Right_side() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [colors, setColors] = useState([]);
  const imgRef = useRef(null);
  const [songs, setSongs] = useState([
    { title: "Song title 1", isHide: false },
    { title: "Song title 2", isHide: false },
    { title: "Song title 3", isHide: false },
    { title: "Song title 4", isHide: false },
    { title: "Song title 5", isHide: false },
    { title: "Song title 6", isHide: false },
    { title: "Song title 7", isHide: false },
    { title: "Song title 8", isHide: false },
    { title: "Song title 9", isHide: false },
    { title: "Song title 10", isHide: false },
  ]);
  const [musicGenders, setMusicGenders] = useState([
    { title: "Gender 1", isHide: false },
    { title: "Gender 2", isHide: false },
    { title: "Gender 3", isHide: false },
  ]);
  const [designInfo, setDesignInfo] = useState({
    image_url: "",
    top_songs: [],
    colors: [],
    music_genders: [],
    production_year: "",
    produced_by: "",
    band_name: "",
    album_name: "",
  });
  const [selectedDelete, setSelectedDelete] = useState([]);
  const [selectedDeleteMusicGender, setSelectedDeleteMusicGender] = useState(
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMusicGender, setIsOpenMusicGender] = useState(false);
  const [isOpenInfoBand, setIsOpenInfoBand] = useState(false);

  const generateImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const AlbumOrBandImage = new Image();
    AlbumOrBandImage.src = designInfo.image_url;

    canvas.width = 1080;
    canvas.height = 1920;

    return new Promise((resolve) => {
      AlbumOrBandImage.onload = () => {
        const targetWidth = 950;
        const targetHeight = 950;
        const xPos = (canvas.width - targetWidth) / 2;
        const yPos = 65;

        // Obtener dimensiones originales
        const imgWidth = AlbumOrBandImage.width;
        const imgHeight = AlbumOrBandImage.height;
        const imgRatio = imgWidth / imgHeight;
        const targetRatio = targetWidth / targetHeight;

        let cropWidth, cropHeight, cropX, cropY;

        if (imgRatio > targetRatio) {
          // Imagen más ancha que el área de destino: recortar lados
          cropHeight = imgHeight;
          cropWidth = imgHeight * targetRatio;
          cropX = (imgWidth - cropWidth) / 2;
          cropY = 0;
        } else {
          // Imagen más alta que el área de destino: recortar arriba/abajo
          cropWidth = imgWidth;
          cropHeight = imgWidth / targetRatio;
          cropX = 0;
          cropY = (imgHeight - cropHeight) / 2;
        }

        // Dibujar fondo y bordes
        ctx.fillStyle = "#EFEEE5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 25;
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Dibujar imagen con recorte (efecto object-cover)
        ctx.drawImage(
          AlbumOrBandImage,
          cropX,
          cropY,
          cropWidth,
          cropHeight, // Recorte de la imagen original
          xPos,
          yPos,
          targetWidth,
          targetHeight // Ubicación y tamaño en el canvas
        );

        // Texto "TOP SONGS"
        ctx.font = "bold 60px product_sans";
        ctx.fillStyle = "#000000";
        ctx.fillText("TOP SONGS", 70, 1125);

        // Dibujar lista de canciones
        let textYPos = 1200;
        ctx.font = "35px product_sans";
        designInfo.top_songs.forEach((top_song, index) => {
          ctx.fillText(
            top_song.isHide ? "" : `${index + 1}. ${top_song.title}`,
            75,
            textYPos
          );
          textYPos += 48;
        });

        //dibujar los colores de manera horizontal
        let colorYPos = 1075;
        let colorXPos = 607;
        designInfo.colors.forEach((color) => {
          ctx.fillStyle = `rgb(${color.join(",")})`;
          ctx.fillRect(colorXPos, colorYPos, 70, 70);
          colorXPos += 85;
        });

        //dibujar "MUSIC GENDERS"

        // Configurar la fuente y el color
        ctx.font = "25px product_sans";
        ctx.fillStyle = "#000000";

        let xStart = 605; // Posición inicial en X donde debe comenzar el primer elemento
        let xEnd = 950; // Límite derecho del área de texto
        let y = 1200; // Posición en Y
        let spacing = 20; // Espaciado base entre elementos

        // Filtrar los elementos visibles (los que cumplen !isHide)
        let visibleMusic = designInfo.music_genders.filter(
          (music) => !music.isHide
        );
        let itemCount = visibleMusic.length;

        // Si no hay elementos visibles, no hacemos nada
        if (itemCount === 0) return;

        // Calcular anchos individuales de los textos
        let textWidths = visibleMusic.map(
          (music) => ctx.measureText(music.title).width
        );
        let separatorWidth = ctx.measureText("|").width;

        // Calcular el ancho total de los textos y separadores
        let totalTextWidth = textWidths.reduce((sum, w) => sum + w, 0);
        let totalSeparatorsWidth = (itemCount - 1) * separatorWidth;
        let totalSpacing = (itemCount - 1) * spacing;
        let totalWidth = totalTextWidth + totalSeparatorsWidth + totalSpacing;

        // **Determinar la posición inicial (x)**
        // Si el texto es más corto que el espacio disponible, lo centramos
        // PERO el primer elemento siempre empieza en xStart
        let x =
          itemCount > 0 ? xStart : xStart + (xEnd - xStart - totalWidth) / 2;

        visibleMusic.forEach((music, index) => {
          let text = music.title;
          let textWidth = textWidths[index];

          // **Dibujar el primer elemento exactamente en xStart**
          if (index === 0) {
            x = xStart;
          }

          // Dibujar el texto
          ctx.fillText(text, x, y);
          x += textWidth + spacing;

          // Dibujar separador centrado entre elementos (excepto después del último)
          if (index < itemCount - 1) {
            ctx.fillText("|", x - spacing / 2, y); // Centrado entre palabras
            x += separatorWidth;
          }
        });

        //dibujar info de la banda

        ctx.fillStyle = "#000000";
        ctx.font = "bold 40px product_sans ";
        ctx.fillText(
          designInfo.production_year.length === 0
            ? "Production year"
            : designInfo.production_year,
          75,
          1750
        );

        ctx.font = "bold 40px product_sans";
        ctx.fillText(
          designInfo.produced_by.length === 0
            ? "Produced by"
            : designInfo.produced_by,
          75,
          1810
        );
        ctx.font = "bold 40px product_sans";
        ctx.fillText(
          designInfo.band_name.length === 0
            ? "Band name"
            : designInfo.band_name,
          720,
          1700
        );
        ctx.font = "bold 90px product_sans";
        ctx.fillText(
          designInfo.album_name.length === 0
            ? "Album name"
            : designInfo.album_name,
          850,
          1810
        );

        resolve(canvas.toDataURL());
      };
    });
  };

  const handleDownload = async () => {
    const imageUrl = await generateImage();

    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "imagen_random.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  //Funciones para el delete y ocultar
  const toggleSelectionDelete = (index) => {
    setSelectedDelete((prev) => {
      if (prev.includes(index)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter((i) => i !== index);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prev, index];
      }
    });
  };
  const toggleHide = (index) => {
    setSongs((prevSongs) => {
      const updatedSongs = prevSongs.map((song, i) =>
        i === index ? { ...song, isHide: !song.isHide } : song
      );

      // También actualizamos `designInfo`
      setDesignInfo((prevDesignInfo) => ({
        ...prevDesignInfo,
        top_songs: updatedSongs,
      }));

      return updatedSongs;
    });
  };
  //Funciones para el delete y ocultar de los generos musicales
  const toggleHideMusicGender = (index) => {
    setMusicGenders((prevMusicGenders) => {
      const updatedMusicGenders = prevMusicGenders.map((song, i) =>
        i === index ? { ...song, isHide: !song.isHide } : song
      );
      setDesignInfo((prevDesignInfo) => ({
        ...prevDesignInfo,
        music_genders: updatedMusicGenders,
      }));

      return updatedMusicGenders;
    });
  };
  const toggleSelectionDeleteMusicGender = (index) => {
    setSelectedDeleteMusicGender((prev) => {
      if (prev.includes(index)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter((i) => i !== index);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prev, index];
      }
    });
  };
  useEffect(() => {
    if (imageURL) {
      const img = imgRef.current;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const colorThief = new ColorThief();
        let extractedColors = colorThief.getPalette(img, 5);
        extractedColors = extractedColors.sort((a, b) => {
          const contrast = (color) => {
            const luminance =
              (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255;
            return Math.abs(1 - luminance);
          };
          return contrast(b) - contrast(a);
        });
        setColors(extractedColors);
        setDesignInfo({
          ...designInfo,
          colors: extractedColors,
        });
      };
    }
    setDesignInfo({
      ...designInfo,
      top_songs: songs,
      music_genders: musicGenders,
    });
  }, [imageURL]);

  function open() {
    setIsOpen(true);
    console.log(designInfo);
  }

  function close() {
    setIsOpen(false);
  }

  const openMusicGenders = () => {
    setIsOpenMusicGender(true);
  };
  const closeMusicGenders = () => {
    setIsOpenMusicGender(false);
  };

  const openInfoBand = () => {
    setIsOpenInfoBand(true);
  };
  const closeInfoBand = () => {
    setIsOpenInfoBand(false);
  };

  const handleImage = (e) => {
    const image = e.target.files[0];

    // Verificar que el archivo sea una imagen
    if (image && image.type.startsWith("image/")) {
      setImage(image);
      const imageURL = URL.createObjectURL(image);
      setImageURL(imageURL);
      console.log("Imagen cargada correctamente");
      setDesignInfo({
        ...designInfo,
        image_url: imageURL,
      });
    } else {
      console.log("Por favor, selecciona un archivo de imagen válido");
    }
  };

  return (
    <>
      <Dialog
        open={isOpenMusicGender}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={closeMusicGenders}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#353535d4]">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-[50%] max-w-[1500px] m-auto bg-[#EBEBEB] p-10 max-xl:w-[100%] "
            >
              <div className="grid grid-cols-12">
                <div className=" col-span-12">
                  <h1 className="text-7xl font-bold tracking-[-2px]">
                    MUSIC GENDERS
                  </h1>
                  <h3 className="text-3xl mt-6">
                    Write three music genders of your band
                  </h3>
                </div>
                <div className=" col-span-8">
                  <ol className="list-decimal mt-10 text-2xl text-left gap-2 grid">
                    {musicGenders.map((musicGender, index) => {
                      return (
                        <li
                          className="hover:font-medium flex items-center gap-10 "
                          key={index}
                        >
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={musicGender.title}
                              onChange={(e) => {
                                setMusicGenders((prevMusicGenders) => {
                                  const newMusicGenders = [...prevMusicGenders];
                                  newMusicGenders[index].title = e.target.value;
                                  setDesignInfo((prevDesignInfo) => ({
                                    ...prevDesignInfo,
                                    music_genders: newMusicGenders,
                                  }));
                                  return newMusicGenders;
                                });
                              }}
                              disabled={
                                selectedDeleteMusicGender.includes(index)
                                  ? true
                                  : false
                              }
                              maxLength={40}
                              className={`${
                                selectedDeleteMusicGender.includes(index) &&
                                "line-through opacity-40"
                              } border-b-2 border-black text-2xl p-2 outline-none w-[30rem]`}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span
                              className="bg-[#eb6e95] rounded-full p-3 cursor-pointer text-lg"
                              onClick={() => {
                                toggleSelectionDeleteMusicGender(index);
                                toggleHideMusicGender(index);
                              }}
                            >
                              {selectedDeleteMusicGender.includes(index) ? (
                                <FaEye />
                              ) : (
                                <FaTrash />
                              )}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className=" col-span-12 pt-10">
                  {" "}
                  <div className="w-full justify-center text-center grid">
                    <div
                      className="flex items-center gap-3 bg-[#E3E2D3] px-5 py-3 cursor-pointer"
                      onClick={closeMusicGenders}
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
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#353535d4]">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-[50%] max-w-[1500px] m-auto bg-[#EBEBEB] p-10 max-xl:w-[100%] "
            >
              <div className="grid grid-cols-12">
                <div className=" col-span-12">
                  <h1 className="text-7xl font-bold tracking-[-2px]">
                    TOP SONGS
                  </h1>
                  <h3 className="text-3xl mt-6">
                    Write the top songs of your band
                  </h3>
                </div>
                <div className=" col-span-8">
                  <ol className="list-decimal mt-10 text-2xl text-left gap-2 grid">
                    {songs.map((song, index) => {
                      return (
                        <li
                          className="hover:font-medium flex items-center gap-10 "
                          key={index}
                        >
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={song.title}
                              onChange={(e) => {
                                setSongs((prevSongs) => {
                                  const newSongs = [...prevSongs];
                                  newSongs[index].title = e.target.value;

                                  setDesignInfo((prevDesignInfo) => ({
                                    ...prevDesignInfo,
                                    top_songs: newSongs,
                                  }));

                                  return newSongs;
                                });
                              }}
                              disabled={
                                selectedDelete.includes(index) ? true : false
                              }
                              maxLength={40}
                              className={`${
                                selectedDelete.includes(index) &&
                                "line-through opacity-40"
                              } border-b-2 border-black text-2xl p-2 outline-none w-[30rem]`}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span
                              className="bg-[#eb6e95] rounded-full p-3 cursor-pointer text-lg"
                              onClick={() => {
                                toggleSelectionDelete(index);
                                toggleHide(index);
                              }}
                            >
                              {selectedDelete.includes(index) ? (
                                <FaEye />
                              ) : (
                                <FaTrash />
                              )}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className=" col-span-12 pt-10">
                  {" "}
                  <div className="w-full justify-center text-center grid">
                    <div
                      className="flex items-center gap-3 bg-[#E3E2D3] px-5 py-3 cursor-pointer"
                      onClick={close}
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
      <Dialog
        open={isOpenInfoBand}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={closeInfoBand}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#353535d4]">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-[50%] max-w-[1500px] m-auto bg-[#EBEBEB] p-10 max-xl:w-[100%] "
            >
              <div className="grid grid-cols-12">
                <div className=" col-span-12">
                  <h1 className="text-7xl font-bold tracking-[-2px]">
                    INFO ABOUT ARTIST
                  </h1>
                  <h3 className="text-3xl mt-6">Write the info of your band</h3>
                </div>

                <div className="grid gap-5 mt-10">
                  <input
                    type="text"
                    className="border-b-2 border-black text-2xl p-2 outline-none w-[30rem]"
                    placeholder="Production year"
                    onChange={(e) => {
                      setDesignInfo((prevDesignInfo) => ({
                        ...prevDesignInfo,
                        production_year: e.target.value,
                      }));
                    }}
                    value={designInfo.production_year}
                  />
                  <input
                    type="text"
                    className="border-b-2 border-black text-2xl p-2 outline-none w-[30rem]"
                    placeholder="Produced by"
                    onChange={(e) => {
                      setDesignInfo((prevDesignInfo) => ({
                        ...prevDesignInfo,
                        produced_by: e.target.value,
                      }));
                    }}
                    value={designInfo.produced_by}
                  />
                  <input
                    type="text"
                    className="border-b-2 border-black text-2xl p-2 outline-none w-[30rem]"
                    placeholder="Band name"
                    onChange={(e) => {
                      setDesignInfo((prevDesignInfo) => ({
                        ...prevDesignInfo,
                        band_name: e.target.value,
                      }));
                    }}
                    value={designInfo.band_name}
                  />
                  <input
                    type="text"
                    className="border-b-2 border-black text-2xl p-2 outline-none w-[30rem]"
                    placeholder="Album name"
                    onChange={(e) => {
                      setDesignInfo((prevDesignInfo) => ({
                        ...prevDesignInfo,
                        album_name: e.target.value,
                      }));
                    }}
                    value={designInfo.album_name}
                  />
                </div>
                <div className=" col-span-12 pt-10">
                  {" "}
                  <div className="w-full justify-center text-center grid">
                    <div
                      className="flex items-center gap-3 bg-[#E3E2D3] px-5 py-3 cursor-pointer"
                      onClick={closeInfoBand}
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
      <div className=" col-span-5 grid pt-[27%] max-2xl:pt-[10%] max-2xl:mb-20 max-2xl:col-span-12">
        <div className="">
          <div className="grid gap-5 w-full max-2xl:justify-center  ">
            <h1 className=" w-[85%] text-7xl font-bold tracking-[-3px] max-xl:text-5xl max-2xl:w-[80%] max-lg:text-3xl  max-lg:tracking-[-2px]  max-2xl:text-center">
              WHERE MELODIES BECOME MEMORIES
            </h1>
            <h3 className="text-xl max-xl:text-md max-lg:text-sm">
              Design your band’s visual tribute
            </h3>

            <div className="flex gap-5">
              <div className="bg-[#C6C5B3] p-5 grid items-center justify-center max-lg:p-3 max-lg:text-xs ">
                WATCH EXAMPLES
              </div>
              <div
                className="bg-[#1C1C1C] p-5  grid items-center justify-center text-white max-lg:p-3 max-lg:text-xs cursor-pointer"
                onClick={() => {
                  handleDownload();
                }}
              >
                DOWNLOAD THIS
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-span-6 h-full w-full max-2xl:col-span-12 -translate-y-[10%] max-2xl:-translate-y-0">
        <div className=" w-full h-[90rem]">
          <div
            className="border-8 border-[#353535] h-full bg-[#EFEEE5] p-10 "
            id="poster-preview"
          >
            <div className="relative group">
              {!imageURL ? (
                <div className="transition duration-100 group-hover:bg-[#b5b4a6] h-[40rem] grid items-center justify-center text-center bg-[#E3E2D3] text-7xl">
                  <div className="flex flex-col justify-center items-center text-center text-[#585858]">
                    <IoMdCloudUpload />
                    <h1 className="text-2xl mb-1">Select image</h1>
                    <h1 className="text-lg">500x500 Preferable</h1>
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
              <div className="col-span-7  cursor-pointer">
                <h1 className="text-5xl font-bold tracking-[-2px]">
                  TOP SONGS
                </h1>
                <ol className="list-decimal mt-10 px-7 text-2xl text-left h-[20rem]">
                  {
                    //mostramos solos las canciones que no estén ocultas
                    songs
                      .filter((song) => !song.isHide)
                      .map((song, index) => (
                        <li className="hover:font-bold" key={index}>
                          {song.title}
                        </li>
                      ))
                  }

                  <div className="absolute left-0 translate-y-4 ">
                    <div
                      className="flex items-center gap-3 bg-[#d6d29b] px-5 py-3 text-[1rem]"
                      onClick={open}
                    >
                      <span>Edit top songs</span>
                      <div className=" text-[#000000] rounded-full ">
                        <IoIosAddCircle />
                      </div>
                    </div>
                  </div>
                </ol>
              </div>
              <div className="col-span-5 flex flex-col gap-5">
                <div className="grid justify-end">
                  <div className="flex gap-3">
                    {colors.length ? (
                      colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-12 h-12"
                          style={{ backgroundColor: `rgb(${color.join(",")})` }}
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
                    {
                      //mostramos solos los generos musicales que no estén ocultos
                      musicGenders
                        .filter((musicGender) => !musicGender.isHide)
                        .map((musicGender, index) => (
                          <li className="hover:font-bold inline" key={index}>
                            {musicGender.title}
                            {index < musicGenders.length - 1 && " | "}
                          </li>
                        ))
                    }
                  </div>
                  <div className="absolute right-0 translate-y-10 ">
                    <div
                      className="flex items-center gap-2 bg-[#d6d29b] px-5 py-3"
                      onClick={() => {
                        openMusicGenders();
                      }}
                    >
                      <span>Edit music genders</span>
                      <IoIosAddCircle />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 mt-30  grid relative ">
                <div className="gap-5 flex flex-col ">
                  <div className="border-red-700 ">
                    <p className="text-2xl">
                      {designInfo.production_year.length === 0
                        ? "Production year"
                        : designInfo.production_year}
                    </p>
                    <p className="text-2xl">
                      {designInfo.produced_by.length === 0
                        ? "Produced by"
                        : designInfo.produced_by}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-6 mt-28 relative">
                <div className="gap-5 flex flex-col">
                  <div className="text-right">
                    <p className="text-2xl">
                      {designInfo.band_name.length === 0
                        ? "Band name"
                        : designInfo.band_name}
                    </p>
                    <p className="text-5xl font-bold tracking-[-2px]">
                      {designInfo.album_name.length === 0
                        ? "Album name"
                        : designInfo.album_name}
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 -translate-y-35 ">
                  <div
                    className="flex items-center gap-2 bg-[#d6d29b] px-5 py-3 cursor-pointer"
                    onClick={() => {
                      openInfoBand();
                    }}
                  >
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
  );
}
