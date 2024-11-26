document.addEventListener("DOMContentLoaded", () => {
  const partialButtons = document.querySelectorAll('a[data-toggle="modal"]');

  partialButtons.forEach((button, index) => {
    const modalID = button.getAttribute("href").replace("#", "");
    const modalElement = document.getElementById(modalID);

    if (modalElement) {
      setTimeout(() => {
        button.click(); // Abre o modal
        console.log(`Modal ${modalID} aberto.`);

        setTimeout(() => {
          // Captura a tabela dentro do modal
          const notesTable = modalElement.querySelector("table");
          if (notesTable) {
            console.log("Tabela encontrada no modal:", notesTable);

            // Extrai as notas
            const grades = Array.from(notesTable.querySelectorAll("tr"))
              .map((row) => {
                const cells = row.querySelectorAll("td");
                return cells[2]?.innerText.trim(); // Extrai a nota do terceiro <td>
              })
              .filter((grade) => grade) // Remove entradas nulas ou vazias
              .join(", ");

            console.log(`Notas extraídas: ${grades}`);

            // Substitui o texto do botão
            button.textContent = grades || "Sem notas";
            console.log(`Botão atualizado: ${button.textContent}`);
          } else {
            console.log("Tabela não encontrada no modal.");
          }

          // Fecha o modal
          const closeButton = modalElement.querySelector('button[data-dismiss="modal"]');
          if (closeButton) closeButton.click();
        }, 1000); // Tempo de espera para carregar o conteúdo do modal
      }, index * 1500); // Intervalo para evitar conflitos de modais
    }
  });
});
