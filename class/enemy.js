class Enemy {
  constructor(
    name,
    nivel,
    maxHealth,
    attack,
    defense,
    speed,
    elementalAttribute,
    luck
  ) {
    this.name = name;
    this.nivel = nivel;
    this.maxHealth = maxHealth;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.elementalAttribute = elementalAttribute;
    this.luck = luck;
    this.currentHealth = maxHealth;
  }

  receiveDamage(damage) {
    this.currentHealth -= damage;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      console.log(`${this.name} has been defeated!`);
    }
  }


  get info() {
    return {
      name: this.name,
      nivel: this.nivel,
      maxHealth: this.maxHealth,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
      elementalAttribute: this.elementalAttribute,
      luck: this.luck,
      currentHealth: this.currentHealth,
    };
  }
}