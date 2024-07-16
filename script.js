let ticketCounter = 1;

document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores do formulário
    var subject = document.getElementById('subject').value;
    var anydesk = document.getElementById('anydesk').value;
    var description = document.getElementById('description').value;
    var responsible = document.getElementById('responsible').value;
    var isBox = document.getElementById('isBox').checked;
    var boxNumber = document.getElementById('boxNumber').value;
    var openTime = new Date().toLocaleString();

    // Constrói a mensagem para enviar para o WhatsApp
    var whatsappMessage = `Chamado na vez%0A`;
    whatsappMessage += `Assunto: ${subject}%0A`;
    whatsappMessage += `AnyDesk: ${anydesk}%0A`;
    whatsappMessage += `Descrição: ${description}%0A`;
    whatsappMessage += `Responsável: ${responsible}%0A`;
    if (isBox) {
        whatsappMessage += `É Caixa: Sim%0A`;
        whatsappMessage += `Número da Caixa: ${boxNumber}%0A`;
    } else {
        whatsappMessage += `É Caixa: Não%0A`;
    }
    whatsappMessage += `%0A`;
    whatsappMessage += `Para visualizar este chamado, clique aqui: https://seusite.com/chamados`;

    // Número de WhatsApp para enviar a mensagem
    var whatsappNumber = '93992090196';

    // Abre o WhatsApp com a mensagem pré-preenchida
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

    // Cria um novo item de chamado na lista
    var newTicket = document.createElement('li');
    newTicket.innerHTML = `
        <h3>Chamado #${ticketCounter}</h3>
        <p>Aberto em: ${openTime}</p>
        <p>Assunto: ${subject}</p>
        <p>AnyDesk: ${anydesk}</p>
        <p>Descrição: ${description}</p>
        <p>Responsável: ${responsible}</p>
        ${isBox ? `<p>É Caixa: Sim</p><p>Número da Caixa: ${boxNumber}</p>` : '<p>É Caixa: Não</p>'}
        <button class="close-ticket">Encerrar Chamado</button>
    `;
    newTicket.classList.add('active');
    newTicket.dataset.ticketNumber = ticketCounter;
    newTicket.dataset.openTime = openTime;

    // Adiciona o evento de clique para o botão de encerrar
    newTicket.querySelector('.close-ticket').addEventListener('click', function() {
        closeTicket(newTicket);
    });

    // Adiciona o novo item à lista de chamados
    var ticketsList = document.getElementById('ticketsList');
    ticketsList.appendChild(newTicket);

    // Incrementa o contador de chamados
    ticketCounter++;

    // Limpa os campos do formulário após o envio
    document.getElementById('subject').value = '';
    document.getElementById('anydesk').value = '';
    document.getElementById('description').value = '';
    document.getElementById('responsible').value = '';
    document.getElementById('isBox').checked = false;
    document.getElementById('boxNumber').value = '';
    document.getElementById('boxNumberContainer').style.display = 'none';

    // Exibe uma mensagem de sucesso
    alert('Chamado enviado com sucesso!');
});

document.getElementById('isBox').addEventListener('change', function() {
    var boxNumberContainer = document.getElementById('boxNumberContainer');
    if (this.checked) {
        boxNumberContainer.style.display = 'block';
    } else {
        boxNumberContainer.style.display = 'none';
    }
});

function closeTicket(ticketItem) {
    var closeTime = new Date().toLocaleString();
    var ticketNumber = ticketItem.dataset.ticketNumber;
    var openTime = ticketItem.dataset.openTime;

    // Remove a classe 'active' e adiciona à lista de histórico
    ticketItem.classList.remove('active');
    ticketItem.classList.add('closed');

    // Atualiza o HTML do chamado com a hora de fechamento
    ticketItem.innerHTML = `
        <h3>Chamado #${ticketNumber}</h3>
        <p>Aberto em: ${openTime}</p>
        <p>Fechado em: ${closeTime}</p>
        <p>${ticketItem.querySelector('p:nth-of-type(3)').textContent}</p>
        <p>${ticketItem.querySelector('p:nth-of-type(4)').textContent}</p>
        <p>${ticketItem.querySelector('p:nth-of-type(5)').textContent}</p>
        <p>${ticketItem.querySelector('p:nth-of-type(6)').textContent}</p>
        ${ticketItem.querySelector('p:nth-of-type(7)') ? ticketItem.querySelector('p:nth-of-type(7)').outerHTML : ''}
        ${ticketItem.querySelector('p:nth-of-type(8)') ? ticketItem.querySelector('p:nth-of-type(8)').outerHTML : ''}
    `;

    // Move o chamado para o histórico
    var ticketsHistory = document.getElementById('ticketsHistory');
    ticketsHistory.appendChild(ticketItem);
}
