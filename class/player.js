class Player {
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
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.companions = [];
    this.maxCompanions = 3;

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
      console.log("La experiencia no puede ser un valor negativo.");
      return;
    }

    this.experience += experience;

    while (this.experience >= this.nextLevelExperience) {
      const remainingExperience = this.experience - this.nextLevelExperience;
      this.levelUp();
      this.experience = remainingExperience;
    }

    this.companions.forEach((companion) => {
      companion.gainExperience(experience);
    });
  }

  levelUp() {
    this.level++;
    this.experience = 0;
    this.nextLevelExperience = Math.ceil(this.nextLevelExperience * 1.65);

    const raza = razas[this.race];

    this.maxHealth += raza.maxHealth;
    this.attack += raza.attack;
    this.defense += raza.defense;
    this.speed += raza.speed; // Incrementa la velocidad según la raza
    this.luck += raza.luck; // Incrementa la suerte según la raza

    this.currentHealth = this.maxHealth;
    console.log(`${this.name} has leveled up to level ${this.level}!`);

    this.companions.forEach((companion) => {
      companion.levelUp();
    });
  }

  subtractHealth(health) {
    this.currentHealth -= health;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      console.log(`${this.name} has been defeated!`);
    }
  }

  heal() {
    const healAmount = Math.ceil(this.maxHealth * 0.15);

    if (this.currentHealth === this.maxHealth) {
      console.log(`${this.name} is already at full health.`);
    } else {
      const remainingHeal = Math.min(
        healAmount,
        this.maxHealth - this.currentHealth
      );
      this.currentHealth += remainingHeal;
      console.log(`${this.name} has been healed for ${remainingHeal} health.`);
    }
  }

  resurrect() {
    if (this.currentHealth === 0) {
      this.currentHealth = Math.floor(this.maxHealth / 3);
      console.log(`${this.name} has been resurrected with half health.`);
    } else {
      console.log(`${this.name} is not currently defeated.`);
    }
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

  equipCompanionWeapon(companionIndex, weapon) {
    if (companionIndex >= 0 && companionIndex < this.companions.length) {
      const companion = this.companions[companionIndex];
      companion.equipWeapon(weapon);
    } else {
      console.log("Invalid companion index.");
    }
  }

  unequipCompanionWeapon(companionIndex) {
    if (companionIndex >= 0 && companionIndex < this.companions.length) {
      const companion = this.companions[companionIndex];
      companion.unequipWeapon();
    } else {
      console.log("Invalid companion index.");
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

  equipCompanionArmor(companionIndex, armor) {
    if (companionIndex >= 0 && companionIndex < this.companions.length) {
      const companion = this.companions[companionIndex];
      companion.equipArmor(armor);
    } else {
      console.log("Invalid companion index.");
    }
  }

  unequipCompanionArmor(companionIndex) {
    if (companionIndex >= 0 && companionIndex < this.companions.length) {
      const companion = this.companions[companionIndex];
      companion.unequipArmor();
    } else {
      console.log("Invalid companion index.");
    }
  }

  addCompanion(companion) {
    if (this.companions.length >= this.maxCompanions) {
      console.log("Maximum number of companions reached.");
      return;
    }

    this.companions.push(companion);
    console.log(`${companion.name} has joined ${this.name}'s party.`);
  }

  getCompanion(index) {
    return this.companions[index];
  }

  get info() {
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
      companions: this.companions.map((companion) => companion.info()),
    };
  }
}
