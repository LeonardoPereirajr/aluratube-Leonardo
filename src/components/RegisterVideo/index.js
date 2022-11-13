import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";



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

const PROJECT_URL = "https://fdmvidiqrjpcjgvcrsrj.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbXZpZGlxcmpwY2pndmNyc3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNDQ3MjcsImV4cCI6MTk4MzkyMDcyN30.JyIrgOFcPe6-MCwMfkNTU4VRTxtA5fPZNyrknPXgJ8c";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Começando com..", url: "https://www.youtube.com/watch?v=lM9JAKH1UyA&t=392",playlist: "jogos"},
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

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

                            
                            <input
								placeholder="Nome da playlist"
								name="playlist"
								value={formCadastro.values.playlist}
								onChange={formCadastro.handleChange}
								required
							/>
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