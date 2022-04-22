import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import config from "../../lib/config";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./index.css";
import { TRootState } from "../../store";

interface Iprops {
  onSuccess: (tracks: any[], text: string) => void;
}

const Search : React.FC<Iprops> = ({ onSuccess }) => {
    const accessToken: string = useSelector (
      (state:TRootState) => state.auth.accessToken);

    const [text, setText] = useState<string>("");

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value)
};

const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const requestOptions = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
        .then((data) => data.json());

      const tracks = response.tracks.items;
      onSuccess(tracks,text);
    } catch (e) {
      alert(e);
    }
}

    return (
        <form data-testid="SearchBarForm" className='form-search' onSubmit={onSubmit}>
        <TextField id="outlined-basic" label="Search Artist or Song" className='form-input' onChange={handleInput}/>
        <Button type="submit" variant="contained" className="search-form">Search</Button>
        </form>
    )
    }

 export default Search;