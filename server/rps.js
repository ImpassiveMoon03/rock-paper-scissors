class RpsGame {
    constructor(p1, p2) {
        this._players = [p1, p2];
        this._turns = [null, null];
        this._scores = [0,0]

        this._sendToPlayers('Rock Paper Scissors is starting...')

        this._players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this._onTurn(idx, turn)
            });
        });
    }

    _upScore(playerIndex) {
        this._scores[playerIndex]++;
        this._players[playerIndex].emit('score', this._scores[playerIndex]);
    }

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach(s => s.emit('message', msg));
    }

    _onTurn(playerIndex, turn) {
        if(this._turns[playerIndex]){
            this._sendToPlayer(playerIndex, `You already selected ${this._turns[playerIndex]}!`)
        }else{
            this._turns[playerIndex] = turn;
            this._sendToPlayer(playerIndex, `You selected ${turn}!`);
        }

        this._checkGameOver();
    }

    _checkGameOver() {
        const turns = this._turns;

        if(turns[0] && turns[1]){
            this._sendToPlayers('Game Over! ' + turns.join(" : "));
            this._getGameResult();
            this._turns = [null, null];
        }
    }

    _getGameResult() {

        const p0 = this._decodeTurn(this._turns[0]);
        const p1 = this._decodeTurn(this._turns[1]);

        const distance = (p1 - p0 + 3) % 3;

        switch(distance) {
            case 0:
                this._sendToPlayers('Draw!')
                break;
            case 1:
                this._sendWinMessage(this._players[0], this._players[1])
                this._upScore(0);
                break;
            case 2:
                this._sendWinMessage(this._players[1], this._players[0])
                this._upScore(1);
                break;
        }

    }

    _sendWinMessage(winner, loser) {
        winner.emit('message', 'You won!');
        loser.emit('message', 'You lost!')
    }

    _decodeTurn(turn){

        switch(turn){
            case 'rock':
                return 0;
            case 'scissors':
                return 1;
            case 'paper':
                return 2;
            default:
                throw new Error(`Could not decode turn ${turn}`);
        }

    }
}

module.exports = RpsGame;
