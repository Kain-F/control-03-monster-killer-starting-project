// consts cant change
const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

attackBtn.addEventListener('click',attackHandler);

function attackHandler() {
    
    const damage = dealMonsterDamage(PLAYER_ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage
    
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('you won');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('the monster won');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('draw')
    } 
}
