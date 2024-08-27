
const players = [
    
    {
    nome:'Mario',
    Velocidade: 5,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0
    },
    {
    nome: 'Luigi',
    Velocidade: 4,
    Manobrabilidade: 2,
    Poder: 3,
    Pontos: 0

    },
    {
    nome: 'Donkey Kong',
    Velocidade: 2,
    Manobrabilidade: 5,
    Poder: 5,
    Pontos: 0

    }


]

async function rollDice() {
    const valorDado = Math.floor(Math.random() * 6) + 1; 
    return valorDado;
}

async function getBlock() {
    let random = Math.random();
    let result;
    switch (true) {
        case random < 0.33:
            result = 'Reta';
            break;
        case random < 0.66:
            result = 'Manobrabilidade';
            break;
        default:
            result = 'Batalha';
            break;
    }
    return result;
}

async function logRollresult(persoName, bloco, dadoResultado, attribute) {
    console.log(`${persoName} 🎲 rolou um dado de ${bloco} e caiu ${dadoResultado} + ${attribute} = ${dadoResultado + attribute}`);
}
async function points(player, point) {
    if(player.Pontos + point >= 0) {
        player.Pontos += point;
    }
    

}
async function winner(player1, player2, totalPlayer1, totalPlayer2, bloco) {
    if(bloco != 'Batalha') {
    if(totalPlayer1 > totalPlayer2) {
        console.log(`${player1.nome} marcou um ponto`);
            await points(player1, 1)
     } else if (totalPlayer2 > totalPlayer1) {
            console.log(`${player2.nome} marcou um ponto`);
            await points(player2, 1)
        } else {
            console.log(`Os jogadores empataram. Ninguém ganhou ponto nessa rodada`);
        }} 
        else if(bloco ==='Batalha'){
            if(totalPlayer1 > totalPlayer2) {
                console.log(`${player2.nome} perdeu um ponto`);
                await points(player2, -1);
             } else if (totalPlayer2 > totalPlayer1) {
                    console.log(`${player1.nome} perdeu um ponto`);
                    await points(player1, -1);
                } else {
                    console.log(`Os jogadores empataram. Ninguém ganhou ponto nessa rodada`);
        }}
}
async function playRaceEngine(player1, player2) {
    for (let i = 1; i <= 5; i++) {
        console.log(`🏁 Rodada ${i}`);
        
        //sortear bloco
        const bloco = await getBlock();
        console.log(`Bloco: ${bloco}`)
    
    //rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalSkill1 = 0;
    let totalSkill2 = 0;
    if (bloco === 'Reta') {
        totalSkill1 = diceResult1 + player1.Velocidade;
        totalSkill2 = diceResult2 + player2.Velocidade;
        await logRollresult(player1.nome, bloco, diceResult1, player1.Velocidade);
        await logRollresult(player2.nome, bloco, diceResult2, player2.Velocidade);
        await winner(player1, player2, totalSkill1, totalSkill2, bloco);
    }else if(bloco === 'Manobrabilidade') {
        totalSkill1 = diceResult1 + player1.Manobrabilidade;
        totalSkill2 = diceResult2 + player2.Manobrabilidade;
        await logRollresult(player1.nome, bloco, diceResult1, player1.Manobrabilidade);
        await logRollresult(player2.nome, bloco, diceResult2, player2.Manobrabilidade);
        await winner(player1, player2, totalSkill1, totalSkill2, bloco);
        } else {
        totalSkill1 = diceResult1 + player1.Poder;
        totalSkill2 = diceResult2 + player2.Poder;
        await logRollresult(player1.nome, bloco, diceResult1, player1.Poder);
        await logRollresult(player2.nome, bloco, diceResult2, player2.Poder);
        await winner(player1, player2, totalSkill1, totalSkill2, bloco);
        }

        console.log('--------------------------------------------------')
    }
}

async function winnerGame(player1, player2) {
    console.log(`Resultado final: 
        ${player1.nome}: ${player1.Pontos}
        ${player2.nome}: ${player2.Pontos}`);
    if(player1.Pontos > player2.Pontos) {
        console.log(`${player1.nome} é o Vencedor!`);
    } else if(player2.Pontos > player1.Pontos) {
        console.log(`${player2.nome} é o Vencedor!`);
    } else {
        console.log(`A disputa terminou empatada`);
    }
}

(async function main() {
   console.log(
    `🏁🚨 Corrida entre ${players[0].nome} e ${players[1].nome} está começando`
   );
   await playRaceEngine(players[0], players[1]);
    await winnerGame(players[0], players[1]);  
})();
