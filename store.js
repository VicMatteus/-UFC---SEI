import { create } from 'zustand'

export const useUserStore = create((set) => ({
    token:'',
    user: null,
    ChangeUser: (newUser) => set({user: newUser}),
    changeToken:(token) => set({token:token}),
    payments:[],
    setPayments:(payments) => set({payments:payments}),
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    isDrawerOpen: false,
    toggleDrawer: () => set((state)=>{isDrawerOpen: !state.isDrawerOpen}), //
}))