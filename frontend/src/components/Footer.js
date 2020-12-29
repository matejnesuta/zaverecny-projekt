import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="p-4 mt-2 container-fluid">
        <div className="row">
          <div className="col-6 p-3">
            <h4 className="mb-4">Frontend</h4>
            <ul className="fa-ul">
              <li className="p-1">Autor: Martin Dzida</li>
              <li className="p-1">Technologie: React</li>
              <li className="p-1">
                <a
                  href="https://github.com/martindzida/zaverecny_projekt"
                  style={{ color: "white" }}
                >
                  <i className="fa fa-github p-2" aria-hidden="true"></i>
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 p-3">
            <h4 className="mb-4">Backend</h4>
            <ul className="fa-ul">
              <li className="p-1">Autor: Matěj Nešuta</li>
              <li className="p-1">Technologie: Django REST</li>
              <li className="p-1">
                <a
                  href="https://github.com/matejnesuta/zaverecny-projekt"
                  style={{ color: "white" }}
                >
                  <i className="fa fa-github p-2" aria-hidden="true"></i>
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <p className="lead">
              <i className="fa fa-copyright p-2" aria-hidden="true"></i> Le
              epique programuè clique 2020
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
