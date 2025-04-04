<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getItems, addItem, deleteItem } from "@/services/api";

const items = ref([]);
const newItem = ref("");

const fetchItems = async () => {
  try {
    const response = await getItems();
    items.value = response.data;
  } catch (err) {
    console.error(err);
  }
};

const handleAddItem = async () => {
  if (!newItem.value) return;
  await addItem(newItem.value);
  fetchItems();
  newItem.value = "";
};

const handleDeleteItem = async (id) => {
  await deleteItem(id);
  fetchItems();
};

onMounted(fetchItems);
</script>

<template>
  <div>
    <h2>Liste des Items</h2>
    <input v-model="newItem" placeholder="Nouvel item" />
    <button @click="handleAddItem">Ajouter</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
        <button @click="handleDeleteItem(item.id)">❌</button>
      </li>
    </ul>
  </div>
</template>
