import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";
import { videoService } from "../services/videoService";
import config from "../../../config.json";


function getThumbnail(url) {
    const thumb = `${url.split('v=')[1]}`;
    return `https://img.youtube.com/vi/${thumb.split('&')[0]}/hqdefault.jpg`;

}

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = 'https://fdmvidiqrjpcjgvcrsrj.supabase.co';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbXZpZGlxcmpwY2pndmNyc3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNDQ3MjcsImV4cCI6MTk4MzkyMDcyN30.JyIrgOFcPe6-MCwMfkNTU4VRTxtA5fPZNyrknPXgJ8c';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Digite o titulo", url: "https://www.youtube..." },
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
    const playlistNames = Object.keys(config.playlists)
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                        // Contrato entre o nosso Front e o BackEnd
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: formCadastro.values.playlist,
                        })
                            .then((oqueveio) => {
                                console.log(oqueveio);
                                console.log(oqueveio.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <select 
                                name="playlist" 
                                defaultValue="" 
                                onChange={formCadastro.handleChange}>
                                <option value="" disabled>
                                    Selecione uma playlist...
                                </option>
                                {playlistNames.map((playlistName) => {
                                    return (
                                        <option key={playlistName} value={playlistName}>{playlistName}</option>
                                    )
                                })}
                            </select>

                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}