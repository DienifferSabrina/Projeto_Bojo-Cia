
	//4.CONTROLE ESTOQUE
	var app = angular.module('Estoque', []);
				app.controller('ctrlEstoque', 
					function($scope, $http) {
						
						// consulta no banco de dados e atualiza tabela na camada view	da tabela de suprimentos
						var atualizaTabela = function(){
							$http.get('http://127.0.0.1:3000/consultaEstoque')
							.then(function (response){
								$scope.listaEstoque = response.data;			
								}
							);

							// consulta no banco de dados e atualiza tabela de unidades na tabela de suprimentos
							$http.get('http://127.0.0.1:3000/consultaUnidades')
							.then(function (response){
								//alert ("entrou");
								$scope.listaUnidades = response.data;			
								}
							);
						};
	
						// consulta a tabela de categoria para mostrar no combo box para o usuario escolher
						$scope.consultaEstoque = function(){
							atualizaTabela();
						};

						// remove do banco de dados
						$scope.removeEstoque = function(id_materia_prima){
							var resposta = confirm("Confirma a exclusão desta máteria?");
							if (resposta == true){
								$http.delete('http://127.0.0.1:3000/removeEstoque/' + id_materia_prima)
								.then(function (response){
									atualizaTabela();
								});
							}
						};
						// insere no banco de dados
						$scope.insereEstoque= function(){
							$http.post('http://127.0.0.1:3000/insereEstoque', $scope.estoque)
							.then(function (response){
								atualizaTabela();
							}
							);
						};

						// atualiza no banco de dados
						$scope.atualizaEstoque = function(){
							$http.put('http://127.0.0.1:3000/atualizaEstoque', $scope.estoque)
							.then(function (response){
								atualizaTabela();
								alert("Atualização com sucesso!!");
							}
							);							
						};	

						// coloca o produto para edição
						$scope.atualiza = function(id_materia_prima){
							var posicao = retornaIndice(id_materia_prima);
							$scope.estoque = $scope.listaEstoque[posicao];
						}

						// função que retorna a posição de um produto pelo seu código 
						function retornaIndice(id_materia_prima){
							var i;
							for (i=0;i<$scope.listaEstoque.length;i++){
									if ($scope.listaEstoque[i].id_materia_prima == id_materia_prima){
										return i; 
									}
							}		
							return -1;
						}
				});
