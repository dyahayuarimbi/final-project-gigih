import React, { useState } from "react";
import "./index.css";
import Button from '@mui/material/Button';

interface Iprops{
  img: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  toggleSelect : ()=>void;
}

const Tracks : React.FC<Iprops>= ({ title, artist, img, album, duration, toggleSelect })=> {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleToggleSelect : () => void = () => {
  setIsSelected(!isSelected)
  toggleSelect()
};

  return (
    <div datatest-id="tracks-playlist" className="Card">
      <img src={img} alt={title} className="card_img" />
      <div className="card-wrapper">
        <h3 className="card_album">{title}</h3>
        <h3 className="card_artist">{artist}</h3>
        <h3 className="card_name_album">{album}</h3>
        <h3 className="card_duration">{duration}</h3>
      <Button type="submit" variant="contained" color="success" className='btn-select' onClick={handleToggleSelect}>
        {isSelected ? 'Deselect' : 'Select'}
      </Button>
      </div>
    </div>
  )
}
export default Tracks;