'use strict';

var movimiento=true;
var fichanegra=12;
var fichablanca=12;
$("body").addClass("no_scroll");

$(function(){
    for(var i=1; i<=8;i++){
        $('.container').append('<div class="row" id="fila'+i+'"></div>');
        if(i%2==0){
            for(var j=1; j<=8;j++){
                if(j%2==0){
                    if(i>5||i<4){
                        if(i<4){
                            $('#fila'+i+'').append('<div class="col casillaOscura" id="'+i+','+j+'"><div class="fichaBlanca mt-2" onclick="movimientoBlancas('+i+','+j+')"></div></div>');
                        }else{
                            $('#fila'+i+'').append('<div class="col casillaOscura" id="'+i+','+j+'"><div class="fichaNegras mt-2" onclick="movimientoNegras('+i+','+j+')"></div></div>');
                        }
                        
                    }else{
                        $('#fila'+i+'').append('<div class="col casillaOscura" id="'+i+','+j+'"></div>');
                    }
                    
                }else{
                    $('#fila'+i+'').append('<div class="col casillaClara"></div>');
                }   
            }
        }else{
            for(var j=1; j<=8;j++){
                if(j%2==0){
                    $('#fila'+i+'').append('<div class="col casillaClara" ></div>');
                }else{
                    if(i>5||i<4){
                        if(i<4){
                            $('#fila'+i+'').append('<div class="col casillaOscura" id="'+i+','+j+'" ><div class="fichaBlanca mt-2" onclick="movimientoBlancas('+i+','+j+')"></div></div>');
                        }else{
                            $('#fila'+i+'').append('<div class="col casillaOscura" id="'+i+','+j+'" ><div class="fichaNegras mt-2" onclick="movimientoNegras('+i+','+j+')"></div></div>');
                        }
                    }else{
                        $('#fila'+i+'').append('<div class="col casillaOscura" id="'+i+','+j+'" ></div>');
                    }
                    
                }
            }
        }
    }
});

function ganador(fichablanca,fichanegra){
    if(fichablanca==0){
        swal.fire({
            title: 'Ganaron Negras',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }else
        if(fichanegra==0){
            swal.fire({
                title: 'Ganaron Blancas',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }  
}


// Funciones para el movimiento de las fichas negras
function movimientoNegras(i,j){
    if(movimiento){
        $('.posiblesMovimientos').remove();
        if(j<2 || j>7){
            MovimientoEzquinasNegras(i,j);
        }else{
            proximosNegras(i,j);
        }

    }       
}
function moverNegras(i,j,sitioI,sitioJ){
    let casillaProxima=document.getElementById(''+i+','+j+'');
    let casillaAnterior=document.getElementById(''+sitioI+','+sitioJ+'');
    $('.posiblesMovimientos').remove();
    if(i==1){
        $(casillaProxima).append('<div class="fichamaestraNegra mt-2" onclick="movimientoMaestroNegras('+i+','+j+')"></div></div>');
    }else{
        $(casillaProxima).append('<div class="fichaNegras mt-2" onclick="movimientoNegras('+i+','+j+')"></div></div>');
    }
    
    casillaAnterior.removeChild(casillaAnterior.firstChild);
    movimiento=false;
    if(sitioI-i>1){
        if(sitioJ-j>0){
            i=sitioI-1;
            j=sitioJ-1;
            let casillaBlanca=document.getElementById(''+i+','+j+'');
            casillaBlanca.removeChild(casillaBlanca.firstChild);
            fichablanca=fichablanca-1;
            console.log(fichablanca);
            ganador(fichablanca,fichanegra);
        }else{
            i=sitioI-1;
            j=sitioJ+1;
            let casillaBlanca=document.getElementById(''+i+','+j+'');
            casillaBlanca.removeChild(casillaBlanca.firstChild);
            fichablanca=fichablanca-1;
            console.log(fichablanca);
            ganador(fichablanca,fichanegra);
        }
    }
}
function proximosNegras(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i-1;
    j=j-1;
    let k=j+2;

    let casillaIzquierda=document.getElementById(''+i+','+j+'');
    let hijoCasillaIzquierda=$(casillaIzquierda).children('div');
    let fichaIzquierda=$(hijoCasillaIzquierda).hasClass('fichaBlanca');
    let fichaIzquierdaMaestro=$(hijoCasillaIzquierda).hasClass('fichamaestraBlanca');

    let casillaDerecha=document.getElementById(''+i+','+k+'');
    let hijoCasillaDerecha=$(casillaDerecha).children('div');
    let fichaDerecha=$(hijoCasillaDerecha).hasClass('fichaBlanca');
    let fichaDerechaMaestro=$(hijoCasillaDerecha).hasClass('fichamaestraBlanca');
    if($(casillaIzquierda).is(':empty') && $(casillaDerecha).is(':empty')){
        $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
    }else
        if($(casillaIzquierda).is(':empty')){
            $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            matarNegras(i,k,sitioJ,casillaDerecha);
        }else
            if($(casillaDerecha).is(':empty')){
                $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
                matarNegras(i,j,sitioJ,casillaIzquierda);
            }
    else 
        if($(casillaIzquierda).not(':empty') && $(casillaDerecha).not(':empty')){
            if((fichaDerecha && fichaIzquierda) || (fichaDerechaMaestro && fichaIzquierdaMaestro) || (fichaDerecha && fichaIzquierdaMaestro) || (fichaDerechaMaestro && fichaIzquierda)){
                matarNegras(i,k,sitioJ,casillaDerecha);
                matarNegras(i,j,sitioJ,casillaIzquierda);

            }else
                if(fichaDerecha || fichaDerechaMaestro){
                    matarNegras(i,k,sitioJ,casillaDerecha);
                }else
                    if(fichaIzquierda || fichaIzquierdaMaestro){
                        matarNegras(i,j,sitioJ,casillaIzquierda);
                        
                    }
                    
                
        }
}
function matarNegras(i,j,sitioJ,casilla){
    let sitioI=i+1;
    let hijoCasilla=$(casilla).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaBlanca');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestraBlanca');
    if(j>sitioJ){
        if(ficha || fichaMaestro){
            i=i-1;
            j=j+1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
        }
    }else{
        if(ficha || fichaMaestro){
            i=i-1;
            j=j-1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
       
        }
    }

        
}
function matarEzquinasNegras(i,j,id){
    let hijoCasilla=$(id).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaBlanca');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestraBlanca');
    if(j==2||j==7){
        let sitioI=i+1;
        let sitioJ=j-1;
        if(j!=7){
            if(ficha || fichaMaestro){
                i=i-1;
                j=j+1;
                let proximo=document.getElementById(''+i+','+j+'');
                if($(proximo).is(':empty')){
                    $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
                }
            }
        }else{
            if(ficha || fichaMaestro){
                i=i-1;
                j=j-1;
                sitioJ=j+2;
                let proximo=document.getElementById(''+i+','+j+'');
                if($(proximo).is(':empty')){
                    $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
                }
            }
        }
    }
     
}
function MovimientoEzquinasNegras(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i-1;
    if(j%2!=0){
        j=j+1;
        let id=document.getElementById(''+i+','+j+'');
        if($(id).is(':empty')){
            $(id).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');

        }else{
            matarEzquinasNegras(i,j,id);
        }
       
    }else{
        j=j-1;
        let id=document.getElementById(''+i+','+j+'');
        if($(id).is(':empty')){
            $(id).append('<div class="posiblesMovimientos mt-2" onclick="moverNegras('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        }else{
            matarEzquinasNegras(i,j,id);
        }
        
    }
}


//Funciones de los movimientos de las fichas blancas
function movimientoBlancas(i,j){
    if(!movimiento){
        $('.posiblesMovimientos').remove();
        if(j<2 || j>7){
            MovimientoEzquinasBlancas(i,j);
        }else{
            proximosBlancas(i,j);
        }
         
    }
   
}
function moverBlancas(i,j,sitioI,sitioJ){
    let casillaProxima=document.getElementById(''+i+','+j+'');
    let casillaAnterior=document.getElementById(''+sitioI+','+sitioJ+'');
    $('.posiblesMovimientos').remove();
    if(i==8){
        $(casillaProxima).append('<div class="fichamaestraBlanca mt-2" onclick="movimientoMaestroBlanco('+i+','+j+')"></div></div>');
    }else{
        $(casillaProxima).append('<div class="fichaBlanca mt-2" onclick="movimientoBlancas('+i+','+j+')"></div></div>');
    }
    
    casillaAnterior.removeChild(casillaAnterior.firstChild);
    movimiento=true;
    if(i-sitioI>1){
        if(j-sitioJ>0){
            i=sitioI+1;
            j=sitioJ+1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichanegra=fichanegra-1;
            console.log(fichanegra);
            ganador(fichablanca,fichanegra);
        }else{
            i=sitioI+1;
            j=sitioJ-1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichanegra=fichanegra-1;
            console.log(fichanegra);
            ganador(fichablanca,fichanegra);
        }
    }

}
function proximosBlancas(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i+1;
    j=j+1;
    let k=j-2;
    let casillaIzquierda=document.getElementById(''+i+','+j+'');
    let hijoCasillaIzquierda=$(casillaIzquierda).children('div');
    let fichaIzquierda=$(hijoCasillaIzquierda).hasClass('fichaNegras');
    let fichaIzquierdaMaestro=$(hijoCasillaIzquierda).hasClass('fichamaestraNegra');

    let casillaDerecha=document.getElementById(''+i+','+k+'');
    let hijoCasillaDerecha=$(casillaDerecha).children('div');
    let fichaDerecha=$(hijoCasillaDerecha).hasClass('fichaNegras');
    let fichaDerechaMaestro=$(hijoCasillaDerecha).hasClass('fichamaestraNegra');

    if($(casillaIzquierda).is(':empty') && $(casillaDerecha).is(':empty')){
        $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
    }else
        if($(casillaIzquierda).is(':empty')){
            $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            matarBlancas(i,k,sitioJ,casillaDerecha);
        }else
            if($(casillaDerecha).is(':empty')){
                $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
                matarBlancas(i,j,sitioJ,casillaIzquierda);
            }
            
    else 
        if($(casillaIzquierda).not(':empty') && $(casillaDerecha).not(':empty')){
            if((fichaDerecha && fichaIzquierda) || (fichaDerechaMaestro && fichaIzquierdaMaestro) || (fichaDerecha && fichaIzquierdaMaestro) || (fichaDerechaMaestro && fichaIzquierda)){
                    matarBlancas(i,k,sitioJ,casillaDerecha);
                    matarBlancas(i,j,sitioJ,casillaIzquierda);
    
            }else
                if(fichaDerecha || fichaDerechaMaestro){
                    matarBlancas(i,k,sitioJ,casillaDerecha);
                }else
                    if(fichaIzquierda || fichaIzquierdaMaestro){
                        matarBlancas(i,j,sitioJ,casillaIzquierda);
                            
                    }
                        
                    
        }    
    
   
}
function matarBlancas(i,j,sitioJ,casilla){
    let sitioI=i-1;
    let hijoCasilla=$(casilla).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaNegras');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestraNegra');
    if(j>sitioJ){
        if(ficha || fichaMaestro){
            i=i+1;
            j=j+1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
        }
    }else{
        if(ficha || fichaMaestro){
            i=i+1;
            j=j-1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
       
        }
    }
}
function matarEzquinasBlancas(i,j,casilla){
    let hijoCasilla=$(casilla).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaNegras');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestraNegra');
    if(j==2||j==7){
        let sitioI=i-1;
        let sitioJ=j-1;
        if(j!=7){
            if(ficha || fichaMaestro){
                i=i+1;
                j=j+1;
                let proximo=document.getElementById(''+i+','+j+'');
                if($(proximo).is(':empty')){
                    $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
                }
            }
        }else{
            if(ficha || fichaMaestro){
                i=i+1;
                j=j-1;
                sitioJ=j+2;
                let proximo=document.getElementById(''+i+','+j+'');
                if($(proximo).is(':empty')){
                    $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
                }
            }
        }
    }
}
function MovimientoEzquinasBlancas(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i+1;
    if(j%2!=0){
        j=j+1;
        let id=document.getElementById(''+i+','+j+'');
        if($(id).is(':empty')){
            $(id).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        }else{
            matarEzquinasBlancas(i,j,id);
        }
       
    }else{
        j=j-1;
        let id=document.getElementById(''+i+','+j+'');
        if($(id).is(':empty')){
            $(id).append('<div class="posiblesMovimientos mt-2" onclick="moverBlancas('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        }else{
            matarEzquinasBlancas(i,j,id);
        }
        
    }
}




//movimiento maestro blanco
function movimientoMaestroBlanco(i,j){
    if(!movimiento){
        $('.posiblesMovimientos').remove();
        if(i==8){
            proximosMaestroArribaBlancas(i,j);
        }else{
            proximosMaestroArribaBlancas(i,j);
            proximosMaestroAbajoBlancas(i,j);
       
        }
    }
    
}
function proximosMaestroAbajoBlancas(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i+1;
    j=j+1;
    let k=j-2;

    let casillaIzquierda=document.getElementById(''+i+','+j+'');
    let hijoCasillaIzquierda=$(casillaIzquierda).children('div');
    let fichaIzquierda=$(hijoCasillaIzquierda).hasClass('fichaNegras');

    let casillaDerecha=document.getElementById(''+i+','+k+'');
    let hijoCasillaDerecha=$(casillaDerecha).children('div');
    let fichaDerecha=$(hijoCasillaDerecha).hasClass('fichaNegras');
    if($(casillaIzquierda).is(':empty') && $(casillaDerecha).is(':empty')){
        $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasAbajo('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
    }else
        if($(casillaIzquierda).is(':empty')){
            $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            matarMaestroBlancasAbajo(i,k,sitioJ,casillaDerecha);
        }else
            if($(casillaDerecha).is(':empty')){
                $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasAbajo('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
                matarMaestroBlancasAbajo(i,j,sitioJ,casillaIzquierda);
            }
            
    else 
        if($(casillaIzquierda).not(':empty') && $(casillaDerecha).not(':empty')){
            if(fichaDerecha && fichaIzquierda){
                    matarMaestroBlancasAbajo(i,k,sitioJ,casillaDerecha);
                    matarMaestroBlancasAbajo(i,j,sitioJ,casillaIzquierda);
    
            }else
                if(fichaDerecha){
                    matarMaestroBlancasAbajo(i,k,sitioJ,casillaDerecha);
                }else
                    if(fichaIzquierda){
                        matarMaestroBlancasAbajo(i,j,sitioJ,casillaIzquierda);
                            
                    }
                        
                    
        }
}
function proximosMaestroArribaBlancas(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i-1;
    j=j-1;
    let k=j+2;

    let casillaIzquierda=document.getElementById(''+i+','+j+'');
    let hijoCasillaIzquierda=$(casillaIzquierda).children('div');
    let fichaIzquierda=$(hijoCasillaIzquierda).hasClass('fichaNegras');

    let casillaDerecha=document.getElementById(''+i+','+k+'');
    let hijoCasillaDerecha=$(casillaDerecha).children('div');
    let fichaDerecha=$(hijoCasillaDerecha).hasClass('fichaNegras');

    if($(casillaIzquierda).is(':empty') && $(casillaDerecha).is(':empty')){
        $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasArriba('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
    }else
        if($(casillaIzquierda).is(':empty')){
            $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            matarMaestroBlacasArriba(i,k,sitioJ,casillaDerecha);
        }else
            if($(casillaDerecha).is(':empty')){
                $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasArriba('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
                matarMaestroBlacasArriba(i,j,sitioJ,casillaIzquierda);
            }
    else 
        if($(casillaIzquierda).not(':empty') && $(casillaDerecha).not(':empty')){
            if(fichaDerecha && fichaIzquierda){
                matarMaestroBlacasArriba(i,k,sitioJ,casillaDerecha);
                matarMaestroBlacasArriba(i,j,sitioJ,casillaIzquierda);

            }else
                if(fichaDerecha){
                    matarMaestroBlacasArriba(i,k,sitioJ,casillaDerecha);
                }else
                    if(fichaIzquierda){
                        matarMaestroBlacasArriba(i,j,sitioJ,casillaIzquierda);
                        
                    }
                    
                
        }
}
function moverMaestroBlancasAbajo(i,j,sitioI,sitioJ){
    let casillaProxima=document.getElementById(''+i+','+j+'');
    let casillaAnterior=document.getElementById(''+sitioI+','+sitioJ+'');
    $('.posiblesMovimientos').remove();
    $(casillaProxima).append('<div class="fichamaestraBlanca mt-2" onclick="movimientoMaestroBlanco('+i+','+j+')"></div></div>');
    casillaAnterior.removeChild(casillaAnterior.firstChild);
    movimiento=true;
    if(i-sitioI>1){
        if(j-sitioJ>0){
            i=sitioI+1;
            j=sitioJ+1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichanegra=fichanegra-1;
            console.log(fichanegra);
            ganador(fichablanca,fichanegra);
        }else{
            i=sitioI+1;
            j=sitioJ-1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichanegra=fichanegra-1;
            console.log(fichanegra);
            ganador(fichablanca,fichanegra);
        }
    }
}
function moverMaestroBlancasArriba(i,j,sitioI,sitioJ){
    let casillaProxima=document.getElementById(''+i+','+j+'');
    let casillaAnterior=document.getElementById(''+sitioI+','+sitioJ+'');
    $('.posiblesMovimientos').remove();
    $(casillaProxima).append('<div class="fichamaestraBlanca mt-2" onclick="movimientoMaestroBlanco('+i+','+j+')"></div></div>');
    casillaAnterior.removeChild(casillaAnterior.firstChild);
    movimiento=true;
    if(sitioI-i>1){
        if(sitioJ-j>0){
            i=sitioI-1;
            j=sitioJ-1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichanegra=fichanegra-1;
            console.log(fichanegra);
            ganador(fichablanca,fichanegra);
        }else{
            i=sitioI-1;
            j=sitioJ+1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichanegra=fichanegra-1;
            console.log(fichanegra);
            ganador(fichablanca,fichanegra);
        }
    }
}
function matarMaestroBlancasAbajo(i,j,sitioJ,casilla){
    let sitioI=i-1;
    let hijoCasilla=$(casilla).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaNegras');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestroNegra');
    if(j>sitioJ){
        if(ficha || fichaMaestro){
            i=i+1;
            j=j+1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
        }
    }else{
        if(ficha || fichaMaestro){
            i=i+1;
            j=j-1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick=" moverMaestroBlancasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
       
        }
    }
}
function matarMaestroBlacasArriba(i,j,sitioJ,casilla){
    let sitioI=i+1;
    let hijoCasilla=$(casilla).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaNegras');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestroNegra');
    if(j>sitioJ){
        if(ficha || fichaMaestro){
            i=i-1;
            j=j+1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
        }
    }else{
        if(ficha || fichaMaestro){
            i=i-1;
            j=j-1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroBlancasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
       
        }
    }

        
}

//movimiento maestro negra
function movimientoMaestroNegras(i,j){
    if(movimiento){
        $('.posiblesMovimientos').remove();
        if(i==1){
            proximosMaestroAbajoNegras(i,j);
        }else{
            proximosMaestroArribaNegras(i,j);
            proximosMaestroAbajoNegras(i,j);
       
        }   
    }
    
}
function proximosMaestroAbajoNegras(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i+1;
    j=j+1;
    let k=j-2;

    let casillaIzquierda=document.getElementById(''+i+','+j+'');
    let hijoCasillaIzquierda=$(casillaIzquierda).children('div');
    let fichaIzquierda=$(hijoCasillaIzquierda).hasClass('fichaBlanca');

    let casillaDerecha=document.getElementById(''+i+','+k+'');
    let hijoCasillaDerecha=$(casillaDerecha).children('div');
    let fichaDerecha=$(hijoCasillaDerecha).hasClass('fichaBlanca');
    if($(casillaIzquierda).is(':empty') && $(casillaDerecha).is(':empty')){
        $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasAbajo('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
    }else
        if($(casillaIzquierda).is(':empty')){
            $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            matarMaestroNegrasAbajo(i,k,sitioJ,casillaDerecha);
        }else
            if($(casillaDerecha).is(':empty')){
                $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasAbajo('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
                matarMaestroNegrasAbajo(i,j,sitioJ,casillaIzquierda);
            }
            
    else 
        if($(casillaIzquierda).not(':empty') && $(casillaDerecha).not(':empty')){
            if(fichaDerecha && fichaIzquierda){
                    matarMaestroNegrasAbajo(i,k,sitioJ,casillaDerecha);
                    matarMaestroNegrasAbajo(i,j,sitioJ,casillaIzquierda);
    
            }else
                if(fichaDerecha){
                    matarMaestroNegrasAbajo(i,k,sitioJ,casillaDerecha);
                }else
                    if(fichaIzquierda){
                        matarMaestroNegrasAbajo(i,j,sitioJ,casillaIzquierda);
                            
                    }
                        
                    
        }
}
function proximosMaestroArribaNegras(i,j){
    let sitioI=i;
    let sitioJ=j;
    i=i-1;
    j=j-1;
    let k=j+2;

    let casillaIzquierda=document.getElementById(''+i+','+j+'');
    let hijoCasillaIzquierda=$(casillaIzquierda).children('div');
    let fichaIzquierda=$(hijoCasillaIzquierda).hasClass('fichaBlanca');

    let casillaDerecha=document.getElementById(''+i+','+k+'');
    let hijoCasillaDerecha=$(casillaDerecha).children('div');
    let fichaDerecha=$(hijoCasillaDerecha).hasClass('fichaBlanca');

    if($(casillaIzquierda).is(':empty') && $(casillaDerecha).is(':empty')){
        $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
        $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasArriba('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
    }else
        if($(casillaIzquierda).is(':empty')){
            $(casillaIzquierda).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            matarMaestroNegrasArriba(i,k,sitioJ,casillaDerecha);
        }else
            if($(casillaDerecha).is(':empty')){
                $(casillaDerecha).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasArriba('+i+','+k+','+sitioI+','+sitioJ+')"></div></div>');
                matarMaestroNegrasArriba(i,j,sitioJ,casillaIzquierda);
            }
    else 
        if($(casillaIzquierda).not(':empty') && $(casillaDerecha).not(':empty')){
            if(fichaDerecha && fichaIzquierda){
                matarMaestroNegrasArriba(i,k,sitioJ,casillaDerecha);
                matarMaestroNegrasArriba(i,j,sitioJ,casillaIzquierda);

            }else
                if(fichaDerecha){
                    matarMaestroNegrasArriba(i,k,sitioJ,casillaDerecha);
                }else
                    if(fichaIzquierda){
                        matarMaestroNegrasArriba(i,j,sitioJ,casillaIzquierda);
                        
                    }
                    
                
        }
}
function moverMaestroNegrasAbajo(i,j,sitioI,sitioJ){
    let casillaProxima=document.getElementById(''+i+','+j+'');
    let casillaAnterior=document.getElementById(''+sitioI+','+sitioJ+'');
    $('.posiblesMovimientos').remove();
    $(casillaProxima).append('<div class="fichamaestraNegra mt-2" onclick="movimientoMaestroNegras('+i+','+j+')"></div></div>');
    casillaAnterior.removeChild(casillaAnterior.firstChild);
    movimiento=false;
    if(i-sitioI>1){
        if(j-sitioJ>0){
            i=sitioI+1;
            j=sitioJ+1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichablanca=fichablanca-1;
            console.log(fichablanca);
            ganador(fichablanca,fichanegra);
        }else{
            i=sitioI+1;
            j=sitioJ-1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichablanca=fichablanca-1;
            console.log(fichablanca);
            ganador(fichablanca,fichanegra);
        }
    }
}
function moverMaestroNegrasArriba(i,j,sitioI,sitioJ){
    let casillaProxima=document.getElementById(''+i+','+j+'');
    let casillaAnterior=document.getElementById(''+sitioI+','+sitioJ+'');
    $('.posiblesMovimientos').remove();
    $(casillaProxima).append('<div class="fichamaestraNegra mt-2" onclick="movimientoMaestroNegras('+i+','+j+')"></div></div>');
    casillaAnterior.removeChild(casillaAnterior.firstChild);
    movimiento=false;
    if(sitioI-i>1){
        if(sitioJ-j>0){
            i=sitioI-1;
            j=sitioJ-1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichablanca=fichablanca-1;
            console.log(fichablanca);
            ganador(fichablanca,fichanegra);
        }else{
            i=sitioI-1;
            j=sitioJ+1;
            let casillaNegra=document.getElementById(''+i+','+j+'');
            casillaNegra.removeChild(casillaNegra.firstChild);
            fichablanca=fichablanca-1;
            console.log(fichablanca);
            ganador(fichablanca,fichanegra);
        }
    }
}
function matarMaestroNegrasAbajo(i,j,sitioJ,casilla){
    let sitioI=i-1;
    let hijoCasilla=$(casilla).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaBlanca');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestroBlanca');
    if(j>sitioJ){
        if(ficha || fichaMaestro){
            i=i+1;
            j=j+1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
        }
    }else{
        if(ficha || fichaMaestro){
            i=i+1;
            j=j-1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick=" moverMaestroNegrasAbajo('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
       
        }
    }
}
function matarMaestroNegrasArriba(i,j,sitioJ,casilla){
    let sitioI=i+1;
    let hijoCasilla=$(casilla).children('div');
    let ficha=$(hijoCasilla).hasClass('fichaBlanca');
    let fichaMaestro=$(hijoCasilla).hasClass('fichamaestroBlanca');
    if(j>sitioJ){
        if(ficha || fichaMaestro){
            i=i-1;
            j=j+1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
        }
    }else{
        if(ficha || fichaMaestro){
            i=i-1;
            j=j-1;
            let proximo=document.getElementById(''+i+','+j+'');
            if($(proximo).is(':empty')){
                $(proximo).append('<div class="posiblesMovimientos mt-2" onclick="moverMaestroNegrasArriba('+i+','+j+','+sitioI+','+sitioJ+')"></div></div>');
            }
       
        }
    }

        
}