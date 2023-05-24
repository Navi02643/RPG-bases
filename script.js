let player = null;
let grupoEnemigos = [];

const selectRaza = document.getElementById("raza");

for (const raza in razas) {
  if (razas.hasOwnProperty(raza)) {
    // Crea un nuevo elemento option
    const option = document.createElement("option");
    option.value = raza;
    option.textContent = raza;

    // Agrega la opción al select
    selectRaza.appendChild(option);
  }
}

const populateSelectOptions = (selectElement, options) => {
  selectElement.innerHTML = ""; // Clear the select options before populating

  for (const key in options) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = options[key].name;
    selectElement.appendChild(option);
  }
};

const newPlayer = () => {
  const nombre = document.getElementById("nombre").value;
  const raza = document.getElementById("raza").value;

  if (!player) {
    player = new Player(nombre, raza);
  } else {
    const companion = new Companion(nombre, raza);
    player.addCompanion(companion);
  }

  console.log(player.info);
  updatePlayerTable();
};

const addCompanionBtn = () => {
  const nombre = document.getElementById("nombre").value;
  const raza = document.getElementById("raza").value;

  const companion = new Companion(nombre, raza);
  player.addCompanion(companion);

  console.log(player.info);
  updatePlayerTable();
};

const experienceGain = () => {
  const experiencia = Number(document.getElementById("sumarExperiencia").value);
  console.log(experiencia);
  player.gainExperience(experiencia);
  console.log(player.info);
  updatePlayerTable();
};

const equipWeapon = () => {
  const selectedWeaponId = document.getElementById("arma").value;
  if (selectedWeaponId == 0) {
    player.unequipWeapon();
  } else {
    const selectedWeapon = arma[selectedWeaponId];
    player.equipWeapon(selectedWeapon);
  }

  console.log(player.info);
  updatePlayerTable();
};

const equipArmor = () => {
  const selectedArmorId = document.getElementById("armadura").value;
  if (selectedArmorId == 0) {
    player.unequipArmor();
  } else {
    const selectedArmor = armadura[selectedArmorId];
    player.equipArmor(selectedArmor);
  }

  console.log(player.info);
  updatePlayerTable();
};

const equipCompanionWeapon = (companionIndex) => {
  const selectedWeaponId = document.getElementById(
    `armaCompanion${companionIndex}`
  ).value;
  if (selectedWeaponId == 0) {
    player.unequipCompanionWeapon(companionIndex);
  } else {
    const selectedWeapon = arma[selectedWeaponId];
    player.equipCompanionWeapon(companionIndex, selectedWeapon);
  }

  console.log(player.info);
  updatePlayerTable();
};

const equipCompanionArmor = (companionIndex) => {
  const selectedArmorId = document.getElementById(
    `armaduraCompanion${companionIndex}`
  ).value;
  if (selectedArmorId == 0) {
    player.unequipCompanionArmor(companionIndex);
  } else {
    const selectedArmor = armadura[selectedArmorId];
    player.equipCompanionArmor(companionIndex, selectedArmor);
  }

  console.log(player.info);
  updatePlayerTable();
};

const subtractHealth = () => {
  const healthToSubtract = Number(document.getElementById("restarSalud").value);
  player.subtractHealth(healthToSubtract);
  console.log(player.info);
  updatePlayerTable();
};

const damageCompanion = (companionIndex, damage, applyToAll) => {
  if (applyToAll) {
    // Aplicar daño a todos los compañeros y al jugador principal
    player.companions.forEach((companion) => {
      companion.takeDamage(damage);
      console.log(`${companion.name} ha perdido ${damage} puntos de salud.`);
    });

    player.subtractHealth(damage);
    console.log(`${player.name} ha perdido ${damage} puntos de salud.`);
  } else {
    // Aplicar daño al compañero específico
    const companion = player.getCompanion(companionIndex);

    if (companion) {
      companion.takeDamage(damage);
      console.log(`${companion.name} ha perdido ${damage} puntos de salud.`);
    } else {
      console.log("Compañero no válido.");
    }
  }

  updatePlayerTable();
};

const healPlayer = () => {
  player.heal();
  console.log(player.info);
  updatePlayerTable();
};

const resurrectPlayer = () => {
  player.resurrect();
  console.log(player.info);
  updatePlayerTable();
};

const updatePlayerTable = () => {
  const tableBody = document.getElementById("playerTableBody");
  tableBody.innerHTML = "";

  const playerRow = document.createElement("tr");
  playerRow.innerHTML = `
      <td>${player.name}</td>
      <td>${player.race}</td>
      <td>${player.level}</td>
      <td>${player.experience}</td>
      <td>${player.nextLevelExperience}</td>
      <td>${player.currentHealth}</td>
      <td>${player.maxHealth}</td>
      <td>${player.attack}</td>
      <td>${player.defense}</td>
      <td>${player.speed}</td>
      <td>${player.elementalAttribute}</td>
      <td>${player.luck}</td>
      <td>${player.equippedWeapon ? player.equippedWeapon.name : "-"}</td>
      <td>${player.equippedArmor ? player.equippedArmor.name : "-"}</td>
  `;
  tableBody.appendChild(playerRow);

  if (player.companions.length > 0) {
    player.companions.forEach((companion, index) => {
      const companionRow = document.createElement("tr");
      companionRow.innerHTML = `
        <!-- Código HTML para la fila del compañero -->
        <td>${companion.name}</td>
        <td>${companion.race}</td>
        <td>${companion.level}</td>
        <td>${companion.experience}</td>
        <td>${companion.nextLevelExperience}</td>
        <td>${companion.currentHealth}</td>
        <td>${companion.maxHealth}</td>
        <td>${companion.attack}</td>
        <td>${companion.defense}</td>
        <td>${companion.speed}</td>
        <td>${companion.elementalAttribute}</td>
        <td>${companion.luck}</td>
        <td>${
          companion.equippedWeapon ? companion.equippedWeapon.name : "-"
        }</td>
        <td>${companion.equippedArmor ? companion.equippedArmor.name : "-"}</td>
        <td>
          <select id="armaCompanion${index}">
            <option value="0">None</option>
          </select>
        </td>
        <td>
          <select id="armaduraCompanion${index}">
            <option value="0">None</option>
          </select>
        </td>
      `;

      tableBody.appendChild(companionRow);

      populateSelectOptions(
        document.getElementById(`armaCompanion${index}`),
        arma
      );
      populateSelectOptions(
        document.getElementById(`armaduraCompanion${index}`),
        armadura
      );
      document.getElementById(`armaCompanion${index}`).value =
        companion.equippedWeapon ? companion.equippedWeapon.id : 0;
      document.getElementById(`armaduraCompanion${index}`).value =
        companion.equippedArmor ? companion.equippedArmor.id : 0;

      document
        .getElementById(`armaCompanion${index}`)
        .addEventListener("change", () => {
          equipCompanionWeapon(index);
        });

      document
        .getElementById(`armaduraCompanion${index}`)
        .addEventListener("change", () => {
          equipCompanionArmor(index);
        });
    });
  }
};

const generarGrupoEnemigos = () => {
  const enemigosKeys = Object.keys(enemigos);

  // Generar un número aleatorio para determinar la cantidad de enemigos
  const cantidadEnemigos = Math.floor(Math.random() * 5) + 1; // Máximo 5 enemigos

  for (let i = 0; i < cantidadEnemigos; i++) {
    const enemigoKey =
      enemigosKeys[Math.floor(Math.random() * enemigosKeys.length)];
    const enemigoData = enemigos[enemigoKey];
    const enemigo = new Enemy(
      enemigoData.name,
      enemigoData.nivel,
      enemigoData.maxHealth,
      enemigoData.attack,
      enemigoData.defense,
      enemigoData.speed,
      enemigoData.elementalAttribute,
      enemigoData.luck
    );
    grupoEnemigos.push(enemigo);
  }
  mostrarEquipoEnemigos(grupoEnemigos);
};

const recibirDanioIndividual = (danio) => {
  enemigo.subtractHealth(danio);
  mostrarEquipoEnemigos(grupoEnemigos);
};

const recibirDanioGrupal = (danio) => {
  grupoEnemigos.forEach((enemigo) => {
    enemigo.receiveDamage(danio);
  });
  console.log(grupoEnemigos);
  mostrarEquipoEnemigos(grupoEnemigos);
};


const mostrarEquipoEnemigos = (grupoEnemigos) => {
  const equipoEnemigosTableBody = document.getElementById("equipo-enemigos");
  equipoEnemigosTableBody.innerHTML = "";

  grupoEnemigos.forEach((enemigo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${enemigo.name}</td>
      <td>${enemigo.nivel}</td>
      <td>${enemigo.currentHealth} / ${enemigo.maxHealth}</td>
      <td>${enemigo.attack}</td>
      <td>${enemigo.defense}</td>
      <td>${enemigo.speed}</td>
      <td>${enemigo.elementalAttribute}</td>
      <td>${enemigo.luck}</td>
    `;
    equipoEnemigosTableBody.appendChild(row);
  });
};

document.getElementById("nuevojugador").addEventListener("click", newPlayer);
document.getElementById("addCompanionBtn").addEventListener("click", addCompanionBtn);
document.getElementById("sumarExperiencia").addEventListener("change", experienceGain);
document.getElementById("arma").addEventListener("change", equipWeapon);
document.getElementById("armadura").addEventListener("change", equipArmor);
document.getElementById("restarSalud").addEventListener("change", subtractHealth);
document.getElementById("tomarPocion").addEventListener("click", healPlayer);
document.getElementById("resucitar").addEventListener("click", resurrectPlayer);
document.getElementById("GenEnemy").addEventListener("click", generarGrupoEnemigos);
document.getElementById("recibirDanioIndividual").addEventListener("click", () => {
  const enemigoId = document.getElementById("enemigoIndividual").value;
  const enemigo = enemigos[enemigoId];
  const danio = Number(document.getElementById("danioIndividual").value);
  recibirDanioIndividual(enemigo, danio);
  mostrarEquipoEnemigos(grupoEnemigos);
});
document.getElementById("recibirDanioGrupal").addEventListener("click", () => {
  const danio = Number(document.getElementById("danioGrupal").value);
  recibirDanioGrupal(danio);
});