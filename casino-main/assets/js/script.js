/*
 *VARIABILI GLOBALI: 
*/    
    var carte=[];//0->indice 1->numero carte 2->seme 3->se estratta  
    var giocatore = []; //carte giocatore
    var banco  = []; //carte del banco

/* CARICAMENTO BODY */
function avvio(){ 
    creaMazzo(); 

}

/* GIOCATORE STARTA */
function pronto(){
    controlla();//funzione che controlla il saldo
    avviaGioco(); //distribuzione iniziale delle carte sul tavolo

}

/* CONTROLLO SALDO */
function controlla(){

}

/* CREAZIONE DEL MAZZO */
    /*
     *   ORGANIZZAZIONE:
     *   {0-12} => CUORI
     *   {13-25} => QUADRI
     *   {26-38} => PICCHE
     *   {39-51} => FIORI
    */     
function creaMazzo(){
    var j=1;
    for(i=0;i<52;i++){
        carte[i]=[];  //creo riga in matrice
        carte[i][0]=i;  //assegno indice
        carte[i][1]=j;  //assegno numero carta
        carte[i][3] = false;  //se è stata estratta o no
        j++; //aumento numero carta
        if(i<13)
            carte[i][2]="hearts";  
        else{
            if(i<26)
                carte[i][2]="diamonds";
            else{
                if(i<39)
                    carte[i][2]="spades";
                else
                carte[i][2]="clubs";
            }
        }
        if(((i+1)%13)==0){
            j=1;
        }
    }
}

/* Avviamento della partita */
function avviaGioco(){
    //dobbiamo fare 4 estrazioni iniziali
        contG = 0;
        contB = 0;
        for(i = 0;i<4;i++){
            id = estrazione();
            
            if(i%2 == 0){ //se pari del giocatore
                giocatore[contG] = id;
                contG++;
                mostraCarta(id,true);
            }else{
                banco[contB] = id;
                contB++;
                if(i==1)
                    mostraCarta(id,false);
                else
                cartaCoperta();
            }
        }
    //mostro le carte:
    
}

function estrazione(){
    do{
         numero = Math.floor(Math.random() * 52);
    }while(carte[numero][3]==true);
    carte[numero][3] = true;
    return numero;
}

function mostraCarta(id,isGiocatore){
    if(isGiocatore){
        idCarta=(giocatore.length-1)+"-giocatore";
    }
    else{
        idCarta=(banco.length-1)+"-banco";
    }
    document.getElementById(idCarta).style.width="100px";
    document.getElementById(idCarta).style.height="100px";
}
function cartaCoperta(){
    idCarta="1-banco";
    //ingrandire la carta
    document.getElementById(idCarta).style.height="100px";
    document.getElementById(idCarta).style.width="100px";
}