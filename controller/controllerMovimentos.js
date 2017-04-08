//4.CONTROLE ESTOQUE
	var app = angular.module('Movimentos', []);
				app.controller('ctrlMovimentos', 
					function($scope, $http) {
						
						// consulta no banco de dados e atualiza tabela na camada view	da tabela de movimentos
						var atualizaTabela = function(){
							$http.get('http://127.0.0.1:3000/consultaMovimentos')
							.then(function (response){
								$scope.listaMovimentos = response.data;			
								}
							);


							$http.get('http://127.0.0.1:3000/consultaTipoMovimento')
							.then(function (response){
								//alert ("entrou");
								$scope.listaTipoMovimento = response.data;			
								}
							);
						};

						$scope.consultaMovimentos = function(){
							atualizaTabela();
						};

						
						// insere no banco de dados
						$scope.insereMovimentos= function(){
							$http.post('http://127.0.0.1:3000/insereEstoque', $scope.movimentos)
							.then(function (response){
								atualizaTabela();
							}
							);
						};
						

						// função que retorna a posição de um produto pelo seu código 
						function retornaIndice(id_mavimento){
							var i;
							for (i=0;i<$scope.listaMovimento.length;i++){
									if ($scope.listaMovimento[i].id_movimento == id_movimento){
										return i; 
									}
							}		
							return -1;
						}
				});
