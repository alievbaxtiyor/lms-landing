import { ref } from 'vue'

// Shared singleton state so any component (Hero, Footer, …) can open the one
// global demo-request modal.
const showModal = ref(false)

export function useDemoModal() {
  return {
    showModal,
    openDemoModal: () => {
      showModal.value = true
    },
    closeDemoModal: () => {
      showModal.value = false
    },
  }
}
