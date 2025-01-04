import React from 'react'
import { useState,useEffect } from 'react';
import{FaHeart,FaDownload,FaShare} from 'react-icons/fa';

const Photos = () => {
  
    const [Loading,setLoading] = useState(false);
    interface photo {
        id: string;
        urls: {
            regular: string;
        };
        alt_description: string;
        user: {
            name: string;
            portfolio_url: string;
            profile_image: {
                medium: any;
            }
        };
        likes: number;
        
        
    }

    const [photos,setPhotos] = useState<photo[]>([]);
    const [favourite,setFavourite] = useState([]);
    const [favouritePhotos,setFavouritePhotos] = useState<photo[]>([]);

    const handleFavouriteClick = (photoId: any) => {
      const existingIndex = favouritePhotos.findIndex((favPhoto) => favPhoto.id === photoId)
      if (existingIndex !== -1) {
        setFavouritePhotos((prevFavourites) => {
          return(
          prevFavourites.filter((favPhoto) => favPhoto.id !== photoId)
        )})
    }
    else{
      const photoToAdd = photos.find((photo) => photo.id === photoId);
      setFavouritePhotos((prevFavourites : any) =>  [...prevFavourites,photoToAdd]);
    }
  }


    useEffect(() => {
         
         const fetchImages = async () => {
            setLoading(true);
            const clientId = '?client_id=_Mg9AszF0BKBg85MD2WR4bst-M-0wc5srUcxpc5wCIA';
            const mainurl = `https://api.unsplash.com/photos/`;

            try{
                const response = await fetch(`${mainurl}${clientId}`);
                const data = await response.json();
                setPhotos(data);
                setLoading(false);
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }
         }
         fetchImages();
    },[]);

 const handleShare = (photoUrl : any) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check Out this amazing photo : ${photoUrl}`)}`;
    window.open(shareUrl,'_blank');
 }

 const handleDownload = (photoUrl: any , photoId:any) => {
  const link = document.createElement('a');
  link.href = photoUrl;
  link.download = `photo_${photoId}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
 }


  return (
    <main>
      <section className='photos'>
        { Loading ? (<p> Loading... </p>) :
         photos.map((photo) =>  {
          return (
          <article key={photo.id} className={`photo ${favouritePhotos.some((favPhoto:any) => favPhoto.id === photo.id) ? 
          'favourite-photo': "" }`}>
            <img src={photo.urls.regular} alt={photo.alt_description}/>
            <div className='photo-info'>
              <div className="photo-header">
                <h4>{photo.user.name}</h4>
                <button className={`favourite-btn ${favouritePhotos .some((favPhoto) => favPhoto.id === photo.id) ? 
                'active' : ""}`} onClick={() => handleFavouriteClick(photo.id)}><FaHeart /></button>
              </div>
              <div className='photo-actions'>
                <p><FaHeart className='heart-icon'/>{photo.likes}</p>
                <button className='download-btn' onClick={() => handleDownload(photo.urls.regular ,photo.id)}><FaDownload/></button>
                <button className='share-btn' onClick={() => handleShare(photo.urls.regular)}><FaShare/></button>
              </div>
              <a href={photo.user.portfolio_url}>
                <img src={photo.user.profile_image.medium} className="user-img" alt={photo.user.name} />
              </a>
            </div>
          </article> )})
        }
        </section>
    </main>
  );
}

export default Photos
