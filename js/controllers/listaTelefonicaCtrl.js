angular.module("listaTelefonica")
       .controller("listaTelefonicaCtrl", function($scope, uppercaseFilter, $http){

          $scope.app = "Lista Telefonica";

          $scope.contatos = [
            /*{nome:uppercaseFilter("Beatriz"), telefone:"99998888", cor:"blue", data: new Date(), operadora:{nome:"Vivo", codigo: 15, categoria: "Celular"}},
            {nome:"Pedro", telefone:"99998888", cor:"green", data: new Date(), operadora:{nome: "Oi", codigo: 14, categoria: "Celular"}},
            {nome:"Venilton", telefone:"99998888", cor:"yellow", data: new Date(), operadora:{nome: "Tim", codigo:41, categoria: "Celular"}}
            {nome:"Maiko", telefone:"99998888"},
            {nome:"Erick", telefone:"99998888"},
            {nome:"Edy", telefone:"99998888"},
            {nome:"Cindy", telefone:"99998888"},*/
          ];

          $scope.operadoras = [
            /*{nome:"Oi", codigo: 14, categoria: "Celular", preco: 2},
            {nome:"Vivo", codigo: 15, categoria: "Celular", preco: 1},
            {nome:"Tim", codigo: 41, categoria: "Celular", preco: 3},
            {nome:"GVT", codigo: 25, categoria: "Fixo", preco: 1},
            {nome:"Embratel", codigo: 21, categoria: "Fixo", preco: 2},*/
          ];

          var carregarContatos = function(){
            $http.get("http://localhost:3412/contatos").success(function(data, status){
              $scope.contatos = data;
            }).error(function(data, status){
              $scope.message = "Aconteceu um problema: " + data + ", Error code:" + status + ".";
            });;
          };

          var carregarOperadoras = function(){
            $http.get("http://localhost:3412/operadoras").success(function(data, status){
              $scope.operadoras = data;
            });
          };

          $scope.adicionarContato = function(contato){
            // $scope.contatos.push(angular.copy(contato));
            contato.data = new Date();
            $http.post("http://localhost:3412/contatos", contato).success(function(data){
              delete $scope.contato;
              $scope.contatoForm.$setPristine();
              carregarContatos();
            });
          };

          $scope.apagarContatos = function(contatos){
            $scope.contatos = contatos.filter(function(contato){
              if (!contato.selecionado) {
                return contato
              }
            });
          };

          $scope.isContatoSelecionado = function(contatos){
            return contatos.some(function (contato) {
              return contato.selecionado;
            });
          };

          $scope.classe1 = "selecionado";
          $scope.classe2 = "negrito";

          $scope.ordenarPor = function(campo){
            $scope.criterioDeOrdenacao = campo;
            $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
          }

          carregarContatos();
          carregarOperadoras();
});
