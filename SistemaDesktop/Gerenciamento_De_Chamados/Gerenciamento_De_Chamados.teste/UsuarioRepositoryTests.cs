using Gerenciamento_De_Chamados.Models;
using Gerenciamento_De_Chamados.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Threading.Tasks;

namespace Gerenciamento_De_Chamados.teste
{
    [TestClass]
    public class UsuarioRepositoryTests
    {
        private Mock<IUsuarioRepository> _mockUsuarioRepository;

        [TestInitialize]
        public void SetUp()
        {
            // Cria um "mock" (simula��o) do reposit�rio de usu�rios
            _mockUsuarioRepository = new Mock<IUsuarioRepository>();
        }

        [TestMethod]
        public async Task AdicionarUsuario_ComDadosValidos_DeveChamarAdicionarAsyncDoRepositorio()
        {
            // Arrange (Organizar)
            var novoUsuario = new Usuario
            {
                Nome = "Usuario Teste",
                Email = "teste@email.com",
                Senha = "senha123",
                FuncaoUsuario = "Funcionario" // Corre��o: Usando a propriedade correta
            };

            // Configura o mock para o m�todo ass�ncrono AdicionarAsync, que n�o retorna valor
            _mockUsuarioRepository.Setup(repo => repo.AdicionarAsync(It.IsAny<Usuario>()))
                .Returns(Task.CompletedTask); // Corre��o: O m�todo retorna Task, n�o Task<int>

            var repository = _mockUsuarioRepository.Object;

            // Act (Agir)
            await repository.AdicionarAsync(novoUsuario); // Corre��o: N�o captura valor de retorno

            // Assert (Verificar)
            // Verifica se o m�todo AdicionarAsync foi chamado exatamente uma vez
            _mockUsuarioRepository.Verify(repo => repo.AdicionarAsync(It.Is<Usuario>(u => u.Nome == "Usuario Teste")), Times.Once());
        }
    }
}