const { Op } = require("sequelize");
const { Pergunta, Resposta } = require("../../../database/associations");

async function buscarPorTituloService(titulo) {
  try {
    // Realizar a consulta usando LIKE para busca parcial
    const perguntas = await Pergunta.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Usando operador LIKE para busca parcial
        },
      },
      include: [
        {
          model: Resposta,
          as: "resposta",
        },
      ],
      order: [[{ model: Resposta, as: "resposta" }, "likes", "DESC"]],
    });

    return perguntas;
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    throw error;
  }
}

module.exports = buscarPorTituloService;
