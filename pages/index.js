import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/components";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorites } from "../src/components/Favorites";
import React from "react";
import { createClient } from "@supabase/supabase-js";
import { videoService } from "../src/components/services/videoService";


function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});  


    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data?.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });

                setPlaylists(novasPlaylists);
                console.log(novasPlaylists);
            });
    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header/>
                <Timeline searchValue={valorDoFiltro} playlists={playlists}>
                    Conteúdo
                    
                </Timeline>
                <Favoritos favoritos={config.favoritos} />
                <Footer />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.backgroundLevel1};

.user-info img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
}
.imgBanner {
    width: 100%;
    height: 30vh;
    object-fit: cover;
}
`;
function Header() {
    return (
        <StyledHeader>
            <section>
                <img src={config.banner} className="imgBanner" />
            </section>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...propriedades }) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(propriedades.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favoritos(props) {
    const listFavoritos = Object.keys(props.favoritos);

    return (
        <StyledFavorites>
            {listFavoritos.map((listFavoritos) => {
                const canais = props.favoritos[listFavoritos];
                console.log(canais);
                return (
                    <section>
                        <h2>{listFavoritos}</h2>
                        <div>
                            {canais.map((canais) => {
                                return (
                                    <a href={canais.urlUser}>
                                        <img src={canais.imgUser} />
                                        <span>
                                            {canais.nameUser}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledFavorites>
    )
}
const StyledFooter = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    text-align: center;
    .companyLink{
        color: ${({ theme }) => theme.textColorBase};
    }
    footer{
        margin: 40px;
        font-size: 12px;
    }
`;
function Footer() {
    return (
        <StyledFooter>
            <footer>Feito por <a className="companyLink" href="https://github.com/LeonardoPereirajr" target="_Blank">Leonardo Pereira</a> durante o evento Imersão React da plataforma <a className="companyLink" href="https://www.alura.com.br/" target="_Blank">Alura</a> © 2022</footer>
        </StyledFooter>
    )
}