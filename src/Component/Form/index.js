import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from "../../lib/fetchApi";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import './index.css';

const sendFormNetworkCall = (data) => console.log(data);

const Form = ({ uriTracks }) =>{
   const accessToken = useSelector((state)=>state.auth.accessToken);
   const userId = useSelector((state) => state.auth.user.id);
   const [form, setForm] = useState({
        title:'',
        description:''
    });
 
    const handleForm = async (e) =>{
        e.preventDefault();
        sendFormNetworkCall(form);

        try {
            const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
              name: form.title,
              description: form.description,
            });
    
            await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);
    
            alert('Playlist created successfully');
    
            setForm({ title: '', description: '' });
          } catch (error) {
            alert('error');
          }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({...form, [name]:value});
        console.log(form);
    };

    const theme = createTheme({
        Create: {
          Create: {
            // Purple and green play nicely together.
            main: purple[500],
          },
        },
      });

    return(
        <form className="Form" onSubmit={handleForm}>
            <div className="Form-content">
                <div className="Form-header">
                    <h4 className="Form-title">Create Playlist</h4>
                </div>
                <div className="Form-body">
                    <div className="title">
                        <p htmlFor="title">Title</p>
                        <input
                            className='input'
                            minLength={10}
                            type="text" 
                            name='title' 
                            value={form.title} 
                            onChange={handleChange}
                            required
                            data-testid="titleplaylist" 
                        />
                    </div>
                    <div className="desc">
                        <p htmlFor="description">Description</p>
                        <input
                            className='input'
                            type="text" 
                            name='description' 
                            value={form.description} 
                            onChange={handleChange} 
                            data-testid="descriptionplaylist" 
                        />
                    </div>
                </div>
                <div className="Form-footer">
                <ThemeProvider theme={theme}>
                    <Button type="submit" variant="contained">Create</Button>
                </ThemeProvider>
                </div>
            </div>
        </form>
    );

}

export default Form;