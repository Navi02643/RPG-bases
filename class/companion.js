class Companion {
  constructor(name, race) {
    this.name = name;
    this.race = race;
    this.level = 1;
    this.experience = 0;
    this.nextLevelExperience = 100;
    this.currentHealth = 100;
    this.maxHealth = 100;
    this.attack = 10;
    this.defense = 5;
    this.speed = 0;
    this.luck = 0;
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.isAlive = true;
    this.companions = [];

    if (razas[this.race]) {
      const raceStats = razas[this.race];
      this.maxHealth += raceStats.maxHealth;
      this.attack += raceStats.attack;
      this.defense += raceStats.defense;
      this.speed = raceStats.speed;
      this.elementalAttribute = raceStats.elementalAttribute;
      this.luck = raceStats.luck;
      this.currentHealth = this.maxHealth;
    } else {
      console.log("Raza no válida.");
    }
  }

  gainExperience(experience) {
    if (experience < 0) {
      console.log(
        "La experiencia no puede ser un valor negativo para el compañero."
      );
      return;
    }

    this.experience += experience;

    while (this.experience >= this.nextLevelExperience) {
      const remainingExperience = this.experience - this.nextLevelExperience;
      this.levelUp();
      this.experience = remainingExperience;
    }
  }

  levelUp() {
    this.level++;
    this.experience = 0;
    this.nextLevelExperience = Math.ceil(this.nextLevelExperience * 1.65);

    const raza = razas[this.race];

    this.maxHealth += raza.maxHealth;
    this.attack += raza.attack;
    this.defense += raza.defense;
    this.speed += raza.speed;
    this.luck += raza.luck;

    this.currentHealth = this.maxHealth;
    console.log(`${this.name} has leveled up to level ${this.level}!`);

    this.companions.forEach((companion) => {
      companion.levelUp();
    });
  }

  equipWeapon(weapon) {
    if (!weapon) {
      console.log("Arma no válida.");
      return;
    }

    if (this.equippedWeapon) {
      this.attack -= this.equippedWeapon.attackBonus;
    }

    this.equippedWeapon = weapon;
    this.attack += weapon.attackBonus;
    console.log(`${this.name} ha equipado ${weapon.name}.`);
  }

  unequipWeapon() {
    if (this.equippedWeapon) {
      this.attack -= this.equippedWeapon.attackBonus;
      console.log(`${this.name} ha desequipado ${this.equippedWeapon.name}.`);
      this.equippedWeapon = null;
    } else {
      console.log(`${this.name} no tiene un arma equipada.`);
    }
  }

  equipArmor(armor) {
    if (!armor) {
      console.log("Armadura no válida.");
      return;
    }

    if (this.equippedArmor) {
      this.defense -= this.equippedArmor.defenseBonus;
    }

    this.equippedArmor = armor;
    this.defense += armor.defenseBonus;
    console.log(`${this.name} ha equipado ${armor.name}.`);
  }

  unequipArmor() {
    if (this.equippedArmor) {
      this.defense -= this.equippedArmor.defenseBonus;
      console.log(`${this.name} ha desequipado ${this.equippedArmor.name}.`);
      this.equippedArmor = null;
    } else {
      console.log(`${this.name} no tiene una armadura equipada.`);
    }
  }

  decreaseHealth(amount) {
    if (amount < 0) {
      console.log("La cantidad de salud a restar debe ser un valor positivo.");
      return;
    }

    this.currentHealth -= amount;

    if (this.currentHealth < 0) {
      this.currentHealth = 0;
    }

    console.log(`${this.name} ha perdido ${amount} puntos de salud.`);
  }

  increaseHealth(amount) {
    if (amount < 0) {
      console.log("La cantidad de salud a sumar debe ser un valor positivo.");
      return;
    }

    this.currentHealth += amount;

    if (this.currentHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }

    console.log(`${this.name} ha recuperado ${amount} puntos de salud.`);
  }

  takeDamage(damage) {
    this.currentHealth -= damage;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      console.log(`${this.name} ha muerto.`);
    }
  }

  revive() {
    this.currentHealth = this.maxHealth;
    this.isAlive = true;
  }

  info() {
    return {
      name: this.name,
      race: this.race,
      level: this.level,
      experience: this.experience,
      nextLevelExperience: this.nextLevelExperience,
      currentHealth: this.currentHealth,
      maxHealth: this.maxHealth,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
      elementalAttribute: this.elementalAttribute,
      luck: this.luck,
      equippedWeapon: this.equippedWeapon ? this.equippedWeapon.name : "-",
      equippedArmor: this.equippedArmor ? this.equippedArmor.name : "-",
    };
  }
}
