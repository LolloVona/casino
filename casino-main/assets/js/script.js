/*
 *VARIABILI GLOBALI: 
*/    
    var carte=[];//0->indice 1->numero carte 2->seme 3->se estratta  
    var giocatore = []; //carte giocatore
    var banco  = []; //carte del banco
    var gameOver = false;
    var saldo;
    //pg e pb->[0]punteggio [1]->contatoreAssi
    var pg = [0,0]; //punteggio giocatore
    var pb = [0,0]; //punteggio banco
    var puntata = 0; //puntata del giocatore

/* CARICAMENTO BODY */
function avvio(){ 
    nascondiButton();
    creaMazzo();
    saldo = 100;
    document.getElementById("budget").innerText=saldo;
}
function nascondiButton(){
    document.getElementById("stai").style.display="none";
    document.getElementById("raddoppia").style.display="none";
    document.getElementById("split").style.display="none";
    document.getElementById("riavvia").style.display="none";
    document.getElementById("carta").style.display="none";
}

/* GIOCATORE STARTA */
function pronto(){
    var flag = controlla();//funzione che controlla il saldo
    if(flag){
        avviaGioco(); //distribuzione iniziale delle carte sul tavolo
        document.getElementById("pronto").style.display="none";
    }
    else{
        alert('errore');
        document.getElementById("budget").innerText=saldo;
    }
}

/* CONTROLLO SALDO */
function controlla(){
    if(puntata==0){
        return false;
    }
    else{
        return true;
    }
}

/* PUNTATA */ // 
function punta(soldi){
    backup = saldo;
    var budget=Number(document.getElementById("budget").innerText);
    var puntata1=Number(document.getElementById("soldi").innerText);
    if(soldi==1000)
        soldi=budget;
    budget=budget-soldi;
    puntata1=puntata1+soldi;
    if(budget<0){
        document.getElementById("+").disabled=true;
        budget=budget+soldi;
        puntata1=puntata1-soldi;
    }
    else
        document.getElementById("+").disabled=false;
    if(puntata1<0){
        document.getElementById("-").disabled=true;
        budget=budget+soldi;
        puntata1=puntata1-soldi;
    }
    else
        document.getElementById("-").disabled=false;
    document.getElementById("budget").innerText=budget;
    document.getElementById("soldi").innerText=puntata1;
    puntata = puntata1;
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
        var controlloSplit=[];
        for(i = 0;i<4;i++){
            id = estrazione();
            
            if(i%2 == 0){ //se pari del giocatore
                giocatore[contG] = id;
                controlloSplit[contG]=carte[id][1];
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
        document.getElementsByClassName("punteggio")[0].style.display="block";
        document.getElementsByClassName("punteggio")[1].style.display="block";
        document.getElementById("gestioneSoldi").style.display="none";
        if(controlloSplit[0]==controlloSplit[1]){
            document.getElementById("split").style.display="inline";
        }
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
        if(carte[id][1]>10){
            pg[0]=pg[0]+10;
        }
        else
        {
            pg[0]=pg[0]+carte[id][1];
        }
        if(carte[id][1]==1){
            pg[0]=pg[0]+10;
            pg[1]++;
        }
        document.getElementById("pg").innerText=pg[0];
    }
    else{
        idCarta=(banco.length-1)+"-banco";
        //modifica pb
        if(carte[id][1]>10){
            pb[0]=pb[0]+10;
        }
        else
        {
            pb[0]=pb[0]+carte[id][1];
        }
        if(carte[id][1]==1){
            pb[0]=pb[0]+10;
            pb[1]++;
        }
        document.getElementById("pb").innerText=pb[0];
    }
    document.getElementById(idCarta).style.width="150px";
    document.getElementById(idCarta).style.height="150px";
    //modifico il src dell'immagine
    nomeFile = carte[id][1];

    if(carte[id][1]==1){
        nomeFile = "ace";
    }
    if(carte[id][1]==11){
        nomeFile = "jack";
    }
    if(carte[id][1]==12){
        nomeFile = "queen";
    }
    if(carte[id][1]==13){
        nomeFile = "king";
    }

    nomeFile = nomeFile+"_of_"+carte[id][2]+".svg";

    document.getElementById(idCarta).src = "assets/img/svg-cards/"+nomeFile;
    setTimeout(1000);
    controllaPunteggio();
    if(gameOver){
        nascondiButton();
        document.getElementById("riavvia").style.display="inline";
    }
    else{
        document.getElementById("carta").style.display="inline";
        document.getElementById("stai").style.display="inline";
    }
}
function cartaCoperta(){
    idCarta="1-banco";
    //ingrandire la carta
    document.getElementById(idCarta).style.height="150px";
    document.getElementById(idCarta).style.width="150px";
}

function carta(){
    id = estrazione();
    giocatore[giocatore.length] = id;
    mostraCarta(id, true);
}

function controllaPunteggio(){  
    if(pg[0]>21){
        if(pg[1]==0){
            alert("Hai perso!");
            gameOver=true;  
        }
        else{
            pg[0]=pg[0]-10;
            pg[1]--;
            document.getElementById("pg").innerText=pg[0];
            controllaPunteggio();
        }
    }
}