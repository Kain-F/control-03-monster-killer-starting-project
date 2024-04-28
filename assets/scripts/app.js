// consts cant change
const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 7.5;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let gameLog = [];


attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)
healBtn.addEventListener('click',healPlayerHandler)

function logGame(currentPlayerHealth,currentMonsterHealth){
    // this code is just for logging
    const healthDict = {
        monsterHealth: currentMonsterHealth,
        playerHealth: currentPlayerHealth
    }
    gameLog.push(healthDict)
    console.log(gameLog)

}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    
    // this snippet executes the monster attack against the player 
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    
    // the whole code snip underneath checks if the monster or player has won 
    // or wether is was a draw and if needed it activates the bonus life

    // we reset the player health to the health he had before he died if he has a bonus life 
    if(currentPlayerHealth <= 0 && hasBonusLife){
        currentPlayerHealth = initialPlayerHealth;
        hasBonusLife = false;
        removeBonusLife();
        alert('You have lost!!!\n\nYour bonus life has activated, better luck this time');
        setPlayerHealth(currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('you won');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('the monster won');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('draw')
    }
    
    // we log the round 
    logGame(currentPlayerHealth,currentMonsterHealth);
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
   let healValue;
   // we shouldnt be able to heal over our chosenMaxLife
   // the code underneath basically sets a limit
   // if our health is greater than that limit it means healing will get you a healthvalue equal or greater than the chosenMaxLife
   if(currentPlayerHealth >= chosenMaxLife-HEAL_VALUE) {
    alert("You can't heal to more than your max initial health");
    // we will however heal the player to the chosenMaxLife
    healValue = chosenMaxLife - currentPlayerHealth;
   } else {
    healValue = HEAL_VALUE;
   }
    
   increasePlayerHealth(healValue);
    // debug losing with full health
    currentPlayerHealth += healValue;
    console.log(currentPlayerHealth)
    endRound();
}