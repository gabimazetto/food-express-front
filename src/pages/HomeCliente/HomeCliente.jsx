import React from 'react';
import "./HomeCliente.css"
import imgMoto from "../../assets/images/moto.png";
import imgLivro from "../../assets/images/cardapio.png";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


export function HomeCliente() {

  const categorias = [
    {
      id: 1,
      titulo: 'Açaí',
      imagem: require('../../assets/images/1.png')
    },

    {
      id: 2,
      titulo: 'Lanche',
      imagem: require('../../assets/images/2.png')
    },

    {
      id: 3,
      titulo: 'Pizza',
      imagem: require('../../assets/images/3.png')
    },

    {
      id: 4,
      titulo: 'Brasileira',
      imagem: require('../../assets/images/4.png')
    },

    {
      id: 5,
      titulo: 'Italiana',
      imagem: require('../../assets/images/5.png')
    },

    {
      id: 6,
      titulo: 'Sobremesa',
      imagem: require('../../assets/images/6.png')
    },

    {
      id: 7,
      titulo: 'Japonesa',
      imagem: require('../../assets/images/7.png')
    },

    {
      id: 8,
      titulo: 'Chinesa',
      imagem: require('../../assets/images/8.png')
    },

    {
      id: 9,
      titulo: 'Vegetariana',
      imagem: require('../../assets/images/9.png')
    },

    {
      id: 10,
      titulo: 'Padaria',
      imagem: require('../../assets/images/10.png')
    },

    {
      id: 11,
      titulo: 'Marmita',
      imagem: require('../../assets/images/11.png')
    },

    {
      id: 12,
      titulo: 'Carne',
      imagem: require('../../assets/images/12.png')
    },

    {
      id: 13,
      titulo: 'Fit',
      imagem: require('../../assets/images/13.png')
    },

    {
      id: 14,
      titulo: 'Árabe',
      imagem: require('../../assets/images/14.png')
    }
  ]

  return (
    <div>

      {/* Mobile inicio */}
      <section className='sectionRestaurante'>
        <div className='searchBox'>
        <Link to={`/cliente/listar/restaurantes`}>
            <Button className='searchBoxButton'>Veja os Restaurantes Disponíveis</Button>
        </Link>
        </div>
        <div className='melhoresRestaurantes'>
          <div className='melhoresRestaurantesSvg'>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_154_195)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3 33.6C9.43972 33.4137 9.6209 33.2625 9.82918 33.1584C10.0375 33.0542 10.2671 33 10.5 33H18C18.3978 33 18.7794 33.158 19.0607 33.4393C19.342 33.7206 19.5 34.1022 19.5 34.5C19.5 34.8978 19.342 35.2794 19.0607 35.5607C18.7794 35.842 18.3978 36 18 36H11.25L4.5 45H43.5L36.75 36H30C29.6022 36 29.2206 35.842 28.9393 35.5607C28.658 35.2794 28.5 34.8978 28.5 34.5C28.5 34.1022 28.658 33.7206 28.9393 33.4393C29.2206 33.158 29.6022 33 30 33H37.5C37.7329 33 37.9625 33.0542 38.1708 33.1584C38.3791 33.2625 38.5603 33.4137 38.7 33.6L47.7 45.6C47.8671 45.8229 47.9689 46.0878 47.9939 46.3653C48.019 46.6427 47.9662 46.9217 47.8416 47.1708C47.7171 47.42 47.5256 47.6295 47.2886 47.776C47.0516 47.9224 46.7786 48 46.5 48H1.5C1.22143 48 0.948368 47.9224 0.711404 47.776C0.47444 47.6295 0.282939 47.42 0.15836 47.1708C0.0337806 46.9217 -0.0189552 46.6427 0.00606174 46.3653C0.0310787 46.0878 0.13286 45.8229 0.300001 45.6L9.3 33.6Z" fill="#F06000" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12C12.0002 9.69066 12.6668 7.43045 13.9197 5.49056C15.1726 3.55067 16.9586 2.0135 19.0635 1.06351C21.1684 0.113511 23.5027 -0.208957 25.7863 0.134797C28.0699 0.47855 30.2058 1.47392 31.9377 3.00148C33.6696 4.52903 34.924 6.52388 35.5503 8.74665C36.1766 10.9694 36.1482 13.3257 35.4685 15.5327C34.7889 17.7398 33.4869 19.7039 31.7187 21.1893C29.9505 22.6747 27.7912 23.6183 25.5 23.907V40.5C25.5 40.8978 25.342 41.2793 25.0607 41.5606C24.7794 41.842 24.3978 42 24 42C23.6022 42 23.2206 41.842 22.9393 41.5606C22.658 41.2793 22.5 40.8978 22.5 40.5V23.91C19.5989 23.5445 16.9311 22.1323 14.9976 19.9387C13.0642 17.7451 11.9983 14.924 12 12Z" fill="#F06000" />
              </g>
              <defs>
                <clipPath id="clip0_154_195">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className='melhoresRestaurantesTxt'>
            <p className='melhoresRestaurantesTxtP'>Os melhores restaurantes na sua casa</p>
          </div>
        </div>
      </section>

      <section className='sectionComida'>
        <div className='searchBox'>
          <div className='searchBoxComida'>
          <Link to={`/cliente/pesquisa/`}>
            <Button className='searchBoxButton'>Consulte o Cardápio</Button>
          </Link>
          
          </div>
        </div>
        <div className='escolhaComida'>
          <p className='escolhaComidaTxt'>Escolha por categoria</p>
          <span className='escolhaComidaSvg'>
            <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_155_427)">
                <path d="M4.4375 12.5493C8.36469 10.9074 13.9959 9.13682 19.4718 8.58657C25.3736 7.99194 30.3791 8.86613 33.2812 11.9236V55.1714C29.1322 52.8196 23.8738 52.4956 19.0236 52.9838C13.7873 53.5163 8.50669 55.0294 4.4375 56.5826V12.5493ZM37.7188 11.9236C40.6209 8.86613 45.6264 7.99194 51.5283 8.58657C57.0041 9.13682 62.6353 10.9074 66.5625 12.5493V56.5826C62.4889 55.0294 57.2127 53.5118 51.9764 52.9882C47.1218 52.4956 41.8678 52.8151 37.7188 55.1714V11.9236ZM35.5 7.91207C31.1291 4.15351 24.7923 3.59438 19.0236 4.17126C12.3052 4.85019 5.52469 7.15326 1.30019 9.07469C0.912567 9.25099 0.583865 9.5351 0.353318 9.89311C0.122771 10.2511 0.000117911 10.6679 0 11.0938L0 59.9063C0.000102781 60.2775 0.0933523 60.6428 0.271207 60.9686C0.449062 61.2945 0.705836 61.5705 1.01801 61.7714C1.33018 61.9723 1.68778 62.0917 2.05804 62.1186C2.4283 62.1455 2.79939 62.079 3.13731 61.9253C7.05119 60.1503 13.3569 58.0159 19.4673 57.3991C25.7198 56.7689 30.9604 57.7851 33.7694 61.2908C33.9773 61.5499 34.2407 61.759 34.5403 61.9027C34.8398 62.0464 35.1678 62.1211 35.5 62.1211C35.8322 62.1211 36.1602 62.0464 36.4597 61.9027C36.7593 61.759 37.0227 61.5499 37.2306 61.2908C40.0396 57.7851 45.2803 56.7689 51.5283 57.3991C57.6431 58.0159 63.9533 60.1503 67.8627 61.9253C68.2006 62.079 68.5717 62.1455 68.942 62.1186C69.3122 62.0917 69.6698 61.9723 69.982 61.7714C70.2942 61.5705 70.5509 61.2945 70.7288 60.9686C70.9066 60.6428 70.9999 60.2775 71 59.9063V11.0938C70.9999 10.6679 70.8772 10.2511 70.6467 9.89311C70.4161 9.5351 70.0874 9.25099 69.6998 9.07469C65.4753 7.15326 58.6948 4.85019 51.9764 4.17126C46.2077 3.58994 39.8709 4.15351 35.5 7.91207Z" fill="#F06000" />
              </g>
              <defs>
                <clipPath id="clip0_155_427">
                  <rect width="71" height="71" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
        <div className="grid-container">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="categoria-item">
              <Link to={`/cliente/pesquisa/${categoria.titulo}`}>
              <img src={categoria.imagem} alt={categoria.titulo} />
              </Link>
              <h3>{categoria.titulo}</h3>
            </div>
          ))}
        </div>
      </section>
       {/* Mobile fim */}




      {/* Desktop Inicio */}
      <section className='sectionRestauranteDesktop'>
        <div className='divRestauranteDesktop'>
          <div className='melhoresRestaurantesDesktop'>
            <p className='melhoresRestaurantesTxtDesktop'>Os melhores restaurantes na sua casa</p>
          </div>
          <div className='melhoresRestaurantesLoremDesktop'>
          </div>
          <div className='searchBoxDesktop'>
            <div className='searchBoxRestauranteButtonDesktop'>
            <Link to={`/cliente/listar/restaurantes`}>
              <Button className='searchBoxRestauranteButtonStyleDesktop'>
              Veja os Restaurantes Disponíveis
              </Button>
            </Link>
            </div>
            
          </div>
        </div>
        <div className='divRestauranteDesktopLeft'>
          <img className='divRestauranteDesktopImg' src={imgMoto} alt='Imagem Restaurante'></img>
        </div>
      </section>

      <section className='sectionComidaDesktop'>
        <div className='divComidasDesktop'>
          <div className='melhoresComidasDesktop'>
            <p className='melhoresComidasTxtDesktop'>Escolha por Categoria</p>
          </div>
          <div className='melhoresComidasImgDesktop'>
            <img className='melhoresComidasImgStyleDesktop' src={imgLivro} alt='Imagem Livro'></img>
          </div>
          <div className='searchBoxComidasButtonDesktop'>
            <Link to={`/cliente/pesquisa`}>
              <Button className='searchBoxComidasButtonStyleDesktop'>
              Consulte o Cardápio
              </Button>
            </Link>
            </div>
        </div>
        <div className="grid-containerDesktop">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="categoria-itemDesktop">
              <Link to={`/cliente/pesquisa/${categoria.titulo}`}>
              <img className='cetegoria-imgDesktop' src={categoria.imagem} alt={categoria.titulo} />
              </Link>
              <h3 className='categoria-TxtDesktop'>{categoria.titulo}</h3>
            </div>
          ))}
        </div>
      </section>
      {/* Desktop Fim */}


    </div>
  );
}

export default HomeCliente;
