# StarKid - Discord bot
*@StarKid* é um bot exclusivo do servidor [ThatSkyGameBrasil](https://is.gd/ThatSkyGameBrasil), no Discord. Este servidor foi criado com o objetivo de ajudar jogadores, falantes de português, de *Sky - Children of Light*, da empresa *ThatGameCompany*.
## JOGOS
Alguns mini-games foram adicionados ao bot, a fim de contribuir com a interatividade dos membros da nossa comunidade.
### Pedra-papel-tesoura
Jogue pedra-papel-tesoura com o *@StarKid.* Use o comando `!ppt` e escolha uma das opçôes dentre **pedra, papael ou tesoura**, lembre-se:
- Pedra quebra tesoura;
- Papel embrulha de pedra;
- Tesoura corta papel
##### USO
```
!ppt
```
### Pedra-papel-tesoura-lagarto-Spock
Semelhante ao Pedra-papel-tesoura, porém, com mais opções. Além das opções tradicionais, você pode também escolher **lagarto** e **Spock**. Não sabe jogar? Fique tranquilo, o [Sheldon explica!](https://www.youtube.com/watch?v=abQj0pQkSOY). Lembre-se:
- Tesoura corta papel;
- Papel embrulha de pedra;
- Pedra esmaga lagarto;
- Lagarto envenena Spock;
- Spock quebra a tesoura;
- Tesoura decapita lagarto;
- Lagarto come papel;
- Papel reprova Spock;
- Spock vaporiza pedra;
- Pedra quebra tesoura;
### Crush - Skynder ❤️
Ta querendo uma ajudinha para saber se tem alguma chance com o *Crush* ? O @StarKid pode dar uma de cupido e calcular as chances de um possível *match* entre vocês.
##### USO
Mencione algúém ao usar o comando `!crush` e deixe o resto com o @StarKid
```
!crush @nome
```
Não tem nenhum *crush* em mente? Use o comando sem fazer menção que o @StarKid irá encontrar um par para você:
```
!crush
```
### UNO !!!
O **tradicional** jogo de cartas, Uno, foi **adaptado** para ser jogado em uma sala exclusiva do servidor. Como existem várias versões do Uno, foi escolhido o conjunto de regras do *card game* oficial, disponibilizado pela *Copag*, você pode conferir neste [PDF.](http://copag.com.br/wp-content/uploads/2016/03/UNO.pdf)
#### Pré-requisitos
- Ser membro do servidor [ThatSkyGameBrasil](https://is.gd/ThatSkyGameBrasil) e aceitar as **#regras** do mesmo;
- Permitir mensagens privadas.
#### Objetivo
Cada jogador começa a partida com 7 cartas na mão. Seja o primeiro a descartar todas as cartas da sua mão para vencer a rodada.
#### Adicionando novos jogadores
Você pode usar o comando `!uno add` para entrar em uma partida que esteja sendo criada ou em alguma partida já em andamento. Não existe limite de jogadores, o *@StarKid* irá adicionar um novo baralho, dinamicamente, caso seja necessario.

O *@StarKid* irá enviar 7 cartas para cada jogador adicionado, em **mensagem privada** (ver pré-requisitos).
##### Uso
Para se adicionar em uma partida:
```
!uno add
```
Para adicionar um usuário em uma partida:
```
!uno add @usuario
```
#### Conferindo jogadores e ordem da fila
Cada jogador adicionado entra, imediatamente, para o final da fila. Com este comando você poderá verificar o número de jogadores, quantidade de baralhos e a ordem da fila dos jogadores.
```
!uno jogadores
```
#### Iniciando uma partida
Ao iniciar uma partida o *@StarKid* irá retirar uma carta do baralho e coloca-la na mesa (considere o *chat* da sala como sendo a mesa). Será exibido, na sala geral do jogo, uma mensagem contendo a imagem e informações da carta, jogador atual(e o numero de cartas em mãos), jogador anterior(e o numero de cartas em mãos), jogador seguinte(e o numero de cartas em mãos). Use estas informações para se orientar durante o jogo.
```
!uno iniciar
```
#### Jogando uma carta
Escolha uma das cartas de sua mão, que foram enviadas por mensagem privada, e jogue na mesa. A carta jogada deve sempre combinar com a carta que esta no topo da mesa, seja pela sua **cor** ou seu **número**.
##### Uso
```
!uno jogar numero cor
```
##### Exemplpo
```
!uno jogar 9 azul
```

#### Comprando cartas
Quando você não tem opção de carta que combine com a que está na mesa, terá que comprar uma carta. Nas regras do Uno tradicional, diz que você deve comprar apenas uma carta e, caso continue sem opção, passar a vez para o próximo jogador. Existe uma regra **alternativa** onde o jogador deve comprar cartas até que encontre uma que combine com carta da mesa, sendo assim, sem limites de compra. É permitido o uso desta regra alternativa desde que seja votado antecipadamente.

Use este comando também em situações onde algum outro jogador jogar uma carta +2 ou +4 para você. Não se preocupe, o @StarKid saberá quando tiver cartas acumuladas com uma sequencia de +2 ou +4.
##### Uso
```
!uno comprar
```
#### Pular/passar a vez
Este comando irá passar a vez para o jogador seguinte (próximo jogador da fila). Use este comando apenas quando você não tiver uma opção de carta, em sua mão, que combine com a carta no topo da mesa e que **já tenha comprado uma carta**.
##### Uso
```
!uno proximo
```
#### Cartas especiais - Escolher cor
Algumas cartas, *Wild* e *+4*. permitem você a escolher uma nova cor para que, o jogador seguinte, jogue uma nova carta na mesa. O jogo ficará parado até que você defina a cor desejada, com o comando `!uno cor`.
##### Uso
```
!uno cor corDesejada
```
##### Exemplpo
```
!uno cor vermelho
```
### UNO! - Jogador com uma carta na mão
No jogo tradicional, você deve gritar "uno" imediatamente após ficar com uma carta na mão. Caso você esqueça de gritar "uno" e algum outro jogador grite, por você, então você irá ser punido, comprando 2 cartas do baralho. Neste jogo adaptado, use `!uno uno` imediatamente após ficar com 1 carta nas mãos.
##### Uso
```
!uno uno
```
##### Para denunciar um jogador que não usou o comando `!uno uno`
```
!uno uno @usuario
```
### Sair / Abandonar partida
Ta na hora daquele compromisso e não pode esperar o fim da partida? Tudo bem, use este comando e o *@StarKid* ira devolver as cartas da sua mão para o final do baralho. Assim, o jogo continua fluindo sem prejudicar ninguém.
##### Uso
```
!uno sair
```
##### Para expulsar jogador (apenas *@Staff*)
```
!uno sair @usuario
```

### Informações sobre o baralho

|         Tipo         | Quantidade       | Pontos        |
|:--------------------:|------------------|---------------|
| Azul [0-9]            | 20               | Valor Nominal |
|  Amarelo [0-9]        | 20               | Valor Nominal |
| Vermelho [0-9]        | 20               | Valor Nominal |
| Verde [0-9]           | 20               | Valor Nominal |
| +2                   | 8 [2 de cada cor] | 20            |
| Skip                 | 8 [2 de cada cor] | 20            |
| Reverse              | 8 [2 de cada cor] | 20            |
| Curinga [escolhe cor] | 4                | 50            |
| +4                   | 4                | 50            |
