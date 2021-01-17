import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <div className="container-fluid p-5 homepage-header center">
          <header>
            <div>
              <h1 className="p-5 m-4">Nástěnka úkolů</h1>
              <h4 style={{ fontWeight: "400" }}>
                Závěrečná práce 4. ročníku - SŠPU Opava
              </h4>
            </div>
          </header>
        </div>
        <div className="container">
          <div className="about py-4 px-5 my-5">
            <div className="row center">
              <div className="col-12">
                <div
                  className="p-3 mb-5"
                  style={{ borderBottom: "#209cee 1px solid" }}
                >
                  <h2>O projektu</h2>
                </div>
              </div>
            </div>
            <div className="row pb-4 pt-1">
              <div
                className="col-6"
                style={{ borderRight: "#209cee 1px dotted" }}
              >
                <p className="px-5 text-justify">
                  Cílem tohoto projektu bylo vytvořit nástěnku úkolů pro více
                  uživatelů, kde můžou mít různí uživatelé různé role a můžou
                  být přiřazováni do různých skupin. Back-end chci vytvořit v
                  Django REST, data ukládat do nějaké SQL databáze a aplikaci
                  jako takovou vyvíjet pro Docker. Bylo by vhodné ukládat k
                  příspěvkům (úkolům) přílohy a externí soubory, zaznamenávat
                  čas a mít možnost provádět řazení a vyhledávání. Dále bych
                  chtěl umožnit autentifikaci uživatelů pomocí E-mailu při
                  registraci/zapomenutí hesla (na e-mail uživatele přijde zpráva
                  s odkazem/kontrolním kódem).
                </p>
              </div>
              <div className="col-6">
                <p className="px-5 text-justify">
                  Aplikace je rozdělena na 3 Docker kontejnery (front-end,
                  back-end ve formě REST API a databázový server). Pro REST API
                  je použitý framework Django REST a dj-rest-auth (dodatečný
                  balíček pro autentifikaci, na který odkazuje dokumentace
                  Djanga REST). Data jsou pak uložena v PostgreSQL databázi a
                  přes API se tahají na front-end. Na front-endu se používají
                  technologie React.js pro dynamické vykreslování stránky za
                  pomocí komponentů, React-router-dom pro použivání url adres na
                  front-endu, Redux a Redux React pro globální ukládání dat v
                  aplikaci, Axios pro komunikaci s REST API a Bootstrap 4 pro
                  dodatečný vzhled a responzivitu.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
