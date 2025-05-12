const scenarios = [
    { id: 1, category: "Quantidade", situation: "A carga chegou faltando uma caixa em relação à nota fiscal.", options: ["Recusar toda a carga e solicitar nova entrega.", "Aceitar a carga e registrar a divergência na nota fiscal, documentando com fotos e solicitando assinatura do entregador.", "Aceitar a carga normalmente e resolver depois.", "Ligar para o supervisor imediatamente."], correctOptionIndex: 1, modelAnswer: "Aceitar a carga parcial, registrar claramente a divergência de quantidade na nota fiscal, documentar com fotos a condição da carga recebida e solicitar a assinatura do entregador no documento. Comunicar imediatamente o setor de compras e o supervisor sobre a falta." },
    { id: 2, category: "Quantidade", situation: "Erro na nota fiscal (quantidade maior do que a recebida).", options: ["Devolver toda a carga.", "Aceitar a carga e não mencionar o problema.", "Registrar a divergência na nota fiscal, documentando com fotos e solicitando assinatura do entregador.", "Solicitar que o motorista retorne com a mercadoria faltante."], correctOptionIndex: 2, modelAnswer: "Contar a mercadoria recebida e compará-la com a nota fiscal. Se houver divergência (nota > físico), registrar a quantidade *recebida* na nota fiscal, anotar a divergência, documentar com fotos e solicitar a assinatura do entregador. Notificar o setor de compras e finanças sobre o erro na nota." },
    { id: 3, category: "Quantidade", situation: "O fornecedor enviou quantidade maior que a solicitada.", options: ["Aceitar toda a carga sem questionamento.", "Recusar toda a carga.", "Aceitar apenas a quantidade solicitada, registrando a devolução do excedente.", "Consultar o setor de compras sobre a possibilidade de aceitar o excedente."], correctOptionIndex: 3, modelAnswer: "Consultar o setor de compras sobre a possibilidade de aceitar o excedente. Dependendo da política da empresa, pode-se aceitar apenas a quantidade solicitada, registrando a devolução do excedente." },
    { id: 4, category: "Quantidade", situation: "O peso do produto está divergente do informado na nota fiscal.", options: ["Recusar o produto.", "Aceitar o produto sem questionar.", "Pesar novamente para confirmar e, se houver divergência, registrá-la na nota fiscal e solicitar assinatura do entregador.", "Ajustar o peso no sistema sem questionar."], correctOptionIndex: 2, modelAnswer: "Pesar a carga recebida para confirmar a divergência. Registrar o peso real na nota fiscal, documentar (pode ser foto da balança ou do veículo/carga se possível) e obter a assinatura do entregador. Reportar a divergência de peso ao setor de compras e ao supervisor para investigação." },
    { id: 5, category: "Identificação/Documentação", situation: "O código de barras de um produto não está legível.", options: ["Recusar o produto específico.", "Digitar o código manualmente conforme informação na embalagem.", "Criar um código provisório no sistema.", "Colar um novo código de barras imediatamente."], correctOptionIndex: 1, modelAnswer: "Isolar os produtos com identificação ilegível. Consultar a nota fiscal ou embalagem para obter o código correto. Se possível, digitar o código manualmente no sistema de recebimento. Se não for possível identificar, segregar o item e notificar o setor responsável (compras, cadastro) para identificação ou providenciar nova etiqueta." },
    { id: 6, category: "Identificação/Documentação", situation: "A carga chegou sem a documentação completa.", options: ["Recusar a carga.", "Aceitar a carga e solicitar o envio posterior da documentação.", "Solicitar que o motorista aguarde enquanto a situação é verificada com o setor responsável.", "Fotografar todos os produtos e criar uma lista manual."], correctOptionIndex: 2, modelAnswer: "Não iniciar o descarregamento. Informar o motorista que a documentação é essencial para o recebimento. Entrar em contato com o fornecedor e/ou transportador para solicitar o envio imediato da documentação por e-mail ou outro meio eletrônico para verificação. Somente proceder com o recebimento após a análise e validação dos documentos recebidos." },
    { id: 7, category: "Identificação/Documentação", situation: "A nota fiscal contém produto que não foi solicitado.", options: ["Recusar toda a carga.", "Aceitar toda a carga, incluindo o item não solicitado.", "Aceitar apenas os itens solicitados e registrar a devolução do item não solicitado na nota fiscal.", "Chamar o supervisor para decidir."], correctOptionIndex: 2, modelAnswer: "Conferir a carga item a item. Identificar os itens não solicitados. Aceitar apenas os itens que correspondem ao pedido/nota fiscal e registrar a recusa/devolução dos itens excedentes ou não solicitados na nota fiscal, com assinatura do entregador. Notificar o setor de compras sobre os itens não solicitados." },
    { id: 8, category: "Identificação/Documentação", situation: "O produto recebido está próximo da data de validade.", options: ["Recusar o produto.", "Verificar a política da empresa para prazo mínimo de validade e decidir conforme as diretrizes estabelecidas.", "Aceitar o produto, mas colocá-lo em local de destaque no estoque para saída prioritária.", "Solicitar desconto para aceitação."], correctOptionIndex: 1, modelAnswer: "Verificar a data de validade do produto e compará-la com a política de recebimento da empresa. Se a validade for inferior ao mínimo permitido, recusar o(s) item(ns) afetado(s), registrando a recusa na nota fiscal e documentando a condição. Notificar o setor de compras e qualidade." },
    { id: 9, category: "Infraestrutura/Espaço", situation: "A carga chegou antes do previsto e vai faltar espaço para armazenar.", options: ["Recusar a entrega e solicitar que retornem no dia agendado.", "Reorganizar temporariamente o espaço disponível, priorizando produtos de maior giro.", "Armazenar a carga em um corredor do depósito até liberar espaço adequado.", "Solicitar ao transportador que aguarde até conseguir espaço."], correctOptionIndex: 1, modelAnswer: "Avaliar a possibilidade de realocar temporariamente outros materiais na área de recebimento ou estoque para abrir espaço *seguro* para a nova carga. Se a reorganização temporária for viável, realizar o recebimento. Caso contrário, comunicar a situação ao motorista e ao supervisor e solicitar que a entrega seja feita no horário agendado ou em outro momento com espaço disponível." },
    { id: 10, category: "Infraestrutura/Espaço", situation: "Falta espaço na área de recebimento para conferência da carga.", options: ["Adiar o recebimento.", "Fazer a conferência no estacionamento.", "Reorganizar temporariamente a área de recebimento, movendo materiais já conferidos.", "Fazer conferência parcial."], correctOptionIndex: 2, modelAnswer: "Reorganizar temporariamente a área de recebimento, movendo materiais já conferidos para liberar espaço. O objetivo é possibilitar a conferência completa e segura dentro da área designada." },
    { id: 11, category: "Infraestrutura/Espaço", situation: "Falta de espaço no armazém para produtos volumosos.", options: ["Recusar a entrega.", "Reorganizar o estoque para criar espaço temporário.", "Armazenar temporariamente em área não designada, mas segura.", "Solicitar entrega parcial apenas da quantidade que pode ser armazenada."], correctOptionIndex: 1, modelAnswer: "Verificar a possibilidade de reorganizar o estoque existente para criar espaço temporário para os produtos volumosos. Se possível, aceitar a carga após a reorganização. Caso contrário, consultar o supervisor sobre alternativas ou a necessidade de recusar/adiar a entrega." },
    { id: 12, category: "Infraestrutura/Espaço", situation: "O veículo de entrega é muito grande para a doca de recebimento.", options: ["Recusar a entrega.", "Solicitar que a carga seja reentregue em veículo menor.", "Verificar a possibilidade de descarregar em área alternativa, utilizando equipamentos auxiliares como empilhadeiras.", "Descarregar manualmente na doca disponível."], correctOptionIndex: 2, modelAnswer: "Verificar se há uma área alternativa (outro pátio, outra entrada) onde o veículo possa descarregar com segurança, utilizando equipamentos de movimentação adequados (empilhadeira, etc.). Se não houver alternativa, comunicar ao fornecedor/transportador a necessidade de reentrega em veículo apropriado." },
    { id: 13, category: "Equipamentos", situation: "Falta de equipamento de movimentação (paleteira, empilhadeira) no momento do recebimento.", options: ["Adiar a entrega.", "Solicitar empréstimo de equipamento de outro setor temporariamente.", "Fazer o descarregamento manual.", "Pedir ao motorista que aguarde até que o equipamento esteja disponível."], correctOptionIndex: 1, modelAnswer: "Não iniciar o descarregamento sem o equipamento adequado, especialmente para cargas pesadas ou paletizadas, devido ao risco de segurança e dano. Comunicar a falta de equipamento ao supervisor e solicitar apoio de outros setores para empréstimo temporário ou verificar a disponibilidade dos operadores de MHE. O motorista deverá aguardar até que o equipamento esteja disponível." },
    { id: 14, category: "Equipamentos", situation: "Equipamento de descarga (esteira, elevador) apresenta falha durante o recebimento.", options: ["Interromper o recebimento até o conserto.", "Improvisar método alternativo de descarga.", "Solicitar reprogramação da entrega.", "Tentar consertar o equipamento sem chamar manutenção."], correctOptionIndex: 1, modelAnswer: "Parar o uso do equipamento com defeito. Avaliar se é possível improvisar um método alternativo e seguro de descarga utilizando outros equipamentos disponíveis (ex: empilhadeira, paleteira manual) ou, em último caso e para volumes leves, descarga manual segura. Se não for possível, adiar o restante do recebimento, notificar a manutenção e o supervisor." },
    { id: 15, category: "Equipamentos", situation: "A carga excede o limite de peso suportado pela doca/piso.", options: ["Recusar a carga.", "Fracionar o descarregamento em lotes menores que respeitem o limite de peso.", "Solicitar veículo menor para reentrega.", "Tentar descarregar em outra entrada com capacidade adequada."], correctOptionIndex: 1, modelAnswer: "Não descarregar a carga na doca/área com restrição de peso. Informar ao motorista o motivo. Verificar se há outra doca ou área na instalação com capacidade adequada para o peso. Se houver, descarregar lá. Caso contrário, avaliar a possibilidade de fracionar a carga em lotes menores que respeitem o limite ou solicitar ao transportador a reentrega em um veículo menor ou com fracionamento prévio. Notificar o supervisor." },
     { id: 16, category: "Equipamentos", situation: "Falta de equipamentos de proteção individual para o descarregamento seguro.", options: ["Fazer o descarregamento sem EPI.", "Adiar o recebimento até a disponibilização dos EPIs.", "Emprestar EPIs de outro setor temporariamente.", "Solicitar que o motorista realize o descarregamento."], correctOptionIndex: 1, modelAnswer: "Não iniciar ou continuar o descarregamento sem os EPIs necessários para a segurança da operação (capacete, luvas, calçado de segurança, etc.). Adiar o recebimento até que os EPIs estejam disponíveis. Comunicar a falta dos EPIs ao supervisor e solicitar reposição urgente." },
     { id: 17, category: "Integridade da Carga", situation: "Uma caixa veio avariada.", options: ["Recusar toda a carga.", "Aceitar a carga normalmente sem registrar o problema.", "Abrir a caixa avariada, verificar o conteúdo e, se estiver intacto, aceitar registrando a avaria externa; se o conteúdo estiver danificado, registrar na nota fiscal.", "Trocar a caixa avariada por uma nova no local."], correctOptionIndex: 2, modelAnswer: "Isolar a caixa/volume danificado. Abrir a embalagem na presença do motorista (se possível) para verificar o estado do conteúdo. Se o conteúdo estiver intacto, aceitar o item, registrando a avaria *externa* da embalagem na nota fiscal. Se o conteúdo estiver danificado, recusar o item específico ou a caixa, registrando a avaria *interna* e externa na nota fiscal, com assinatura do motorista. Documentar com fotos e notificar os setores pertinentes (compras, qualidade)." },
     { id: 18, category: "Integridade da Carga", situation: "Identificação de produto com embalagem violada.", options: ["Aceitar o produto normalmente.", "Recusar apenas o produto com embalagem violada.", "Recusar toda a carga.", "Verificar o conteúdo e aceitar se estiver íntegro, documentando a condição."], correctOptionIndex: 3, modelAnswer: "Isolar os produtos com embalagem violada. Verificar o conteúdo para confirmar se a quantidade está correta e se o produto está íntegro e sem sinais de manipulação ou dano. Documentar a condição da embalagem e do conteúdo com fotos. Registrar a ocorrência na nota fiscal e obter a assinatura do motorista. Se o conteúdo estiver comprometido, recusar o(s) item(ns) e notificar os setores responsáveis (compras, segurança, qualidade)." },
     { id: 19, category: "Integridade da Carga", situation: "A embalagem externa está molhada.", options: ["Recusar a carga.", "Verificar se o conteúdo foi comprometido; se estiver intacto, secar a embalagem externa e receber.", "Aceitar a carga sem verificação.", "Solicitar embalagens novas para substituição."], correctOptionIndex: 1, modelAnswer: "Isolar a carga molhada. Verificar se a umidade atingiu as embalagens internas ou o produto. Se o produto estiver intacto e protegido pelas embalagens internas, secar a embalagem externa (se viável) e aceitar, registrando a condição molhada na nota fiscal. Se o conteúdo estiver danificado ou comprometido pela umidade, recusar o(s) item(ns) afetado(s), documentando e notificando os setores responsáveis." },
     { id: 20, category: "Integridade da Carga", situation: "Identificação de produto com aparência ou odor suspeito.", options: ["Aceitar o produto normalmente.", "Recusar apenas o produto suspeito após inspeção cuidadosa.", "Recusar toda a carga.", "Segregar o item suspeito e solicitar análise do controle de qualidade."], correctOptionIndex: 3, modelAnswer: "Não aceitar o produto suspeito imediatamente. Segregar o item em uma área designada (área de quarentena ou itens suspeitos), longe dos produtos regulares. Não o movimentar para estoque. Notificar imediatamente o controle de qualidade e/ou supervisor para inspeção e decisão sobre a aceitação ou recusa. Documentar a observação inicial." },
     { id: 21, category: "Temperatura/Condições Especiais", situation: "A carga chegou com temperatura inadequada (para produtos refrigerados).", options: ["Aceitar a carga normalmente.", "Recusar toda a carga.", "Medir e registrar a temperatura, recusando apenas os itens que estão fora da faixa de temperatura adequada.", "Tentar resfriar os produtos imediatamente."], correctOptionIndex: 2, modelAnswer: "Medir a temperatura interna dos produtos utilizando um termômetro calibrado. Comparar a temperatura medida com a faixa permitida. Recusar *apenas* os itens cuja temperatura esteja fora da faixa aceitável, registrando a temperatura medida e a recusa na nota fiscal. Documentar com fotos (incluindo leitura do termômetro) e solicitar a assinatura do motorista. Aceitar os itens que estiverem dentro da faixa. Notificar os setores de compras e qualidade sobre a ocorrência." },
     { id: 22, category: "Temperatura/Condições Especiais", situation: "Produtos com requisitos de temperatura específica chegaram sem registro de monitoramento durante o transporte.", options: ["Aceitar normalmente.", "Recusar a carga.", "Verificar a temperatura atual do produto e aceitar se estiver dentro dos parâmetros, registrando a falta do monitoramento.", "Solicitar declaração do fornecedor sobre a manutenção da temperatura adequada."], correctOptionIndex: 2, modelAnswer: "Verificar a temperatura atual do produto ao chegar para garantir que está dentro da faixa aceitável no momento do recebimento. Aceitar a carga *se* a temperatura atual estiver correta, mas registrar a falta da documentação de monitoramento na nota fiscal. Notificar os setores de compras e qualidade sobre a ausência do registro de temperatura durante o transporte para que tratem com o fornecedor/transportador." },
     { id: 23, category: "Temperatura/Condições Especiais", situation: "Recebimento de produto que necessita de condições especiais de armazenamento (indisponíveis no momento).", options: ["Recusar o produto.", "Aceitar e improvisar condições temporárias que minimizem riscos.", "Solicitar que o fornecedor mantenha o produto até adequação do espaço.", "Aceitar e armazenar normalmente, ignorando as condições especiais."], correctOptionIndex: 1, modelAnswer: "Não recusar imediatamente se houver a possibilidade de mitigar o risco. Aceitar o produto e improvisar condições temporárias que minimizem os riscos associados à falta do espaço adequado (ex: segregar em área segura, protegida, com ventilação controlada, etc.). Notificar o supervisor e a equipe responsável pelo armazenamento sobre a situação e a necessidade urgente de adequação do espaço definitivo." },
     { id: 24, category: "Temperatura/Condições Especiais", situation: "Identificação de infestação de pragas em uma parte da carga.", options: ["Recusar toda a carga.", "Separar e recusar apenas as unidades infestadas, aceitando o restante após inspeção rigorosa.", "Aceitar a carga e aplicar medidas de controle de pragas.", "Solicitar troca imediata das unidades infestadas."], correctOptionIndex: 1, modelAnswer: "Interromper o recebimento da parte afetada da carga. Isolar imediatamente as unidades ou paletes infestados em uma área segura e separada (pode ser fora da área de recebimento). Realizar uma inspeção rigorosa no restante da carga para garantir que não há mais infestação. Recusar *apenas* as unidades infestadas, registrando a ocorrência na nota fiscal e documentando com fotos. Acionar o controle de qualidade e a equipe de controle de pragas." },
     { id: 25, category: "Organização/Logística", situation: "O horário de chegada da carga é fora do período de funcionamento do setor de recebimento.", options: ["Recusar a carga.", "Verificar a possibilidade de recebimento excepcional, avaliando disponibilidade de pessoal e condições de segurança.", "Solicitar retorno no horário regular.", "Aceitar a carga sem conferência e conferir no dia seguinte."], correctOptionIndex: 1, modelAnswer: "Informar o motorista que o setor de recebimento está fora do horário de operação. Consultar o supervisor sobre a possibilidade de um recebimento excepcional (se houver política para isso, envolvendo pessoal extra, segurança, etc.). Se autorizado e viável, realizar o recebimento. Caso contrário, solicitar ao transportador que retorne durante o horário de funcionamento agendado ou normal." },
     { id: 26, category: "Organização/Logística", situation: "Chegada simultânea de múltiplos fornecedores fora do agendamento.", options: ["Atender por ordem de chegada, ignorando o agendamento.", "Priorizar conforme criticidade dos materiais.", "Manter o atendimento apenas dos fornecedores agendados e reagendar os demais.", "Recusar todos os não agendados."], correctOptionIndex: 2, modelAnswer: "Dar prioridade aos fornecedores que possuem agendamento. Para os fornecedores que chegaram fora do agendamento, explicar a situação e solicitar que aguardem se a fila não for longa, ou reagendar o recebimento para um horário/dia futuro com base na disponibilidade da doca/equipe. A priorização entre os não agendados (se houver espera) pode ser feita por criticidade da mercadoria ou ordem de chegada, mas o agendamento deve ser respeitado." },
     { id: 27, category: "Organização/Logística", situation: "O motorista solicita prioridade no descarregamento alegando compromisso com outra entrega.", options: ["Atender ao pedido, alterando a ordem de recebimento.", "Explicar que há uma ordem de recebimento que deve ser respeitada.", "Solicitar que ele retorne mais tarde.", "Oferecer descarregamento simultâneo com outras cargas, se possível."], correctOptionIndex: 1, modelAnswer: "Explicar educadamente ao motorista que há uma fila ou ordem de recebimento estabelecida baseada em agendamento ou criticidade, e que essa ordem deve ser respeitada para garantir a eficiência e organização do fluxo. Informar a ele a posição aproximada na fila ou o tempo estimado de espera. Não alterar a prioridade sem aprovação superior, a menos que haja uma diretriz clara para exceções." },
     { id: 28, category: "Organização/Logística", situation: "Chegada de material urgente fora do horário de funcionamento do controle de qualidade.", options: ["Recusar o material.", "Aceitar o material e liberar para uso sem inspeção de qualidade.", "Receber o material e segregá-lo em área de quarentena até a inspeção do controle de qualidade.", "Solicitar inspeção emergencial através de plantonista, se disponível."], correctOptionIndex: 2, modelAnswer: "Receber o material e conferir a quantidade e integridade física básica. Identificar o material como 'urgente - aguardando CQ'. Segregar o material em uma área de quarentena ou retenção claramente identificada, onde aguardará a inspeção do controle de qualidade assim que o setor estiver operacional. Notificar o setor de controle de qualidade sobre a chegada do material urgente para que seja priorizado." },
     { id: 29, category: "Organização da Carga", situation: "Os produtos chegaram misturados (diferentes SKUs na mesma embalagem).", options: ["Recusar toda a carga.", "Separar e reorganizar os produtos no momento do recebimento.", "Aceitar e enviar para a área de separação.", "Solicitar ao fornecedor que reenvie com a organização correta."], correctOptionIndex: 1, modelAnswer: "Aceitar a carga, mas realizar a separação e reorganização dos produtos misturados na área de recebimento durante o processo de conferência. Documentar a condição da embalagem ou da mistura para feedback ao fornecedor e garantir que os itens corretos sejam identificados e direcionados ao estoque." },
     { id: 30, category: "Organização da Carga", situation: "A carga contém produtos de diferentes setores/departamentos.", options: ["Receber toda a carga e depois fazer a distribuição interna.", "Solicitar entregas separadas para cada setor.", "Separar durante o descarregamento e notificar cada setor para retirada.", "Receber apenas os produtos destinados ao seu setor."], correctOptionIndex: 2, modelAnswer: "Durante o processo de descarregamento e conferência, separar os produtos por setor ou departamento de destino. Notificar os responsáveis de cada setor sobre a chegada e a disponibilidade dos materiais para retirada ou agendar a distribuição interna, dependendo do procedimento da empresa." },
     { id: 31, category: "Organização da Carga", situation: "A carga chegou em paletes diferentes do padrão utilizado pela empresa.", options: ["Recusar a carga.", "Aceitar a carga e transferir para paletes padronizados.", "Aceitar a carga mantendo os paletes originais, mas identificando-os para controle interno.", "Solicitar troca dos paletes pelo fornecedor."], correctOptionIndex: 2, modelAnswer: "Aceitar a carga nos paletes originais recebidos. Identificar claramente esses paletes como 'fora do padrão' ou com alguma marcação específica para controle interno e rastreabilidade. Movimentar e armazenar, se possível, em áreas que comportem esse padrão diferente. Notificar o setor de compras ou padronização sobre a divergência para tratativa futura com o fornecedor." },
     { id: 32, category: "Organização da Carga", situation: "Produto recebido requer montagem prévia para armazenamento adequado.", options: ["Recusar o produto.", "Aceitar e armazenar desmontado.", "Solicitar ao fornecedor que retorne com o produto montado.", "Aceitar e montar conforme instruções, se viável."], correctOptionIndex: 3, modelAnswer: "Verificar se é viável realizar a montagem do produto na área de recebimento, de acordo com as instruções e com o tempo disponível. Se for um processo rápido e simples, montar e dar entrada no produto montado. Se for complexo ou demandar muito tempo/recursos, consultar o supervisor sobre a possibilidade de direcionar para uma área de montagem interna ou negociar com o fornecedor uma solução." },
     { id: 33, category: "Sistemas/Documentação", situation: "O sistema de informação está fora do ar no momento do recebimento.", options: ["Adiar o recebimento até o sistema voltar.", "Fazer o recebimento manual com formulários físicos, registrando no sistema posteriormente.", "Recusar a carga.", "Receber a carga sem conferência formal."], correctOptionIndex: 1, modelAnswer: "Não recusar a carga apenas pela falha do sistema, a menos que a política da empresa determine o contrário. Realizar o processo de recebimento e conferência manualmente, utilizando formulários físicos padronizados ou anotações detalhadas. Registrar todas as informações essenciais (fornecedor, transportador, NF, produtos, quantidades, divergências, avarias). Comunicar a TI sobre a falha do sistema. Informar que os dados serão inseridos no sistema assim que ele voltar ao normal." },
     { id: 34, category: "Sistemas/Documentação", situation: "A carga chegou sem ordem de compra correspondente no sistema.", options: ["Recusar a carga.", "Aceitar a carga e criar um registro provisório, verificando posteriormente com o setor de compras.", "Solicitar que o motorista aguarde enquanto a situação é verificada com o setor de compras.", "Aceitar sem registro no sistema."], correctOptionIndex: 2, modelAnswer: "Não recusar a carga imediatamente. Conferir a carga com base na nota fiscal e documentos de transporte. Entrar em contato com o setor de compras para verificar a situação da ordem de compra (se foi emitida, se há erro no número, se é uma entrega não esperada). Segurar a carga na área de recebimento, sem dar entrada final ou movimentar para estoque, até que a situação da OC seja resolvida pelas compras. Documentar a situação e a comunicação com compras." },
     { id: 35, category: "Sistemas/Documentação", situation: "Divergência entre as unidades de medida do pedido e da nota fiscal.", options: ["Recusar a carga.", "Aceitar sem verificação.", "Fazer a conversão das unidades de medida para confirmar as quantidades corretas.", "Solicitar correção da nota fiscal antes de aceitar."], correctOptionIndex: 2, modelAnswer: "Realizar a conversão das unidades de medida apresentadas na nota fiscal para a unidade de medida utilizada internamente (conforme o pedido, se disponível, ou sistema). Confirmar se a quantidade total está correta após a conversão. Registrar a divergência de unidade na nota fiscal e no sistema. Notificar os setores de compras e cadastro sobre a inconsistência para padronização futura ou correção na origem." },
     { id: 36, category: "Sistemas/Documentação", situation: "Divergência entre o CNPJ do documento e o do sistema.", options: ["Recusar a entrega.", "Aceitar sem verificação.", "Verificar se é uma filial do mesmo grupo empresarial e, se confirmado, aceitar registrando a divergência.", "Solicitar correção do documento antes do recebimento."], correctOptionIndex: 2, modelAnswer: "Verificar se o CNPJ divergente pertence a uma filial ou outra entidade do mesmo grupo empresarial, conforme conhecimento ou consulta rápida (se possível). Se for o caso e a nota fiscal estiver vinculada à ordem de compra correta, aceitar a carga, registrando a divergência de CNPJ na nota fiscal e no sistema. Se não houver confirmação ou for um CNPJ totalmente desconhecido, segurar a carga e contatar o setor de compras para validação antes de aceitar." },
     { id: 37, category: "Identificação/Rastreabilidade", situation: "O produto chegou sem identificação adequada (etiquetas, códigos).", options: ["Recusar o produto.", "Aceitar e solicitar ao fornecedor o envio das identificações corretas.", "Criar identificação provisória com base nas informações da nota fiscal.", "Aceitar sem identificação e armazenar em área separada."], correctOptionIndex: 2, modelAnswer: "Com base nas informações da nota fiscal (descrição, código do fornecedor, etc.), criar uma identificação provisória para o produto no sistema interno ou com uma etiqueta manual. Segregar o produto em uma área temporária até que uma identificação formal (etiqueta interna padrão) possa ser gerada e aplicada. Notificar o setor de cadastro ou compras sobre a falta de identificação na origem." },
     { id: 38, category: "Identificação/Rastreabilidade", situation: "Recebimento de mercadorias sem código de rastreabilidade.", options: ["Recusar as mercadorias.", "Aceitar e criar código de rastreabilidade interno.", "Aceitar sem rastreabilidade.", "Solicitar ao fornecedor a inclusão dos códigos antes do recebimento."], correctOptionIndex: 1, modelAnswer: "Aceitar a mercadoria. Se o sistema interno permitir, criar um código de rastreabilidade interno (ex: número de lote interno, data de recebimento + sequência) para os produtos recebidos. Registrar este código no sistema e, se necessário, aplicá-lo nas embalagens. Notificar o setor de compras ou cadastro sobre a falta de código de rastreabilidade na origem para futuras tratativas com o fornecedor." },
     { id: 39, category: "Identificação/Rastreabilidade", situation: "A documentação está em idioma estrangeiro sem tradução.", options: ["Recusar a carga.", "Utilizar ferramentas de tradução disponíveis para conferência.", "Aceitar a carga sem entender a documentação.", "Solicitar documentação traduzida e adiar o recebimento."], correctOptionIndex: 1, modelAnswer: "Não recusar a carga imediatamente. Utilizar ferramentas de tradução disponíveis (online, aplicativos) para fazer uma conferência básica dos documentos principais (nota fiscal, packing list) e garantir que correspondem à carga esperada. Registrar no sistema e na nota fiscal a condição da documentação em idioma estrangeiro. Notificar o setor de compras ou importação para que providenciem a tradução formal e tratem a questão com o fornecedor." },
     { id: 40, category: "Identificação/Rastreabilidade", situation: "Produto importado sem tradução das instruções/manual.", options: ["Recusar o produto.", "Aceitar o produto e solicitar ao fornecedor o envio da tradução.", "Aceitar sem a tradução e resolver depois.", "Usar tradutor automático para verificação básica e aceitar condicionalmente."], correctOptionIndex: 1, modelAnswer: "Aceitar o produto, pois a falta do manual traduzido geralmente não impede o recebimento físico, mas sim o uso ou a correta manipulação. Segregar o produto se o manual for essencial para o manuseio seguro ou armazenamento. Notificar o setor de compras ou técnico responsável para que solicitem ao fornecedor o envio da tradução das instruções/manual. Documentar a situação." },
     { id: 41, category: "Fornecedores/Transportadores", situation: "O motorista não possui documentos pessoais ou autorização de entrega.", options: ["Aceitar a carga mesmo assim.", "Recusar a entrega.", "Verificar a identificação do veículo e da empresa transportadora, e confirmar a entrega com o fornecedor.", "Registrar os dados disponíveis e aceitar condicionalmente."], correctOptionIndex: 2, modelAnswer: "Priorizar a segurança e os procedimentos internos. Verificar a identificação do veículo (placa) e da empresa transportadora. Tentar confirmar a entrega com o fornecedor (contato de compras ou logística do fornecedor) para validar que aquele veículo e motorista estão autorizados a realizar a entrega. Se não for possível confirmar a identidade do motorista ou a autorização, pode ser necessário recusar a entrada ou a carga, comunicando a situação ao supervisor." },
     { id: 42, category: "Fornecedores/Transportadores", situation: "O motorista se recusa a aguardar a conferência da carga.", options: ["Aceitar a carga sem conferência.", "Recusar a carga.", "Informar que a conferência é obrigatória segundo procedimentos da empresa e que só haverá liberação após a conclusão.", "Realizar uma conferência parcial apenas."], correctOptionIndex: 2, modelAnswer: "Informar claramente ao motorista que a conferência da carga é um procedimento obrigatório da empresa para garantir a precisão do recebimento e a integridade da mercadoria. Explicar que a liberação do veículo só ocorrerá após a conclusão da conferência. Se ele insistir em não aguardar, registrar a recusa dele em permanecer para a conferência na nota fiscal e/ou em um relatório de ocorrência, e contatar imediatamente o fornecedor e/ou transportador para relatar a situação e solicitar instruções." },
     { id: 43, category: "Fornecedores/Transportadores", situation: "Veículo de entrega apresenta condições inadequadas de higiene.", options: ["Aceitar a carga normalmente.", "Recusar a carga.", "Verificar se as embalagens protegem adequadamente os produtos; se sim, aceitar registrando a ocorrência.", "Limpar os produtos durante o recebimento."], correctOptionIndex: 2, modelAnswer: "Avaliar o nível da higiene inadequada e se ela representa risco de contaminação para o produto ou para o ambiente de recebimento. Verificar se as embalagens dos produtos são adequadas e protegem a mercadoria da contaminação do veículo. Se as embalagens oferecerem proteção suficiente, aceitar a carga, mas registrar a condição inadequada do veículo na nota fiscal ou em um relatório de ocorrência, documentando com fotos e notificando o setor de compras/qualidade para tratativa com o transportador." },
     { id: 44, category: "Fornecedores/Transportadores", situation: "O veículo de entrega está com vazamento de óleo na área de recebimento.", options: ["Ignorar o vazamento e proceder com o descarregamento.", "Recusar a entrada do veículo até que o problema seja resolvido.", "Colocar uma proteção no chão para evitar contaminação e prosseguir com o descarregamento.", "Solicitar outro veículo para a entrega."], correctOptionIndex: 2, modelAnswer: "Não permitir que o veículo entre na área de recebimento se houver risco de contaminação ou dano ao piso/ambiente. Informar ao motorista sobre o vazamento e solicitar que resolva o problema antes de prosseguir, ou, se possível, providenciar uma contenção adequada (ex: mantas absorventes) para proteger a área durante o descarregamento. Registrar a ocorrência e notificar o transportador e fornecedor sobre a condição do veículo." },
     { id: 45, category: "Especificações/Qualidade", situation: "A embalagem está diferente do padrão habitual.", options: ["Recusar o produto.", "Verificar se houve comunicação prévia sobre mudança de embalagem e, caso não tenha havido, confirmar com o fornecedor a autenticidade do produto.", "Aceitar o produto sem verificação.", "Solicitar laudo de qualidade no momento."], correctOptionIndex: 1, modelAnswer: "Não recusar imediatamente. Verificar se o setor de compras ou cadastro recebeu alguma comunicação prévia do fornecedor sobre a mudança na embalagem. Se não houve comunicação, tentar confirmar a autenticidade do produto e a justificativa para a nova embalagem com o fornecedor (via telefone, e-mail, com apoio de compras). Se a autenticidade for confirmada, aceitar a carga registrando a divergência na embalagem e notificando os setores internos sobre a mudança." },
     { id: 46, category: "Especificações/Qualidade", situation: "O produto recebido apresenta especificações diferentes do catálogo.", options: ["Recusar o produto.", "Aceitar o produto sem verificação.", "Verificar com o fornecedor se houve atualização do produto e, se confirmado, aceitar registrando a mudança.", "Aceitar condicionalmente até confirmação do requisitante."], correctOptionIndex: 2, modelAnswer: "Não recusar imediatamente. Verificar se o setor de compras ou técnico responsável recebeu alguma comunicação prévia do fornecedor sobre a atualização ou mudança nas especificações do produto. Confirmar com o fornecedor a validade das novas especificações. Se a atualização for confirmada e o produto atender aos requisitos funcionais, aceitar a carga, registrando a divergência de especificação e notificando os setores internos (compras, engenharia, qualidade) sobre a mudança no produto." },
     { id: 47, category: "Especificações/Qualidade", situation: "Parte dos itens recebidos está com o lote diferente do solicitado.", options: ["Recusar os itens com lote diferente.", "Verificar se o lote recebido atende às especificações técnicas necessárias e, em caso positivo, aceitar registrando a divergência.", "Aceitar normalmente sem verificação.", "Solicitar ao fornecedor documentação que comprove a equivalência dos lotes."], correctOptionIndex: 1, modelAnswer: "Não recusar automaticamente. Verificar, se possível (consultando fichas técnicas, histórico, com apoio do setor de qualidade ou engenharia), se o lote recebido possui as mesmas especificações técnicas e atende aos requisitos do lote solicitado. Se houver equivalência técnica e o lote for aceitável, receber os itens, registrando a divergência de lote na nota fiscal e no sistema. Notificar o setor de compras sobre a diferença de lote." },
     { id: 48, category: "Especificações/Qualidade", situation: "Entrega de material perigoso sem as sinalizações de segurança adequadas.", options: ["Aceitar o material normalmente.", "Recusar o recebimento.", "Aceitar apenas se houver equipamentos e área apropriada para manuseio seguro, providenciando sinalização adequada.", "Solicitar que o fornecedor retorne com a sinalização adequada."], correctOptionIndex: 2, modelAnswer: "Não recusar o recebimento de imediato, mas não manusear sem segurança. Verificar se a empresa possui equipamentos adequados e uma área designada e segura para manusear e segregar materiais perigosos, mesmo sem a sinalização correta. Se a área e equipamentos estiverem disponíveis, receber a carga com extrema cautela, segregá-la e providenciar a sinalização interna adequada imediatamente. Notificar os setores de segurança e compras sobre a falha na sinalização por parte do transportador/fornecedor." },
     { id: 49, category: "Necessidades Especiais", situation: "Produto recebido exige calibração/aferição antes do armazenamento.", options: ["Armazenar sem calibração.", "Recusar o recebimento.", "Segregar o produto e acionar a equipe técnica para calibração.", "Solicitar que o fornecedor retorne com o produto já calibrado."], correctOptionIndex: 2, modelAnswer: "Não armazenar o produto sem a calibração necessária, pois isso comprometeria sua usabilidade e rastreabilidade. Segregar o produto na área de recebimento ou em uma área de quarentena/inspeção claramente identificada como 'Aguardando Calibração'. Notificar imediatamente a equipe técnica ou laboratório responsável pela calibração para que realizem o procedimento antes do produto ser liberado para armazenamento ou uso." },
     { id: 50, category: "Necessidades Especiais", situation: "Falta de pessoal para conferência de uma carga grande.", options: ["Aceitar a carga sem conferência completa.", "Adiar o recebimento.", "Priorizar a conferência dos itens mais críticos ou de maior valor.", "Solicitar apoio temporário de outros setores."], correctOptionIndex: 2, modelAnswer: "Não aceitar a carga sem a conferência adequada, pois isso gera riscos de divergências e perdas. Avaliar a carga e priorizar a conferência completa dos itens mais críticos (urgentes, de alto valor, perigosos, com validade curta) que *precisam* ser liberados. Para o restante da carga, se o tempo for muito limitado, solicitar ao supervisor apoio temporário de pessoal de outros setores para auxiliar na conferência completa ou, se a situação não permitir de forma alguma, negociar com o transportador o adiamento da entrega ou a entrega parcial para conferência posterior do restante." }
    // Add all 50 scenarios following this structure
];

let currentMode = null;
let currentScenario = null;
let timers = []; // Array to hold timer states: { initial: seconds, current: seconds, interval: null, element: HTMLElement, inputElement: HTMLElement, label: string }

// --- DOM Elements ---
const modeSelectionDiv = document.getElementById('mode-selection');
const gameAreaDiv = document.getElementById('game-area');
const currentModeDisplay = document.getElementById('current-mode-display');
const timerInputsDiv = document.getElementById('timer-inputs');
const timerDisplaysDiv = document.getElementById('timer-displays');
const startRoundBtn = document.getElementById('start-round-btn');
const resetTimersBtn = document.getElementById('reset-timers-btn');
const scenarioNumberSpan = document.getElementById('scenario-number');
const scenarioTextP = document.getElementById('scenario-text');
const multiChoiceOptionsDiv = document.getElementById('multi-choice-options');
const showAnswerBtn = document.getElementById('show-answer-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const answerAreaDiv = document.getElementById('answer-area');
const modelAnswerTextP = document.getElementById('model-answer-text');

// --- Game Initialization ---
function showModeSelection() {
    modeSelectionDiv.classList.remove('hidden');
    gameAreaDiv.classList.add('hidden');
    // Clear any existing timer elements
    timerInputsDiv.innerHTML = '';
    timerDisplaysDiv.innerHTML = '';
    timers = [];
}

function selectMode(mode) {
    currentMode = mode;
    modeSelectionDiv.classList.add('hidden');
    gameAreaDiv.classList.remove('hidden');
    currentModeDisplay.textContent = `Modo: ${mode === 'team' ? 'Equipe vs Equipe' : mode.toUpperCase()}`;

    setupTimers(mode);
    loadScenario();
}

function setupTimers(mode) {
    let numTimers = 0;
    let timerLabels = [];

    if (mode === '1v1') {
        numTimers = 2;
        timerLabels = ['Competidor 1', 'Competidor 2'];
    } else if (mode === '1v1v1') {
        numTimers = 3;
        timerLabels = ['Competidor 1', 'Competidor 2', 'Competidor 3'];
    } else if (mode === 'team') {
        numTimers = 2;
        timerLabels = ['Equipe 1', 'Equipe 2'];
    }

    timerInputsDiv.innerHTML = '';
    timerDisplaysDiv.innerHTML = '';
    timers = [];

    for (let i = 0; i < numTimers; i++) {
        // Setup Input
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('timer-config');
        inputDiv.innerHTML = `
            <label>${timerLabels[i]} (segundos):</label>
            <input type="number" value="180" min="1" id="timer-input-${i}">
        `;
        timerInputsDiv.appendChild(inputDiv);

        // Setup Display
        const displayDiv = document.createElement('div');
        displayDiv.classList.add('timer-display');
         displayDiv.innerHTML = `<div class="timer-label">${timerLabels[i]}</div><span id="timer-${i}">00:00</span>`;

        const controlsDiv = document.createElement('div');
        controlsDiv.classList.add('timer-controls');
        controlsDiv.innerHTML = `
             <button onclick="startTimer(${i})">Start</button>
             <button onclick="pauseTimer(${i})">Pause</button>
             <button onclick="resetTimer(${i})">Reset</button>
        `;
        displayDiv.appendChild(controlsDiv);

        timerDisplaysDiv.appendChild(displayDiv);

        // Store timer state
        timers.push({
            initial: 180, // Default initial value
            current: 180, // Default current value
            interval: null,
            element: displayDiv.querySelector(`#timer-${i}`),
            inputElement: inputDiv.querySelector(`#timer-input-${i}`),
            label: timerLabels[i]
        });

         // Set initial display and attach input listener
         timers[i].inputElement.addEventListener('change', (event) => setTimerValue(i, event.target.value));
         // Initial set to display default
         setTimerValue(i, timers[i].inputElement.value);
         updateTimerDisplay(i); // Display the initial value
    }

     // Enable timer inputs initially
     toggleTimerInputs(true);
}


function toggleTimerInputs(enabled) {
    timers.forEach(timer => {
        if (timer.inputElement) {
             timer.inputElement.disabled = !enabled;
        }
    });
    startRoundBtn.disabled = !enabled;
    resetTimersBtn.disabled = !enabled; // Reset button is always enabled to reconfigure
}


// --- Scenario Logic ---
function loadScenario() {
    answerAreaDiv.classList.add('hidden');
    modelAnswerTextP.textContent = '';
    multiChoiceOptionsDiv.innerHTML = ''; // Clear previous options

    // Simple random selection for now
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    currentScenario = scenarios[randomIndex];

    scenarioNumberSpan.textContent = currentScenario.id;
    scenarioTextP.textContent = currentScenario.situation;

    // Display options only for multi-choice modes
    if (currentMode === '1v1' || currentMode === '1v1v1') {
        currentScenario.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.innerHTML = `
                <input type="radio" id="option-${index}" name="scenario-option" value="${index}">
                <label for="option-${index}">${option}</label>
            `;
            multiChoiceOptionsDiv.appendChild(optionDiv);
        });
    }
     // Disable controls until timer starts (or manager is ready)
     showAnswerBtn.disabled = true;
     nextRoundBtn.disabled = true;

     // Ensure timer inputs are enabled for configuration before starting
     toggleTimerInputs(true);
}

function showModelAnswer() {
    if (!currentScenario) return;

    // Pause all timers
    timers.forEach((timer, index) => pauseTimer(index));

    modelAnswerTextP.textContent = currentScenario.modelAnswer;
    answerAreaDiv.classList.remove('hidden');
    showAnswerBtn.disabled = true; // Can't show answer again

     // Enable next round button
     nextRoundBtn.disabled = false;
     // Enable timer inputs for next round config
     toggleTimerInputs(true);

     // Optional: Highlight correct multi-choice answer
     if (currentMode === '1v1' || currentMode === '1v1v1') {
        const correctRadio = document.getElementById(`option-${currentScenario.correctOptionIndex}`);
        if(correctRadio) {
            correctRadio.parentElement.style.fontWeight = 'bold';
            correctRadio.parentElement.style.color = '#28a745'; // Green
        }
     }
}

function nextRound() {
    // Reset timers visually and internally (values remain set)
    timers.forEach((timer, index) => {
        pauseTimer(index);
        timer.current = timer.initial; // Reset current to initial
        updateTimerDisplay(index);
        // Clear highlighting on options if applicable
        if (currentMode === '1v1' || currentMode === '1v1v1') {
            const options = multiChoiceOptionsDiv.querySelectorAll('div');
            options.forEach(opt => {
                opt.style.fontWeight = 'normal';
                opt.style.color = '#333';
            });
            // Uncheck radios
            const radios = multiChoiceOptionsDiv.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => radio.checked = false);
        }
    });

    loadScenario(); // Load a new scenario
}

// --- Timer Logic ---
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function setTimerValue(index, value) {
    const seconds = parseInt(value, 10);
    if (!isNaN(seconds) && seconds >= 1) {
        timers[index].initial = seconds;
        timers[index].current = seconds;
        updateTimerDisplay(index);
    } else {
        // Optionally revert to a default or previous valid value
        timers[index].inputElement.value = timers[index].initial;
    }
}

function updateTimerDisplay(index) {
    if (timers[index] && timers[index].element) {
        timers[index].element.textContent = formatTime(timers[index].current);
         if (timers[index].current <= 10 && timers[index].current > 0) {
             timers[index].element.style.color = 'red';
         } else if (timers[index].current === 0) {
             timers[index].element.style.color = '#6c757d'; // Gray when time is up
         }
         else {
             timers[index].element.style.color = '#dc3545'; // Default red
         }
    }
}

function startTimer(index) {
    if (timers[index] && timers[index].interval === null && timers[index].current > 0) {
        // Ensure timer inputs are disabled once timers start
        toggleTimerInputs(false);
        showAnswerBtn.disabled = false; // Allow showing answer once round starts

        timers[index].interval = setInterval(() => {
            if (timers[index].current > 0) {
                timers[index].current--;
                updateTimerDisplay(index);
            } else {
                pauseTimer(index);
                // Optional: trigger end of round logic if all timers finish
            }
        }, 1000);
    }
}

function pauseTimer(index) {
    if (timers[index] && timers[index].interval !== null) {
        clearInterval(timers[index].interval);
        timers[index].interval = null;
    }
}

function resetTimer(index) {
    if (timers[index]) {
        pauseTimer(index);
        timers[index].current = timers[index].initial;
        updateTimerDisplay(index);
        // Ensure timer inputs are enabled after reset
        toggleTimerInputs(true);
         showAnswerBtn.disabled = true;
         nextRoundBtn.disabled = true;
    }
}

function startAllTimers() {
     timers.forEach((timer, index) => {
        // Reset current time to initial time before starting all
        timers[index].current = timers[index].initial;
        updateTimerDisplay(index);
        startTimer(index);
    });
}

function resetAllTimers() {
     timers.forEach((timer, index) => {
        resetTimer(index);
     });
      // Also hide answer and reload scenario just in case
     answerAreaDiv.classList.add('hidden');
     modelAnswerTextP.textContent = '';
     // Re-enable timer inputs
     toggleTimerInputs(true);
     showAnswerBtn.disabled = true;
     nextRoundBtn.disabled = true;
}


// --- Initial Setup ---
window.onload = showModeSelection;