//array dos nao gostos//
var hate = new Array(6);

//dicionario dos gostos (nao preciso de definir dimensao)
var megusta = {};

//mapa das divs dos livros
var books = {};

$("#livro_4").hide();
$("#livro_5").hide();
$("#livro_6").hide();

//botao gosto
function gosto(love){
	if(megusta[love]){
		megusta[love]++;
	}else{ 
		megusta[love]=1;
	}
	var luv = "#" + love;
	$(luv).html(megusta[love]);
}

//botao nao gosto
function naogosto(dislike){
	var bi = dislike - 1;
	if(hate[bi]){
		hate[bi]++;
	}else{ 
		hate[bi]=1;
	}
	var h8 = "#ngosto" + dislike;
	$(h8).html(hate[bi]);
}

//a = ultimo livro a ser mostrado
var a = 3;

function mostrar(){
	/*determinar id do proximo livro em que a representa 
	o id do livro e temos 6 livros na base de dados*/
	if (a == 6){
		a = 1;
	}else{
		a ++;
	}
	//verificar para todos os ids se o a corresponde
	
	var ver = "#livro_" + a;
	$(ver).show();
}

