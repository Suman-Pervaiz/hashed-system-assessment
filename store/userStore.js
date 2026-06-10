
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
     
      user: null,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

     
      selectedUser: null,
      isModalOpen: false,
      modalType: null,

      openModal: (type, user = null) =>
        set({
          isModalOpen: true,
          modalType: type,
          selectedUser: user,
        }),

      closeModal: () =>
        set({
          isModalOpen: false,
          modalType: null,
          selectedUser: null,
        }),
    }),
    {
      name: "user-storage", 
      partialize: (state) => ({
        user: state.user, //it'll only persist the users not the modal
      }),
    }
  )
);

export default useUserStore;