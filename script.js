document.getElementById("search-button").addEventListener("click", async () => {
  const input = document.getElementById("search-input").value.toLowerCase().trim();
  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`;

  if (!input) {
    alert("Please enter a Pokémon name or ID.");
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      alert("Pokémon not found");
      return;
    }
    const data = await res.json();

    // Display name and ID
    document.getElementById("pokemon-name").textContent = data.name;
    document.getElementById("pokemon-id").textContent = `#${data.id}`;

    // Display sprite
    const spriteContainer = document.getElementById("sprite-container");
    spriteContainer.innerHTML = "";
    const sprite = document.createElement("img");
    sprite.src = data.sprites.front_default;
    sprite.alt = data.name;
    spriteContainer.appendChild(sprite);

    // Display types
    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";
    data.types.forEach(t => {
      const span = document.createElement("span");
      span.textContent = t.type.name;
      typesContainer.appendChild(span);
    });

    // Display height and weight
    document.getElementById("height").textContent = `Height: ${data.height}`;
    document.getElementById("weight").textContent = `Weight: ${data.weight}`;

  } catch (error) {
    alert("Pokémon not found. Please try again!");
  }
});