// consts cant change
const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 7.5;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)
healBtn.addEventListener('click',healPlayerHandler)

function endRound(){
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage
    
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('you won');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('the monster won');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('draw')
    }
    
    let healthLog = {
        monsterHealth: currentMonsterHealth,
        playerHealth: currentPlayerHealth
    }
    console.log(healthLog)
}


function attackMonster(attackMode){
    let maxDamage;
    if(attackMode === 'ATTACK'){
        maxDamage = PLAYER_ATTACK_VALUE
    } else if (attackMode == 'STRONG ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG ATTACK');
}

function healPlayerHandler(){
    /*
    we will heal but the monster will still be able to hit us so we can 
    also die after healing
    */
    increasePlayerHealth(HEAL_VALUE);
    endRound();
}