"use client"

import React from "react";

function Info() {
  return (
    <React.Fragment>
      <div className="overflow-hidden bg-[#f5f5dc] py-[10px]">
        <div className="marquee whitespace-nowrap text-[16px] text-center">
          ¡Promos todos los fines de semana! 25% de descuento en productos seleccionados
        </div>
      </div>
      <style jsx>{`
        .marquee {
          display: inline-block;
          padding-left: 30%;
          animation: marquee 15s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </React.Fragment>
  );
}

export default Info;
