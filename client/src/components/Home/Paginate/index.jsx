import React from "react";
import './paginate.modules.css'

function Paginate ({countriesPerPage, totalCountries, paginate}) {
    const pageNumbers = [];
    //Redondea todos mis paises sobre la cantidad de paises que quiero por pagina
    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        //Push a mi arreglo vacio para que tome el valor de esa itreción
        pageNumbers.push(i);
    }
    //la cantidad de páginas es igual a la cantidad de paises dividido por la cantidad de paises por pagina
    return (
        //Renderizo y mapeo pageNumbers y devuelvo en ese arreglo cada uno de los numeros desde el 1 hasta totalPages
        <>
            <div className="pagination">
                {pageNumbers.map((number) => (
                        <li key={number} >
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))
                }
            </div>
        </>
    );
}


export default Paginate;
