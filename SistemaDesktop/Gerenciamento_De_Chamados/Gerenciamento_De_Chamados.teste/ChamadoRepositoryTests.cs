using Gerenciamento_De_Chamados.Models;
using Gerenciamento_De_Chamados.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading.Tasks;

namespace Gerenciamento_De_Chamados.teste
{
    [TestClass]
    public class ChamadoRepositoryTests
    {
        private Mock<IChamadoRepository>? _mockChamadoRepository;

        [TestInitialize]
        public void SetUp()
        {
            // Cria um "mock" (simula��o) do reposit�rio de chamados
            _mockChamadoRepository = new Mock<IChamadoRepository>();
        }

        [TestMethod]
        public async Task AbrirChamado_ComDadosValidos_DeveChamarAdicionarAsyncDoRepositorio()
        {
            // Arrange (Organizar)
            var novoChamado = new Chamado
            {
                Titulo = "Problema no login",
                Descricao = "N�o consigo acessar o sistema com minhas credenciais.",
                StatusChamado = "Aberto",
                PrioridadeChamado = "Alta",
                DataChamado = DateTime.Now,
                FK_IdUsuario = 1
            };

            // Configura o mock para o m�todo ass�ncrono AdicionarAsync
            _mockChamadoRepository!.Setup(repo => repo.AdicionarAsync(It.IsAny<Chamado>()))
                .ReturnsAsync(123) // Simula o retorno do ID do novo chamado
                .Callback<Chamado>(chamado => {
                    chamado.IdChamado = 123; // Atribui o ID ao objeto para verifica��o
                });

            // Act (Agir)
            // Simula a chamada ass�ncrona para adicionar o chamado
            await _mockChamadoRepository.Object.AdicionarAsync(novoChamado);

            // Assert (Verificar)
            // Verifica se o m�todo AdicionarAsync foi chamado exatamente uma vez
            _mockChamadoRepository.Verify(repo => repo.AdicionarAsync(novoChamado), Times.Once());

            // Verifica se o chamado "salvo" tem o ID correto
            Assert.AreEqual(123, novoChamado.IdChamado);
            Assert.AreEqual("Problema no login", novoChamado.Titulo);
        }
    }
}